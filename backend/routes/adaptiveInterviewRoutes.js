const express = require("express");
const router = express.Router();
const { startSession, submitAnswer, getSessionReport } = require("../controllers/adaptiveInterviewController");
const { protect } = require("../middlewares/authMiddleware");

// All adaptive interview routes should be protected
router.use(protect);

// Start a new adaptive interview session
router.post("/start", startSession);

// Submit an answer to the current question
router.post("/:sessionId/answer", submitAnswer);

// Get the full session / final report
router.get("/:sessionId", getSessionReport);

module.exports = router;
