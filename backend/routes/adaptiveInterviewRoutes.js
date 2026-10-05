const express = require("express");
const router = express.Router();
const {
  startSession,
  submitAnswer,
  getSessionHistory,
  getSessionReport,
} = require("../controllers/adaptiveInterviewController");
const { protect } = require("../middlewares/authMiddleware");

// All adaptive interview routes require authentication
router.use(protect);

// GET /api/adaptive-interview/history - Paginated session history
router.get("/history", getSessionHistory);

// POST /api/adaptive-interview/start - Start a new adaptive interview session
router.post("/start", startSession);

// POST /api/adaptive-interview/:sessionId/answer - Submit answer to current question
router.post("/:sessionId/answer", submitAnswer);

// GET /api/adaptive-interview/:sessionId - Get full session details / final report
router.get("/:sessionId", getSessionReport);

module.exports = router;
