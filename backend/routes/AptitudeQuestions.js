const express = require("express");
const { generateWithFallback } = require("../utils/geminiHelper");
const NodeCache = require("node-cache");

const questionCache = new NodeCache({
  stdTTL: 3600,
});

const router = express.Router();
const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000;


// GET /api/questions?topic=Probability
router.get("/", async (req, res) => {
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

  try {
    // Use centralised helper with per-model retry (exponential backoff)
    const { result, usedModel } = await generateWithFallback(
      process.env.GEMINI_API_KEY,
      [prompt],
      {},
      MAX_RETRIES,
      INITIAL_DELAY
    );

    console.log(`[Aptitude] Successfully used model: ${usedModel}`);

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
      return res
        .status(500)
        .json({
          error: "Failed to parse Gemini response",
          details: 'Internal server error',
        });
    }
    questionCache.set(
  cacheKey,
  questions
);

res.json(questions);
  } catch (error) {
    console.error("Gemini API error:", error);
    res
      .status(500)
      .json({ error: "Failed to generate questions", details: 'Internal server error' });
  }
});
module.exports = router;
