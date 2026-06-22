const { GoogleGenerativeAI } = require("@google/generative-ai");
const Joi = require("joi");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
  interviewTipsPrompt,
} = require("../utils/prompts");
const Session = require("../models/Session");
const Question = require("../models/Question");

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
        console.log(`Trying model: ${m}`);
        const model = ai.getGenerativeModel({ model: m });
        result = await model.generateContent([prompt]);
        usedModel = m;
        console.log(`Successfully used model: ${m}`);
        break;
      } catch (e) {
        console.error(`Model ${m} failed:`, e.message);
        lastErr = e;
        continue;
      }
    }

    if (!result) throw lastErr || new Error("All Gemini models failed");

    const rawText = await result.response.text();
    let cleanedText = rawText
      .replace(/^(\s*```json\s*|\s*```\s*)+/i, "")
      .replace(/(\s*```\s*)+$/i, "")
      .trim();

    try {
      const data = JSON.parse(cleanedText);

      // Validate Gemini response structure
      const questionsSchema = Joi.array().items(
        Joi.object({
          question: Joi.string().required(),
          answer: Joi.string().required(),
        })
      );
      const { error: validationError } = questionsSchema.validate(
        Array.isArray(data) ? data : data.question
      );
      if (validationError) {
        return res.status(500).json({ message: "Invalid AI response format", details: validationError.message });
      }

      if (Array.isArray(data)) {
        res.status(200).json({ model: usedModel, question: data });
      } else {
        res.status(200).json({ model: usedModel, ...data });
      }
    } catch (err) {
      console.error("Gemini returned invalid JSON:", cleanedText);
      res.status(500).json({
        message: "Gemini returned invalid JSON",
        raw: rawText,
      });
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      message: "Failed to generate questions",
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

    const prompt = conceptExplainPrompt(question);

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
        console.log(`Trying model: ${m}`);
        const model = ai.getGenerativeModel({ model: m });
        result = await model.generateContent([prompt]);
        usedModel = m;
        console.log(`Successfully used model: ${m}`);
        break;
      } catch (e) {
        console.error(`Model ${m} failed:`, e.message);
        lastErr = e;
        continue;
      }
    }
    if (!result) throw lastErr || new Error("All Gemini models failed");

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
      const explanationSchema = Joi.object({
        title: Joi.string().required(),
        explanation: Joi.string().required(),
      });
      const { error: validationError } = explanationSchema.validate(data);
      if (validationError) {
        return res.status(500).json({ message: "Invalid AI response format", details: validationError.message });
      }

      res.status(200).json({ model: usedModel, ...data });
    } catch (err) {
      res.status(500).json({
        message: "Gemini returned invalid JSON",
        raw: rawText,
      });
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      message: "Failed to generate explanation",
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

    const prompt = interviewTipsPrompt({ role, experience });

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
        console.log(`Trying model: ${m}`);
        const model = ai.getGenerativeModel({ model: m });
        result = await model.generateContent([prompt]);
        usedModel = m;
        console.log(`Successfully used model: ${m}`);
        break;
      } catch (e) {
        console.error(`Model ${m} failed:`, e.message);
        lastErr = e;
        continue;
      }
    }

    if (!result) throw lastErr || new Error("All Gemini models failed");

    const rawText = await result.response.text();
    let cleanedText = rawText
      .replace(/^(\s*```json\s*|\s*```\s*)+/i, "")
      .replace(/(\s*```\s*)+$/i, "")
      .trim();

    try {
      const data = JSON.parse(cleanedText);
      res.status(200).json({ model: usedModel, ...data });
    } catch (err) {
      console.error("Gemini returned invalid JSON:", cleanedText);
      res.status(500).json({
        message: "Gemini returned invalid JSON",
        raw: rawText,
      });
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      message: "Failed to generate interview tips",
      error: error.message,
    });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation, generateInterviewTips };
