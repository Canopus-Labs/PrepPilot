const express = require("express");

const router = express.Router();

// GET /api/google-calendar/connect
router.get("/connect", (req, res) => {
    res.json({
        success: true,
        message: "Google Calendar connect route is working",
    });
});

// GET /api/google-calendar/callback
router.get("/callback", (req, res) => {
    res.json({
        success: true,
        message: "Google Calendar callback route is working",
    });
});

// GET /api/google-calendar/status
router.get("/status", (req, res) => {
    res.json({
        success: true,
        connected: false,
    });
});

// POST /api/google-calendar/events
router.post("/events", (req, res) => {
    const { events } = req.body;

    res.json({
        success: true,
        message: "Calendar events received successfully",
        count: Array.isArray(events) ? events.length : 0,
    });
});

module.exports = router;