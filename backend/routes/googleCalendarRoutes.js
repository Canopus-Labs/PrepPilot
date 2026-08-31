const express = require("express");

const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  connectCalendar,
  handleCallback,
  getCalendarStatus,
  syncCalendarEvents,
} = require("../controllers/googleCalendarController");

// GET /api/google-calendar/connect
router.get("/connect", protect, connectCalendar);

// GET /api/google-calendar/callback
router.get("/callback", handleCallback);

// GET /api/google-calendar/status
router.get("/status", protect, getCalendarStatus);

// POST /api/google-calendar/events
router.post("/events", protect, syncCalendarEvents);

// POST /api/google-calendar/sync-events
router.post("/sync-events", protect, syncCalendarEvents);

module.exports = router;