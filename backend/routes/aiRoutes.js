const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { generateChatWithFallback, generateWithFallback } = require('../utils/geminiHelper');
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
    const systemInstructionText = systemInstruction || `You are PrepPilot AI Mentor.
1. Allow friendly greetings and casual onboarding conversation.
2. Focus primarily on PrepPilot-related domains: interview preparation, coding interviews, aptitude, resumes, career guidance, mock interviews, and platform usage.
3. Politely redirect unrelated conversations.
4. End your responses with a helpful, contextual follow-up question whenever appropriate (e.g., asking if they want an example, feedback on a resume section, or practice questions).`;

    // Format history for Gemini API
    let formattedHistory = history.map(msg => ({
      role: msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.text }]
    }));

    // Gemini requires the first message in history to be from the user
    if (formattedHistory.length > 0 && formattedHistory[0].role !== "user") {
      formattedHistory.unshift({ role: "user", parts: [{ text: "Hi" }] });
    }

    const { result, usedModel } = await generateChatWithFallback(
      process.env.GEMINI_API_KEY,
      prompt,
      formattedHistory,
      { systemInstruction: systemInstructionText }
    );

    const rawText = await result.response.text();

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
    console.error("[AI] Generation failed:", error);
    return res
      .status(500)
      .json({ error: "Failed to generate content" });
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
    console.error("List models error:", e);
    res.status(500).json({ error: "Failed to list models" });
  }
});

/**
 * Estimate the difficulty of an interview question using Gemini AI.
 * @route POST /api/ai/estimate-difficulty
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When question is missing or AI generation fails.
 * @example
 * POST /api/ai/estimate-difficulty
 * { "question": "Explain how to find the longest palindromic substring in a string." }
 * @example
 * 200 {"difficulty": "Hard", "confidence": 87, "estimatedTime": "45 Minutes", "prerequisites": ["Dynamic Programming", "String Manipulation"]}
 */
router.post("/estimate-difficulty", aiLimiter, async (req, res) => {
  const { question } = req.body;

  if (!question || !question.trim()) {
    return res.status(400).json({ error: "Question is required." });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY not configured on server." });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const modelName = process.env.GEMINI_MODEL || "models/gemini-2.5-flash";
    const model = genAI.getGenerativeModel({ model: modelName });

    const prompt = `You are an expert technical interviewer. Analyze the following interview question and estimate its difficulty level.

Question: "${question}"

Return ONLY a valid JSON object with this exact structure and nothing else:
{
  "difficulty": "Easy" | "Medium" | "Hard" | "Expert",
  "confidence": <integer 0-100>,
  "estimatedTime": "<number> Minutes",
  "prerequisites": [<array of up to 5 prerequisite topic strings>]
}

Difficulty guidelines:
- Easy: Simple logic, O(n) or O(1), basic data structures
- Medium: Moderate complexity, O(n log n), multiple data structures
- Hard: Complex algorithms, O(n^2) or worse, advanced concepts required
- Expert: Very complex, optimal solution requires expert-level knowledge

Return ONLY the raw JSON object. Do not wrap in markdown code blocks or any other text.`;

    const { result } = await generateWithFallback(model, [{ text: prompt }]);
    const rawText = await result.response.text();

    let cleanedText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch {
      // Attempt to extract JSON from partial response
      const match = cleanedText.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        console.error("[DifficultyEstimator] Failed to parse AI response:", rawText);
        return res.status(502).json({ error: "Failed to parse difficulty estimation from AI. Please try again." });
      }
    }

    return res.json({
      difficulty: parsed.difficulty || "Medium",
      confidence: parsed.confidence || 80,
      estimatedTime: parsed.estimatedTime || "30 Minutes",
      prerequisites: Array.isArray(parsed.prerequisites) ? parsed.prerequisites.slice(0, 5) : [],
    });
  } catch (error) {
    console.error("[DifficultyEstimator] Error:", error);
    const status = error?.status || error?.code;
    if (status === 429) {
      return res.status(429).json({ error: "AI service rate limit reached. Please try again in a moment." });
    }
    return res.status(500).json({ error: "Failed to estimate difficulty. Please try again." });
  }
});

module.exports = router;
