const express = require("express");
const { generateWithFallback } = require("../utils/geminiHelper");
const { protect } = require("../middlewares/authMiddleware");
const NodeCache = require("node-cache");

const questionCache = new NodeCache({
  stdTTL: 3600,
});

const router = express.Router();
const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000;

// Topics are restricted to safe, instruction-free strings so the value can be
// interpolated into the Gemini prompt without acting as a prompt-injection
// vector, and so poisoned topic strings cannot be cached and served to others.
const TOPIC_PATTERN = /^[A-Za-z0-9 _-]{1,60}$/;
const BLOCKED_TOPIC_PATTERNS = [
  /ignore previous instructions/i,
  /ignore all instructions/i,
  /system prompt/i,
  /jailbreak/i,
  /bypass/i,
  /act as/i,
  /you are now/i,
  /override/i,
  /disregard/i,
  /pretend/i,
];

/**
 * Validate and sanitize a requested aptitude topic. Returns the trimmed topic
 * when it is safe, or null when it is missing, too long, contains disallowed
 * characters, or looks like instruction-injection content.
 * @param {unknown} raw
 * @returns {string|null}
 */
const sanitizeTopic = (raw) => {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!TOPIC_PATTERN.test(trimmed)) return null;
  if (BLOCKED_TOPIC_PATTERNS.some((p) => p.test(trimmed))) return null;
  return trimmed;
};

// GET /api/questions?topic=Probability
router.get("/", protect, async (req, res) => {
  const topic = sanitizeTopic(req.query.topic);
  if (!topic) {
    return res.status(400).json({
      error: "Invalid topic. Use letters, numbers, spaces, underscores or hyphens (max 60 characters).",
    });
  }
  const cacheKey = `questions:${topic.toLowerCase()}`;

  const cachedQuestions = questionCache.get(cacheKey);

  if (cachedQuestions) {
    return res.json(cachedQuestions);
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

  try {
    // Use centralised helper with per-model retry (exponential backoff)
    const { result } = await generateWithFallback(
      process.env.GEMINI_API_KEY,
      [prompt],
      {},
      MAX_RETRIES,
      INITIAL_DELAY
    );

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
        });
    }
    questionCache.set(cacheKey, questions);

    res.json(questions);
  } catch (error) {
    console.error("Gemini API error:", error);
    res
      .status(500)
      .json({ error: "Failed to generate questions" });
  }
});
module.exports = router;
module.exports.sanitizeTopic = sanitizeTopic;
module.exports.TOPIC_PATTERN = TOPIC_PATTERN;
