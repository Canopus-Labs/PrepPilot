const express = require("express");
const router = express.Router();
const { generateChatWithFallback } = require("../utils/geminiHelper");
const { aiLimiter, aiUserLimiter } = require("../middlewares/rateLimiter");
const { protect } = require("../middlewares/authMiddleware");
const { validateAiPrompt } = require("../middlewares/validateAiPrompt");
const sanitizeAiPrompt = require("../middlewares/sanitizeAiPrompt");
const { sanitizePromptText } = sanitizeAiPrompt;
const {
  isPrepPilotDomain,
  isContextualResponse,
} = require("../utils/domainClassifier");
const {
  buildSolverPrompt,
  parseSolverOutput,
} = require("../utils/problemSolverParser");
const problemSolverSchema = require("../validation/problemSolverSchema");
const { z } = require("zod");
const NodeCache = require("node-cache");

// ============================================================
// Configuration
// ============================================================

const offTopicCache = new NodeCache({
  stdTTL: 3600,
  checkperiod: 600,
  useClones: false,
});

const MAX_HISTORY_MESSAGES = 20;

// Combined character budget for prompt + history.
const MAX_COMBINED_CHARS = 16000;

// ============================================================
// Server-owned system instructions
// ============================================================

const SYSTEM_INSTRUCTION = `You are PrepPilot AI Mentor.
1. Allow friendly greetings and casual onboarding conversation.
2. Focus primarily on PrepPilot-related domains: interview preparation, coding interviews, aptitude, resumes, career guidance, mock interviews, and platform usage.
3. Politely redirect unrelated conversations.
4. End your responses with a helpful, contextual follow-up question whenever appropriate (e.g., asking if they want an example, feedback on a resume section, or practice questions).`;

const RESPONSE_MODE_INSTRUCTIONS = {
  "project-ideas":
    "You are a project ideation API. Return only a valid JSON array of project idea objects. Do not include markdown, greetings, explanations, or text outside the JSON array.",

  roadmap:
    "You are a project roadmap API. Return only a valid JSON object matching the requested roadmap structure. Do not include markdown, greetings, explanations, or text outside the JSON object.",

  "roadmap-section":
    "You are a project roadmap section API. Return only a valid JSON object containing the requested section key. Do not include markdown, greetings, explanations, or text outside the JSON object.",
};

const getSystemInstruction = (responseMode) => {
  return RESPONSE_MODE_INSTRUCTIONS[responseMode] || SYSTEM_INSTRUCTION;
};

// ============================================================
// Helpers
// ============================================================

/**
 * Build a safe, bounded chat history payload.
 *
 * @param {string} prompt
 * @param {unknown} history
 * @returns {{
 *   ok: true,
 *   formattedHistory: Array<{role: string, parts: Array<{text: string}>}>
 * } | {
 *   ok: false,
 *   error: string
 * }}
 */
const buildChatPayload = (prompt, history) => {
  if (!Array.isArray(history)) {
    return {
      ok: false,
      error: "history must be an array",
    };
  }

  if (history.length > MAX_HISTORY_MESSAGES) {
    return {
      ok: false,
      error: "Conversation history is too large",
    };
  }

  const safePrompt =
    typeof prompt === "string" ? sanitizePromptText(prompt) : "";

  let totalChars = safePrompt.length;
  const formattedHistory = [];

  for (const msg of history) {
    const text =
      typeof msg?.text === "string"
        ? sanitizePromptText(msg.text)
        : "";

    totalChars += text.length;

    formattedHistory.push({
      role: msg?.role === "model" ? "model" : "user",
      parts: [{ text }],
    });
  }

  if (totalChars > MAX_COMBINED_CHARS) {
    return {
      ok: false,
      error: "Prompt and history are too large",
    };
  }

  return {
    ok: true,
    formattedHistory,
  };
};

/**
 * Remove markdown code fences / accidental JSON prefixes
 * from model output.
 *
 * @param {string} text
 * @returns {string}
 */
const cleanModelText = (text) => {
  if (typeof text !== "string") {
    return "";
  }

  return text
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();
};

/**
 * Validate a structured problem-solving request.
 */
function validateProblemSolve(req, res, next) {
  try {
    const parsed = problemSolverSchema.parse(req.body);

    const clean = (value) => {
      if (typeof value !== "string") {
        return value;
      }

      return value
        .replace(/<[^>]*>?/gm, "")
        .replace(/[^\x20-\x7E\n]/g, "")
        .trim();
    };

    req.solveInput = {
      problem: clean(parsed.problem),
      language: parsed.language,
      constraints: clean(parsed.constraints),
    };

    return next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const first = error.issues[0];

      return res.status(400).json({
        error: first?.message || "Invalid solve request.",
        details: error.issues.map((issue) => issue.message),
      });
    }

    console.error("[AI] Problem validation failed:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// ============================================================
// /solve
// ============================================================

/**
 * Structured problem-solving endpoint.
 *
 * POST /api/solve
 *
 * {
 *   "problem": "Two Sum...",
 *   "language": "python",
 *   "constraints": "1 <= nums.length <= 10^4"
 * }
 */
async function solveHandler(req, res) {
  const { problem, language, constraints } = req.solveInput;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: "GEMINI_API_KEY not configured on server",
    });
  }

  try {
    const prompt = buildSolverPrompt({
      problem,
      language,
      constraints,
    });

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
        approach: parsed.sections.approach || "",
        steps: parsed.sections.steps || "",
        complexity: parsed.sections.complexity || "",
        code: parsed.sections.code || "",
        language,
      },
      model: usedModel,
    });
  } catch (error) {
    console.error("[AI] Solve failed:", error);

    return res.status(500).json({
      error: "Failed to generate solution",
    });
  }
}

// ============================================================
// /generate
// ============================================================

/**
 * Shared handler for text generation using Gemini.
 */
async function generateHandler(req, res) {
  const body = req.body || {};

  const {
    prompt,
    history = [],
    responseMode,
  } = body;

  // Validate type before calling .trim().
  if (typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({
      error: "Missing prompt",
    });
  }

  // ----------------------------------------------------------
  // Domain filtering
  // ----------------------------------------------------------

  const isContextual = isContextualResponse(prompt, history);

  if (!isContextual && !isPrepPilotDomain(prompt)) {
    const userKey = req.ip || "unknown";

    const currentCount =
      (offTopicCache.get(userKey) || 0) + 1;

    offTopicCache.set(userKey, currentCount);

    let textResponse;

    if (currentCount === 1) {
      textResponse =
        "I'm mainly focused on interview preparation, coding, aptitude, resumes, and career development. Is there something related to those topics I can help with?";
    } else if (currentCount === 2) {
      textResponse =
        "It looks like we're moving away from PrepPilot topics. I can best assist with interview preparation, technical concepts, and career guidance. Would you like help with one of those areas?";
    } else {
      textResponse =
        "I'm unable to assist with unrelated topics. Please ask a question related to interviews, coding, aptitude, resumes, or career growth.";
    }

    return res.json({
      text: textResponse,
      model: "local-classifier",
    });
  }

  // ----------------------------------------------------------
  // API key check
  // ----------------------------------------------------------

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: "GEMINI_API_KEY not configured on server",
    });
  }

  try {
    const start = Date.now();

    // --------------------------------------------------------
    // Build bounded/sanitized history
    // --------------------------------------------------------

    const built = buildChatPayload(prompt, history);

    if (!built.ok) {
      return res.status(400).json({
        error: built.error,
      });
    }

    const formattedHistory = built.formattedHistory;

    // Gemini requires the first history message to be from
    // the user.
    if (
      formattedHistory.length > 0 &&
      formattedHistory[0].role !== "user"
    ) {
      formattedHistory.unshift({
        role: "user",
        parts: [{ text: "Hi" }],
      });
    }

    // --------------------------------------------------------
    // Gemini generation
    // --------------------------------------------------------

    const { result, usedModel } = await generateChatWithFallback(
      process.env.GEMINI_API_KEY,
      prompt,
      formattedHistory,
      {
        systemInstruction: getSystemInstruction(responseMode),
      }
    );

    const rawText = await result.response.text();

    const cleanedText = cleanModelText(rawText);

    console.info(
      `[AI] Generation completed in ${Date.now() - start}ms using ${usedModel}`
    );

    return res.json({
      text: cleanedText,
      model: usedModel,
    });
  } catch (error) {
    console.error("[AI] Generation failed:", error);

    return res.status(500).json({
      error: "Failed to generate content",
    });
  }
}

// ============================================================
// Routes
// ============================================================

// Primary frontend route.
router.post(
  "/generate",
  aiLimiter,
  protect,
  aiUserLimiter,
  validateAiPrompt,
  sanitizeAiPrompt,
  generateHandler
);

// Alias under /ai.
router.post(
  "/ai/generate",
  aiLimiter,
  protect,
  aiUserLimiter,
  validateAiPrompt,
  sanitizeAiPrompt,
  generateHandler
);

// Structured problem-solving route.
router.post(
  "/solve",
  aiLimiter,
  protect,
  aiUserLimiter,
  sanitizeAiPrompt,
  validateProblemSolve,
  solveHandler
);

// ============================================================
// Model listing
// ============================================================

/**
 * List available Gemini models.
 *
 * GET /api/models
 */
router.get("/models", async (req, res) => {
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: "GEMINI_API_KEY not configured on server",
    });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(
        process.env.GEMINI_API_KEY
      )}`
    );

    if (!response.ok) {
      const errorBody = await response.text();

      console.error(
        `[AI] Gemini model listing failed: ${response.status}`,
        errorBody
      );

      return res.status(502).json({
        error: "Failed to list Gemini models",
      });
    }

    const data = await response.json();

    const models = Array.isArray(data.models)
      ? data.models
      : [];

    const modelNames = models
      .map((model) =>
        typeof model.name === "string"
          ? model.name.replace(/^models\//, "")
          : null
      )
      .filter(Boolean);

    return res.json({
      availableModels: modelNames,
      configured: process.env.GEMINI_MODEL || null,
      note:
        "Actual availability depends on your API key and region. Set GEMINI_MODEL in .env to force a specific model.",
    });
  } catch (error) {
    console.error("[AI] List models error:", error);

    return res.status(500).json({
      error: "Failed to list models",
    });
  }
});

// ============================================================
// Exports
// ============================================================

module.exports = router;

module.exports.buildChatPayload = buildChatPayload;
module.exports.cleanModelText = cleanModelText;
module.exports.SYSTEM_INSTRUCTION = SYSTEM_INSTRUCTION;
module.exports.MAX_HISTORY_MESSAGES = MAX_HISTORY_MESSAGES;
module.exports.MAX_COMBINED_CHARS = MAX_COMBINED_CHARS;
module.exports.RESPONSE_MODE_INSTRUCTIONS =
  RESPONSE_MODE_INSTRUCTIONS;
