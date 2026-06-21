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

/**
 * Shared handler for text generation using Gemini.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<import('express').Response>}
 * @throws {Error} When prompt validation fails or AI generation fails.
 * @example
 * POST /api/generate
 * {
 *   "prompt": "Explain event delegation in JavaScript."
 * }
 * @example
 * 200 {"text": "...", "model": "models/gemini-2.5-flash"}
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
  if (!process.env.GEMINI_API_KEY) {
    return res
      .status(500)
      .json({ error: "GEMINI_API_KEY not configured on server" });
  }
  try {
    const start = Date.now();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const candidateModels = [
      process.env.GEMINI_MODEL,
      "models/gemini-2.5-flash",
      "models/gemini-flash-latest",
      "models/gemini-2.0-flash",
    ].filter(Boolean);

    let lastErr = null;
    let result = null;
    let usedModel = null;
    for (const m of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: m,
          systemInstruction: systemInstruction || `You are PrepPilot AI Mentor.
1. Allow friendly greetings and casual onboarding conversation.
2. Focus primarily on PrepPilot-related domains: interview preparation, coding interviews, aptitude, resumes, career guidance, mock interviews, and platform usage.
3. Politely redirect unrelated conversations.
4. End your responses with a helpful, contextual follow-up question whenever appropriate (e.g., asking if they want an example, feedback on a resume section, or practice questions).`
        });
        
        // Format history for Gemini API
        let formattedHistory = history.map(msg => ({
          role: msg.role === "model" ? "model" : "user",
          parts: [{ text: msg.text }]
        }));

        // Gemini requires the first message in history to be from the user
        if (formattedHistory.length > 0 && formattedHistory[0].role !== "user") {
          formattedHistory.unshift({ role: "user", parts: [{ text: "Hi" }] });
        }

        const chat = model.startChat({
          history: formattedHistory
        });

        result = await chat.sendMessage(prompt);
        usedModel = m;
        break;
      } catch (e) {
        lastErr = e;
        continue;
      }
    }
    if (!result) throw lastErr || new Error("All Gemini models failed");

    const rawText = await result.response.text();
    console.log("Incoming Prompt:", prompt);
    console.log("Model Used:", usedModel);
    console.log("Raw Gemini Response:", rawText);

    let cleanedText = rawText
      .replace(/^[\s`]*json\s*/i, "")
      .replace(/^\s*```/i, "")
      .replace(/```$/i, "")
      .trim();

    console.log(
      "[AI] promptLen=%d model=%s ms=%d",
      prompt.length,
      usedModel,
      Date.now() - start,
    );
    return res.json({ text: cleanedText, model: usedModel });
  } catch (error) {
    console.error("[AI] Generation failed:", error.message);
    return res
      .status(500)
      .json({ error: "Failed to generate content", detail: error.message });
  }
}

// Primary route used by frontend
router.post('/generate', aiLimiter, validateAiPrompt, sanitizeAiPrompt, generateHandler);
// Alias under /ai for consistency if needed later (/api/ai/generate)
router.post('/ai/generate', aiLimiter, validateAiPrompt, sanitizeAiPrompt, generateHandler);

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
