const questionService = require("../services/questionService");

/**
 * Add additional questions to an existing session.
 * @route POST /api/questions/add
 */
const addQuestionToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;
    const createdQuestions = await questionService.addQuestionsToSession(sessionId, req.user._id, questions);
    res.status(201).json(createdQuestions);
  } catch (error) {
    if (error.message.includes("Invalid") || error.message.includes("not be found")) {
      return res.status(error.message.includes("Invalid") ? 400 : 404).json({ success: false, message: error.message });
    }
    if (error.message === "Unauthorized access") {
      return res.status(403).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: "Internal server error occurred", error: error.message });
  }
};

/**
 * Toggle the pinned state of a question.
 * @route POST /api/questions/:id/pin
 */
const togglePinQuestion = async (req, res) => {
  try {
    const question = await questionService.togglePin(req.params.id, req.user.id || req.user._id);
    res.status(200).json({ success: true, question });
  } catch (error) {
    if (error.message.includes("not found")) {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message === "Unauthorized access") {
      return res.status(403).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: "Internal server error occurred", error: error.message });
  }
};

/**
 * Update the note field for a question.
 * @route POST /api/questions/:id/note
 */
const updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await questionService.updateNote(req.params.id, req.user.id || req.user._id, note);
    res.status(200).json({ success: true, question });
  } catch (error) {
    if (error.message.includes("not found")) {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message === "Unauthorized access") {
      return res.status(403).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: "Internal server error occurred", error: error.message });
  }
};

module.exports = {
  addQuestionToSession,
  togglePinQuestion,
  updateQuestionNote,
};
