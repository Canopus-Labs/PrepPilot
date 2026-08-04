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
 *   "questions": [
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
    let prompt;
    try {
      prompt = questionAnswerPrompt({
        role,
        experience,
        topicsToFocus,
        numberOfQuestions,
        seenQuestions,
      });
    } catch (validationError) {
      return res.status(400).json({
        message: validationError.message,
      });
    }

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

      // Extract raw question array regardless of root-level array vs wrapper object
      const questionList = Array.isArray(data) ? data : data.questions;

      // Validate Gemini response structure
      const questionsSchema = z.array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      );
      const parsed = questionsSchema.safeParse(questionList);
      if (!parsed.success) {
        return res.status(500).json({
          message: "Invalid AI response format",
          details: parsed.error.issues[0]?.message,
        });
      }

      const validatedQuestions = parsed.data;

      // Persist newly generated questions to MongoDB
      const createdQuestions = await Question.insertMany(
        validatedQuestions.map((q) => ({
          user: req.user._id,
          role,
          topic: Array.isArray(topicsToFocus) ? topicsToFocus[0] : topicsToFocus,
          question: q.question,
          answer: q.answer,
        }))
      );

      // Save new session reference in MongoDB
      const questionIds = createdQuestions.map((q) => q._id);
      await Session.create({
        user: req.user._id,
        role,
        topicsToFocus,
        questions: questionIds,
      });

      // Standardize response payload key to `questions`
      return res.status(200).json({
        model: usedModel,
        questions: validatedQuestions,
      });
    } catch (err) {
      console.error("Gemini returned invalid JSON:", cleanedText);
      return res.status(500).json({
        message: "Gemini returned invalid JSON",
      });
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      message: "Failed to generate questions",
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

    let prompt;
    try {
      prompt = conceptExplainPrompt(question);
    } catch (validationError) {
      return res.status(400).json({
        message: validationError.message,
      });
    }

    const { result, usedModel } = await generateWithFallback(
      process.env.GEMINI_API_KEY,
      [prompt]
    );

    const rawText = await result.response.text();
    // Clean: remove all leading/trailing code block markers (```json, ```), even if repeated, and trim
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
        return res.status(500).json({ message: "Invalid AI response format", details: parsed.error.issues[0]?.message });
      }

      res.status(200).json({ model: usedModel, ...data });
    } catch (err) {
      res.status(500).json({
        message: "Gemini returned invalid JSON",
      });
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      message: "Failed to generate explanation",
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

    let prompt;
    try {
      prompt = interviewTipsPrompt({ role, experience });
    } catch (validationError) {
      return res.status(400).json({
        message: validationError.message,
      });
    }

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
        return res.status(500).json({ message: "Invalid AI response format", details: parsed.error.issues[0]?.message });
      }

      res.status(200).json({ model: usedModel, ...data });
    } catch (err) {
      console.error("Gemini returned invalid JSON:", cleanedText);
      res.status(500).json({
        message: "Gemini returned invalid JSON",
      });
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      message: "Failed to generate interview tips",
    });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation, generateInterviewTips };