const express = require("express");
const {
  createSession,
  getSessionById,
  getMySessions,
  deleteSession,
} = require("../controllers/sessionController");
const { protect } = require("../middlewares/authMiddleware");
const { validateCreateSession, validateGetSessionById, validateDeleteSession } = require("../Input_validators/ValidateSession");

const router = express.Router();

/**
 * Create a new user session.
 * @route POST /api/sessions/create
 */

router.use(protect);
router.post("/create", validateCreateSession, createSession);

/**
 * Get all sessions for the authenticated user.
 * @route GET /api/sessions/my-sessions
 */
router.get("/my-sessions", getMySessions);

/**
 * Get a session by its ID.
 * @route GET /api/sessions/:id
 */
router.get("/:id", validateGetSessionById,  getSessionById);

/**
 * Delete a session by its ID.
 * @route DELETE /api/sessions/:id
 */
router.delete("/:id", validateDeleteSession, deleteSession);

module.exports = router;
