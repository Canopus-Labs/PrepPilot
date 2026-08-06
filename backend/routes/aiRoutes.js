const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { generateChatWithFallback } = require('../utils/geminiHelper');
const { aiLimiter } = require('../middlewares/rateLimiter');
const { protect } = require('../middlewares/authMiddleware');
const { validateAiPrompt } = require('../middlewares/validateAiPrompt');
const sanitizeAiPrompt = require('../middlewares/sanitizeAiPrompt');
const { sanitizePromptText } = sanitizeAiPrompt;
const { isPrepPilotDomain, isContextualResponse } = require('../utils/domainClassifier');
const { buildSolverPrompt, parseSolverOutput } = require('../utils/problemSolverParser');
const problemSolverSchema = require('../validation/problemSolverSchema');
const { z } = require("zod");
const NodeCache = require('node-cache');

// Cache to track off-topic attempts per IP (TTL: 1 hour)
const offTopicCache = new NodeCache({ stdTTL: 3600 });

// Server-owned system instruction. Never taken from the request body, so a
// caller cannot override the model's persona/guardrails.
const SYSTEM_INSTRUCTION = `You are PrepPilot AI Mentor.
1. Allow friendly greetings and casual onboarding conversation.
2. Focus primarily on PrepPilot-related domains: interview preparation, coding interviews, aptitude, resumes, career guidance, mock interviews, and platform usage.
3. Politely redirect unrelated conversations.
4. End your responses with a helpful, contextual follow-up question whenever appropriate (e.g., asking if they want an example, feedback on a resume section, or practice questions).`;

const MAX_HISTORY_MESSAGES = 20;
// Combined character budget for prompt + history (≈ rough token guard) to stop
// unbounded per-request token spend through Gemini.
const MAX_COMBINED_CHARS = 16000;

/**
 * Sanitize and cap the chat payload (prompt + history) before it reaches the
 * model. The system instruction is intentionally NOT part of this contract.
 * @param {string} prompt
 * @param {unknown} history
 * @returns {{ ok: true, formattedHistory: Array } | { ok: false, error: string }}
 */
const buildChatPayload = (prompt, history) => {
  if (!Array.isArray(history)) {
    return { ok: false, error: "history must be an array" };
  }
  if (history.length > MAX_HISTORY_MESSAGES) {
    return { ok: false, error: "Conversation history is too large" };
  }

  let totalChars = typeof prompt === "string" ? sanitizePromptText(prompt).length : 0;
  const formattedHistory = [];

  for (const msg of history) {
    const text = typeof msg?.text === "string" ? sanitizePromptText(msg.text) : "";
    totalChars += text.length;
    formattedHistory.push({
      role: msg?.role === "model" ? "model" : "user",
      parts: [{ text }],
    });
  }

  if (totalChars > MAX_COMBINED_CHARS) {
    return { ok: false, error: "Prompt and history are too large" };
  }

  return { ok: true, formattedHistory };
};

/**
 * Validate a problem-solving payload against the problemSolverSchema.
 */
function validateProblemSolve(req, res, next) {
  try {
    const parsed = problemSolverSchema.parse(req.body);
    const clean = (value) =>
      typeof value === "string"
        ? value.replace(/<[^>]*>?/gm, "").replace(/[^\x20-\x7E\n]/g, "").trim()
        : value;
    req.solveInput = {
      problem: clean(parsed.problem),
      language: parsed.language,
      constraints: clean(parsed.constraints),
    };
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      const first = err.issues[0];
      return res.status(400).json({
        error: first?.message || "Invalid solve request.",
        details: err.issues.map((i) => i.message),
      });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Structured problem-solving endpoint.
 * @route POST /api/solve
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @example
 * POST /api/solve
 * {
 *   "problem": "Two Sum...",
 *   "language": "python",
 *   "constraints": "1 <= nums.length <= 10^4"
 * }
 * @example
 * 200 {"success":true,"solution":{"approach":"...","steps":"...","complexity":"...","code":"...","language":"python"}}
 */
async function solveHandler(req, res) {
  const { problem, language, constraints } = req.solveInput;

  try {
    const prompt = buildSolverPrompt({ problem, language, constraints });
    const { result, usedModel } = await generateChatWithFallback(
      process.env.GEMINI_API_KEY,
      prompt,
      [],
      {
        systemInstruction:
          "You are an expert coding interview tutor. Always answer with the exact markdown structure requested. Never wrap the whole answer in a code fence.",
      }
    );

    const rawText = await result.response.text();
    const parsed = parseSolverOutput(rawText);

    if (!parsed.ok) {
      return res.json({
        success: false,
        solution: null,
        raw: parsed.raw,
        model: usedModel,
      });
    }

    return res.json({
      success: true,
      solution: {
        approach: parsed.sections.approach,
        steps: parsed.sections.steps || "",
        complexity: parsed.sections.complexity || "",
        code: parsed.sections.code || "",
        language,
      },
      model: usedModel,
    });
  } catch (error) {
    console.error("[AI] Solve failed:", error);
    return res.status(500).json({ error: "Failed to generate solution" });
  }
}

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
  const { prompt, history = [] } = req.body || {};
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

    // Build the model payload server-side: sanitized history with hard caps.
    // The system instruction is always the server-owned constant.
    const built = buildChatPayload(prompt, history);
    if (!built.ok) {
      return res.status(400).json({ error: built.error });
    }
    const formattedHistory = built.formattedHistory;

    // Gemini requires the first message in history to be from the user
    if (formattedHistory.length > 0 && formattedHistory[0].role !== "user") {
      formattedHistory.unshift({ role: "user", parts: [{ text: "Hi" }] });
    }

    const { result, usedModel } = await generateChatWithFallback(
      process.env.GEMINI_API_KEY,
      prompt,
      formattedHistory,
      { systemInstruction: SYSTEM_INSTRUCTION }
    );

    const rawText = await result.response.text();

    let cleanedText = rawText
      .replace(/^[\s`]*json\s*/i, "")
      .replace(/^\s*```/i, "")
      .replace(/```$/i, "")
      .trim();


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

// Structured problem-solving route
router.post('/solve', aiLimiter, sanitizeAiPrompt, validateProblemSolve, solveHandler);

// AI Interview Question Similarity Detector (issue #1306)
const { detectSimilarQuestions } = require('../controllers/aiSimilarityController');
const { validateDetectSimilarity } = require('../Input_validators/ValidateAi');
router.post('/detect-similarity', aiLimiter, protect, validateDetectSimilarity, detectSimilarQuestions);

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

module.exports = router;
module.exports.buildChatPayload = buildChatPayload;
module.exports.SYSTEM_INSTRUCTION = SYSTEM_INSTRUCTION;
module.exports.MAX_HISTORY_MESSAGES = MAX_HISTORY_MESSAGES;
module.exports.MAX_COMBINED_CHARS = MAX_COMBINED_CHARS;
