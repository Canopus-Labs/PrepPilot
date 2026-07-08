const { GoogleGenerativeAI } = require("@google/generative-ai");
const Joi = require("joi");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
  interviewTipsPrompt,
} = require("../utils/prompts");
const Session = require("../models/Session");
const Question = require("../models/Question");

const { aiQueue } = require("../config/queue");

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

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

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

    const job = await aiQueue.add("generate-questions", {
      role,
      experience,
      topicsToFocus,
      numberOfQuestions,
      seenQuestions,
    });

    res.status(202).json({
      message: "Generate questions job accepted",
      jobId: job.id,
    });
  } catch (error) {
    console.error("Gemini Queue API Error:", error);
    res.status(500).json({
      message: "Failed to enqueue generate-questions job",
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
    if (!question) {
      return res.status(400).json({ message: "Missing question" });
    }

    const job = await aiQueue.add("generate-explanation", {
      question,
    });

    res.status(202).json({
      message: "Generate explanation job accepted",
      jobId: job.id,
    });
  } catch (error) {
    console.error("Gemini Queue API Error:", error);
    res.status(500).json({
      message: "Failed to enqueue generate-explanation job",
      error: error.message,
    });
  }
};

const generateInterviewTips = async (req, res) => {
  try {
    const { role, experience } = req.body;

    if (!role || !experience) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const job = await aiQueue.add("generate-tips", {
      role,
      experience,
    });

    res.status(202).json({
      message: "Generate tips job accepted",
      jobId: job.id,
    });
  } catch (error) {
    console.error("Gemini Queue API Error:", error);
    res.status(500).json({
      message: "Failed to enqueue generate-tips job",
      error: error.message,
    });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation, generateInterviewTips };
