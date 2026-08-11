const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  validateCreateGoogleCalendarEvent,
} = require("../Input_validators/ValidateGoogleCalendar");
const {
  connectGoogleCalendar,
  googleCalendarCallback,
  getGoogleCalendarStatus,
  createGoogleCalendarEvent,
} = require("../controllers/googleCalendarController");

// The callback is a browser redirect from Google, so it cannot carry a Bearer
// header; the connecting user is resolved via the single-use OAuth state.
router.get("/connect", protect, connectGoogleCalendar);
router.get("/callback", googleCalendarCallback);
router.get("/status", protect, getGoogleCalendarStatus);
router.post(
  "/events",
  protect,
  validateCreateGoogleCalendarEvent,
  createGoogleCalendarEvent,
);

module.exports = router;
