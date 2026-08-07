const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  connectGoogleCalendar,
  handleGoogleCalendarCallback,
  getGoogleCalendarStatus,
  syncGoogleCalendarEvent,
} = require("../controllers/googleCalendarController");

const router = express.Router();

router.get("/connect", protect, connectGoogleCalendar);
router.get("/callback", handleGoogleCalendarCallback);
router.get("/status", protect, getGoogleCalendarStatus);
router.post("/events", protect, syncGoogleCalendarEvent);

module.exports = router;
