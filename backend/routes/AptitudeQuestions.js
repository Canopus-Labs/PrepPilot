const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { validateAiPrompt } = require("../middlewares/validateAiPrompt");
const sanitizeAiPrompt = require("../middlewares/sanitizeAiPrompt");

const NodeCache = require("node-cache");

const questionCache = new NodeCache({
  stdTTL: 3600,
});

const pendingQuestionRequests = new Map();

const router = express.Router();
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000;

function isRetryableError(error) {
  const status = error?.status || error?.code;

  return (
    status === 429 ||
    status === 503 ||
    error?.message?.toLowerCase().includes("timeout") ||
    error?.message?.toLowerCase().includes("network")
  );
}

async function generateWithRetry(model, prompt) {
  let lastError;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await model.generateContent([prompt]);
    } catch (error) {
      lastError = error;

      if (!isRetryableError(error)) {
        throw error;
      }

      if (attempt === MAX_RETRIES - 1) {
        throw error;
      }

      const delay = INITIAL_DELAY * Math.pow(2, attempt);

      console.warn(
        `[Gemini Retry] Attempt ${attempt + 1}/${MAX_RETRIES} failed. Retrying in ${delay}ms`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

async function generateQuestions(cacheKey, prompt) {
  // Use working Gemini models with fallback
  const candidateModels = [
    process.env.GEMINI_MODEL,
    "models/gemini-2.5-flash",
    "models/gemini-flash-latest",
    "models/gemini-2.0-flash",
  ].filter(Boolean);
  let lastErr = null;
  let result = null;

  for (const m of candidateModels) {
    try {
      console.log(`[Aptitude] Trying model: ${m}`);
      const model = ai.getGenerativeModel({ model: m });
      result = await generateWithRetry(
        model,
        prompt
      );
      console.log(`[Aptitude] Successfully used model: ${m}`);
      break;
    } catch (e) {
      console.error(
        `[Aptitude] Model ${m} exhausted retries:`,
        e.message
      );
      lastErr = e;
      continue;
    }
  }

  if (!result) {
    const err = lastErr ?? new Error("All Gemini models failed");
    err.error = "Failed to generate questions. Gemini API Key is missing or invalid.";
    throw err;
  }

  const rawText = await result.response.text();
  let cleanedText = rawText
    .replace(/^\s*```json\s*/i, "")
    .replace(/^\s*```\s*/i, "")
    .replace(/(\s*```\s*)+$/i, "")
    .trim();
  let questions;
  try {
    questions = JSON.parse(cleanedText);
  } catch (err) {
    console.error("Gemini raw response:", rawText);
    console.error("Parse error:", err);
    err.error = "Failed to parse Gemini response";
    err.raw = rawText;
    throw err;
  }
  questionCache.set(
    cacheKey,
    questions
  );

  return questions;
}

// GET /api/questions?topic=Probability
router.get("/", validateAiPrompt, sanitizeAiPrompt, async (req, res) => {
  const { topic } = req.query;
  if (typeof topic !== "string" || topic.trim() === "") {
    return res.status(400).json({ error: "Topic is required" });
  }
  const normalizedTopic = topic.trim().toLowerCase();
  const cacheKey = `questions:${normalizedTopic}`;

  const cachedQuestions =
    questionCache.get(cacheKey);

  if (cachedQuestions) {
    console.log(
      `[Cache HIT] Topic: ${topic}`
    );

    return res.json(cachedQuestions);
  }

  console.log(
    `[Cache MISS] Topic: ${topic}`
  );

  try {
    if (pendingQuestionRequests.has(cacheKey)) {
      const inFlightRequest = pendingQuestionRequests.get(cacheKey);
      let coalescedQuestions = await inFlightRequest;
      return res.json(coalescedQuestions);
    }

    const prompt = `
      Generate 5 multiple-choice aptitude questions on the topic: ${topic}.
      Each question should have 4 options and indicate the correct answer in JSON format like:
      [
        {
          "question": "...",
          "options": ["A", "B", "C", "D"],
          "answer": "A"
        },
        ...
      ]
      Only return valid JSON, no extra text.
    `;

    const questionRequest = generateQuestions(cacheKey, prompt);
    pendingQuestionRequests.set(cacheKey, questionRequest);

    const questions = await questionRequest;
    res.json(questions);

  } catch (err) {
    console.error("Gemini API error:", err);

    const response = {
      error: "Failed to generate questions",
    }
    
    if (err.error) {
      response.error = err.error;
    }
    
    if (err.raw) {
      response.raw = err.raw;
    }

    response.details = err.message;

    res.status(500).json(response);

  } finally {
    pendingQuestionRequests.delete(cacheKey);
  }
});

module.exports = router;
