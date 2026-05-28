const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { aiLimiter } = require('../middlewares/rateLimiter');
const { validateAiPrompt } = require('../middlewares/validateAiPrompt');
const { sanitizeAiPrompt } = require('../middlewares/sanitizeAiPrompt');

// Shared handler for text generation (used by multiple route aliases)
async function generateHandler(req, res) {
  const { prompt } = req.body || {};
  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: "Missing prompt" });
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
        const model = genAI.getGenerativeModel({ model: m });
        result = await model.generateContent(prompt);
        usedModel = m;
        break;
      } catch (e) {
        lastErr = e;
        continue;
      }
    }
    if (!result) throw lastErr || new Error("All Gemini models failed");

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
