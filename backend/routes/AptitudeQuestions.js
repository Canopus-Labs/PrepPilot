const express = require("express");
const { generateWithFallback } = require("../utils/geminiHelper");
const NodeCache = require("node-cache");

const questionCache = new NodeCache({
  stdTTL: 3600,
});

// Tracks in-flight question generation requests to coalesce concurrent cache misses.
const pendingQuestionRequests = new Map();

const router = express.Router();
const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000;

/**
 * Generate aptitude questions for a given topic using Gemini with fallback models.
 * Results are cached for 1 hour; concurrent requests for the same topic are coalesced.
 *
 * @param {string} cacheKey - Cache key derived from the normalised topic name.
 * @param {string} topic    - The aptitude topic to generate questions for.
 * @returns {Promise<Array>} Parsed array of question objects.
 */
async function generateQuestions(cacheKey, topic) {
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

  const { result, usedModel } = await generateWithFallback(
    process.env.GEMINI_API_KEY,
    [prompt],
    {},
    MAX_RETRIES,
    INITIAL_DELAY
  );

  console.log(`[Aptitude] Successfully used model: ${usedModel}`);

  const rawText = await result.response.text();

  let cleanedText = rawText.trim();

  if (cleanedText.startsWith("```json")) {
    cleanedText = cleanedText.slice(7).trimStart();
  }

  if (cleanedText.startsWith("```")) {
    cleanedText = cleanedText.slice(3).trimStart();
  }

  while (cleanedText.endsWith("```")) {
    cleanedText = cleanedText.slice(0, -3).trimEnd();
  }

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

  questionCache.set(cacheKey, questions);
  return questions;
}

// GET /api/questions?topic=Probability
router.get("/", async (req, res) => {
  const { topic } = req.query;
  if (typeof topic !== "string" || topic.trim() === "") {
    return res.status(400).json({ error: "Topic is required" });
  }

  const normalizedTopic = topic.trim().toLowerCase();
  const cacheKey = `questions:${normalizedTopic}`;

  const cachedQuestions = questionCache.get(cacheKey);

  if (cachedQuestions) {
    console.log(`[Cache HIT] Topic: ${topic}`);
    return res.json(cachedQuestions);
  }

  console.log(`[Cache MISS] Topic: ${topic}`);

  try {
    // Reuse an ongoing generation request to prevent duplicate Gemini API calls.
    if (pendingQuestionRequests.has(cacheKey)) {
      console.log(`[Coalesced] Topic: ${topic}`);
      const inFlightRequest = pendingQuestionRequests.get(cacheKey);
      const coalescedQuestions = await inFlightRequest;
      return res.json(coalescedQuestions);
    }

    const questionRequest = generateQuestions(cacheKey, topic);
    pendingQuestionRequests.set(cacheKey, questionRequest);

    const questions = await questionRequest;
    return res.json(questions);

  } catch (err) {
    console.error("Gemini API error:", err);

    const response = {
      error: "Failed to generate questions",
    };

    if (err.error) {
      response.error = err.error;
    }

    if (err.raw) {
      response.raw = err.raw;
    }

    response.details = err.message;

    return res.status(500).json(response);

  } finally {
    // Always clear the registry entry so future cache misses can trigger a new generation.
    pendingQuestionRequests.delete(cacheKey);
  }
});

module.exports = router;
