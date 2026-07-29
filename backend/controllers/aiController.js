const { z } = require("zod");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
  interviewTipsPrompt,
} = require("../utils/prompts");
const Session = require("../models/Session");
const Question = require("../models/Question");
const { generateWithFallback } = require("../utils/geminiHelper");

/**
 * Generate interview questions and answers using the Gemini AI service.
 * @route POST /api/ai/generate-questions
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When required request fields are missing or Gemini fails.
 * @example
 * POST /api/ai/generate-questions
 * Authorization: Bearer eyJhb...
 * {
 *   "role": "Frontend Engineer",
 *   "experience": "2 years",
 *   "topicsToFocus": ["React", "JavaScript"],
 *   "numberOfQuestions": 5
 * }
 * @example
 * 200 {
 *   "model": "models/gemini-2.5-flash",
 *   "question": [
 *     {"question": "Explain the virtual DOM.", "answer": "..."},
 *     ...
 *   ]
 * }
 */
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    // Fetch questions the user has already seen for this role + topic
    const pastSessions = await Session.find({
      user: req.user._id,
      role,
      topicsToFocus,
    }).select("questions");

    const pastQuestionIds = pastSessions.flatMap((s) => s.questions);

    const pastQuestions = await Question.find({
      _id: { $in: pastQuestionIds },
    }).select("question");

    const seenQuestions = pastQuestions.map((q) => q.question);

    // Build prompt with seen questions so Gemini avoids repeating them
    const prompt = questionAnswerPrompt({
      role,
      experience,
      topicsToFocus,
      numberOfQuestions,
      seenQuestions,
    });

    const { result, usedModel } = await generateWithFallback(
      process.env.GEMINI_API_KEY,
      [prompt]
    );

    const rawText = await result.response.text();
    let cleanedText = rawText
      .replace(/^(\s*```json\s*|\s*```\s*)+/i, "")
      .replace(/(\s*```\s*)+$/i, "")
      .trim();

    try {
      const data = JSON.parse(cleanedText);

      // Validate Gemini response structure
      const questionsSchema = z.array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      );
      const parsed = questionsSchema.safeParse(Array.isArray(data) ? data : data.questions);
      if (!parsed.success) {
        return res.status(500).json({
          message: "Invalid AI response format",
          details: parsed.error.issues[0]?.message,
        });
      }

      return res.status(200).json({ model: usedModel, question: parsed.data });
    } catch (err) {
      console.error("Gemini returned invalid JSON:", cleanedText);
      return res.status(500).json({
        message: "Gemini returned invalid JSON",
      });
    }
  } catch (error) {
    console.error("Gemini API Error (generate-questions):", error);
    return res.status(500).json({
      message: "Failed to generate interview questions",
      error: error.message,
    });
  }
};

/**
 * Generate an explanation for a technical concept or question.
 * @route POST /api/ai/generate-explanation
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When the request is invalid or Gemini generation fails.
 * @example
 * POST /api/ai/generate-explanation
 * Authorization: Bearer eyJhb...
 * {
 *   "question": "What is a closure in JavaScript?"
 * }
 * @example
 * 200 {
 *   "model": "models/gemini-2.5-flash",
 *   "explanation": "..."
 * }
 */
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    const prompt = conceptExplainPrompt(question);

    const { result, usedModel } = await generateWithFallback(
      process.env.GEMINI_API_KEY,
      [prompt]
    );

    const rawText = await result.response.text();
    let cleanedText = rawText
      .replace(/^\s*```json\s*/i, "")
      .replace(/^\s*```\s*/i, "")
      .replace(/(\s*```\s*)+$/i, "")
      .trim();

    try {
      const data = JSON.parse(cleanedText);

      // Validate Gemini response structure
      const explanationSchema = z.object({
        title: z.string(),
        explanation: z.string(),
      });
      const parsed = explanationSchema.safeParse(data);
      if (!parsed.success) {
        return res.status(500).json({
          message: "Invalid AI response format",
          details: parsed.error.issues[0]?.message,
        });
      }

      return res.status(200).json({ model: usedModel, ...data });
    } catch (err) {
      console.error("Gemini returned invalid JSON:", cleanedText);
      return res.status(500).json({
        message: "Gemini returned invalid JSON",
      });
    }
  } catch (error) {
    console.error("Gemini API Error (generate-explanation):", error);
    return res.status(500).json({
      message: "Failed to generate concept explanation",
      error: error.message,
    });
  }
};

/**
 * Generate interview preparation tips using the Gemini AI service.
 * @route POST /api/ai/generate-tips
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When required request fields are missing or Gemini fails.
 * @example
 * POST /api/ai/generate-tips
 * Authorization: Bearer eyJhb...
 * {
 *   "role": "Frontend Engineer",
 *   "experience": "2 years"
 * }
 * @example
 * 200 {
 *   "model": "models/gemini-2.5-flash",
 *   "tips": ["Focus on React hooks.", "Practice system design basics.", ...]
 * }
 */
const generateInterviewTips = async (req, res) => {
  try {
    const { role, experience } = req.body;

    if (!role || !experience) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = interviewTipsPrompt({ role, experience });

    const { result, usedModel } = await generateWithFallback(
      process.env.GEMINI_API_KEY,
      [prompt]
    );

    const rawText = await result.response.text();
    let cleanedText = rawText
      .replace(/^(\s*```json\s*|\s*```\s*)+/i, "")
      .replace(/(\s*```\s*)+$/i, "")
      .trim();

    try {
      const data = JSON.parse(cleanedText);

      // Validate Gemini response structure
      const tipsSchema = z.object({
        tips: z.array(z.string()),
      });
      const parsed = tipsSchema.safeParse(data);
      if (!parsed.success) {
        return res.status(500).json({
          message: "Invalid AI response format",
          details: parsed.error.issues[0]?.message,
        });
      }

      return res.status(200).json({ model: usedModel, ...data });
    } catch (err) {
      console.error("Gemini returned invalid JSON:", cleanedText);
      return res.status(500).json({
        message: "Gemini returned invalid JSON",
      });
    }
  } catch (error) {
    console.error("Gemini API Error (generate-tips):", error);
    return res.status(500).json({
      message: "Failed to generate interview tips",
    });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation, generateInterviewTips };
