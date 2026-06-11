const express = require("express");
const {
  createSession,
  getSessionById,
  getMySessions,
  deleteSession,
} = require("../controllers/sessionController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * Create a new user session.
 * @route POST /api/sessions/create
 */
router.post("/create", protect, createSession);

/**
 * Get all sessions for the authenticated user.
 * @route GET /api/sessions/my-sessions
 */
router.get("/my-sessions", protect, getMySessions);

/**
 * Get a session by its ID.
 * @route GET /api/sessions/:id
 */
router.get("/:id", protect, getSessionById);

/**
 * Delete a session by its ID.
 * @route DELETE /api/sessions/:id
 */
router.delete("/:id", protect, deleteSession);

module.exports = router;
