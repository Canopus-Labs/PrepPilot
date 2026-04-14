const express = require("express");
const {
  createSession,
  getSessionById,
  getMySessions,
  deleteSession,
} = require("../controllers/sessionController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create new session
router.post("/create", protect, createSession);

// Get all sessions of logged-in user
router.get("/my-sessions", protect, getMySessions);

// Get a specific session by ID
router.get("/:id", protect, getSessionById);

// Delete a session
router.delete("/:id", protect, deleteSession);

module.exports = router;
