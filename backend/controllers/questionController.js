const Question = require("../models/Question");
const Session = require("../models/Session");

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
    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ success: false, message: "Invalid or missing input data provided" });
    }
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ success: false, message: "Requested session could not be found" });
    }

    if (session.user.toString() !== req.user._id.toString()) {
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
    res.status(500).json({ success: false, message: "Internal server error occurred", error: error.message });
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

    if (session.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    question.isPinned = !question.isPinned;
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error occurred", error: error.message });
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

    if (session.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    question.note = note || "";
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error occurred", error: error.message });
  }
};

module.exports = {
  addQuestionToSession,
  togglePinQuestion,
  updateQuestionNote,
};
