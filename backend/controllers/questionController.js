const mongoose = require("mongoose");
const Question = require("../models/Question");
const { buildStudyPlan } = require("../utils/studyPlanScheduler");
const Session = require("../models/Session");

// Escape regex metacharacters so user search text is treated as a literal
// substring. Building a RegExp from raw input allowed catastrophic-backtracking
// patterns (e.g. `(a+)+$`) to stall the shared mongod process (ReDoS).
const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Get all questions for the authenticated user across their sessions.
 * @route GET /api/questions/my-questions
 * @query pinned=true|false (optional)
 * @query sessionId=<ObjectId> (optional)
 * @query q=<string> (optional, text search on question/answer)
 * @query page=<number> (default 1)
 * @query limit=<number> (default 20, max 100)
 * @returns { success, questions, pagination }
 */
const getMyQuestions = async (req, res) => {
  try {
    const userId = req.user._id;

    // First get the user's session IDs
    const sessions = await Session.find({ user: userId }).select("_id").lean();
    const sessionIds = sessions.map((s) => s._id);

    if (sessionIds.length === 0) {
      return res.json({
        success: true,
        questions: [],
        pagination: { totalItems: 0, totalPages: 0, page: 1, pageSize: 20, hasNextPage: false },
      });
    }

    const {
      pinned,
      sessionId,
      q,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = { session: { $in: sessionIds } };

    if (pinned === "true" || pinned === "false") {
      filter.isPinned = pinned === "true";
    }

    if (sessionId) {
      if (!mongoose.isValidObjectId(sessionId)) {
        return res.status(400).json({ success: false, message: "Invalid sessionId" });
      }
      // Ensure the session belongs to the user
      if (!sessionIds.some((id) => id.toString() === sessionId)) {
        return res.status(403).json({ success: false, message: "Session does not belong to user" });
      }
      filter.session = sessionId;
    }

    if (typeof q === "string" && q.trim().length > 0) {
      const term = q.trim().slice(0, 200);
      const searchRegex = new RegExp(escapeRegex(term), "i");
      filter.$or = [
        { question: searchRegex },
        { answer: searchRegex },
        { note: searchRegex },
      ];
    }

    // Defensive coercion: NaN (non-numeric input) must never reach
    // .skip()/.limit() and become a 500. Invalid values fall back to safe
    // defaults (page 1, limit 20) — the route layer rejects them with 400.
    const parsedPage = Number(page);
    const parsedLimit = Number(limit);
    const pageNum =
      Number.isFinite(parsedPage) && parsedPage >= 1 ? Math.floor(parsedPage) : 1;
    const limitNum = Number.isFinite(parsedLimit)
      ? Math.min(100, Math.max(1, Math.floor(parsedLimit)))
      : 20;
    const skip = (pageNum - 1) * limitNum;

    const [questions, totalItems] = await Promise.all([
      Question.find(filter)
        .sort({ isPinned: -1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate("session", "role topicsToFocus description")
        .lean(),
      Question.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / limitNum);

    res.json({
      success: true,
      questions,
      pagination: {
        totalItems,
        totalPages,
        page: pageNum,
        pageSize: limitNum,
        hasNextPage: pageNum < totalPages,
      },
    });
  } catch (err) {
    console.error("Get my questions error:", err);
    res.status(500).json({ success: false, message: "Internal server error occurred" });
  }
};

/**
 * Add additional questions to an existing session.
 * @route POST /api/questions/add
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When sessionId or questions are invalid, or session is missing.
 * @example
 * POST /api/questions/add
 * Authorization: Bearer eyJhb...
 * {
 *   "sessionId": "6426c5a5...",
 *   "questions": [
 *     {"question": "What is polymorphism?", "answer": "..."}
 *   ]
 * }
 * @example
 * 201 [{"_id":"...","session":"...","question":"...","answer":"..."}]
 */
const addQuestionToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Valid sessionId and non-empty questions array are required.",
      });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ success: false, message: "Requested session could not be found" });
    }

    if (!session.user || session.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );
    //update session to include new question IDs
    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();
    res.status(201).json(createdQuestions);
  } catch (error) {
    console.error("Add question error:", error);
    res.status(500).json({ success: false, message: "Internal server error occurred" });
  }
};

/**
 * Toggle the pinned state of a question.
 * @route POST /api/questions/:id/pin
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When question is not found or server error occurs.
 * @example
 * POST /api/questions/6426c5a5.../pin
 * Authorization: Bearer eyJhb...
 * @example
 * 200 {"success": true, "question": {"_id": "...", "isPinned": true, ...}}
 */
const togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    const session = await Session.findById(question.session);
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    if (!session.user || session.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    question.isPinned = !question.isPinned;
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    console.error("Toggle pin error:", error);
    res.status(500).json({ success: false, message: "Internal server error occurred" });
  }
};


/**
 * Update the note field for a question.
 * @route POST /api/questions/:id/note
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When question is not found or server error occurs.
 * @example
 * POST /api/questions/6426c5a5.../note
 * Authorization: Bearer eyJhb...
 * {
 *   "note": "Add more details about the answer flow."
 * }
 * @example
 * 200 {"success": true, "question": {"_id": "...","note":"..."}}
 */
const updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    const session = await Session.findById(question.session);
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    if (!session.user || session.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    question.note = note || "";
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    console.error("Update note error:", error);
    res.status(500).json({ success: false, message: "Internal server error occurred" });
  }
};

/**
 * Build a balanced day-by-day study plan from a list of problems.
 * @route POST /api/question/study-plan
 */
const buildStudyPlanHandler = async (req, res) => {
  const { problems, days } = req.body || {};

  if (!Array.isArray(problems) || problems.length === 0) {
    return res
      .status(400)
      .json({ success: false, error: "problems must be a non-empty array" });
  }
  if (problems.length > 1000) {
    return res.status(400).json({ success: false, error: "Too many problems" });
  }

  const dayCount = Number(days);
  if (!Number.isInteger(dayCount) || dayCount < 1 || dayCount > 365) {
    return res.status(400).json({
      success: false,
      error: "days must be an integer between 1 and 365",
    });
  }

  const result = buildStudyPlan(problems, dayCount);
  return res.json({ success: true, ...result });
};

module.exports = {
  addQuestionToSession,
  togglePinQuestion,
  updateQuestionNote,
  getMyQuestions,
  buildStudyPlanHandler,
};
