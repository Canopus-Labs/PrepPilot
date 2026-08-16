const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { aiLimiter } = require('../middlewares/rateLimiter');
const { validateAiPrompt } = require('../middlewares/validateAiPrompt');
const sanitizeAiPrompt = require('../middlewares/sanitizeAiPrompt');
const { isPrepPilotDomain, isContextualResponse } = require('../utils/domainClassifier');
const NodeCache = require('node-cache');

// Cache to track off-topic attempts per IP (TTL: 1 hour)
const offTopicCache = new NodeCache({ stdTTL: 3600 });

const AiJob = require('../models/AiJob');
const { aiQueue } = require('../queues/aiQueue');

/**
 * Shared handler for text generation using Gemini.
 * @route POST /api/generate
 */
async function generateHandler(req, res) {
  const { prompt, history = [], systemInstruction } = req.body || {};
  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: "Missing prompt" });
  }
  
  const isContextual = isContextualResponse(prompt, history);

  if (!isContextual && !isPrepPilotDomain(prompt)) {
    const userKey = req.ip || "unknown";
    const currentCount = (offTopicCache.get(userKey) || 0) + 1;
    offTopicCache.set(userKey, currentCount);

    let textResponse = "";
    if (currentCount === 1) {
      textResponse = "I'm mainly focused on interview preparation, coding, aptitude, resumes, and career development. Is there something related to those topics I can help with?";
    } else if (currentCount === 2) {
      textResponse = "It looks like we're moving away from PrepPilot topics. I can best assist with interview preparation, technical concepts, and career guidance. Would you like help with one of those areas?";
    } else {
      textResponse = "I'm unable to assist with unrelated topics. Please ask a question related to interviews, coding, aptitude, resumes, or career growth.";
    }

    return res.json({ 
      text: textResponse, 
      model: "local-classifier" 
    });
  }

  try {
    const jobDoc = await AiJob.create({
      type: 'chat_generation',
      userId: req.user ? req.user._id : null
    });

    await aiQueue.add('generate', {
      jobId: jobDoc._id,
      prompt,
      history,
      systemInstruction,
      isJson: false
    });

    res.status(202).json({ 
      message: "AI Generation job enqueued", 
      jobId: jobDoc._id 
    });
  } catch (error) {
    console.error("[AI] Generation failed:", error.message);
    return res
      .status(500)
      .json({ error: "Failed to enqueue content generation", detail: error.message });
  }
}

// Primary route used by frontend
router.post('/generate', aiLimiter, validateAiPrompt, sanitizeAiPrompt, generateHandler);
// Alias under /ai for consistency if needed later (/api/ai/generate)
router.post('/ai/generate', aiLimiter, validateAiPrompt, sanitizeAiPrompt, generateHandler);

const { getJobStatus, generateInterviewQuestions, generateConceptExplanation, generateInterviewTips } = require('../controllers/aiController');
router.get('/job/:jobId', getJobStatus);


// List available models
/**
 * List available Gemini models configured for the backend.
 * @route GET /api/models
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When listing models fails.
 * @example
 * GET /api/models
 * @example
 * 200 {"availableModels": ["gemini-2.5-flash"], "configured": "models/gemini-2.5-flash", "note": "..."}
 */
router.get("/models", async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const models = await genAI.listModels();
    const modelNames = models.map((m) => m.name.replace("models/", ""));
    res.json({
      availableModels: modelNames,
      configured: process.env.GEMINI_MODEL || null,
      note: "Actual availability depends on your API key & region. Set GEMINI_MODEL in .env to force a specific one.",
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to list models", detail: e.message });
  }
});

module.exports = router;
