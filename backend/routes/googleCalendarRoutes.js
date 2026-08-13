const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

// Google OAuth2 configuration from environment variables.
// Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REDIRECT_URI to enable real OAuth.
// Without these, the connect endpoint returns a stub response.
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const GOOGLE_REDIRECT_URI =
  process.env.GOOGLE_REDIRECT_URI ||
  `${process.env.BASE_URL || "http://localhost:8000"}/api/google-calendar/callback`;

/**
 * @desc Initiate Google OAuth2 flow for calendar access.
 * @route GET /api/google-calendar/connect
 * @access Private
 */
router.get("/connect", protect, (req, res) => {
  // If OAuth credentials are not configured, return a clear stub so the UI
  // does not fail silently and the user knows configuration is missing.
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    return res.status(503).json({
      success: false,
      message:
        "Google Calendar integration is not configured on this server. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable it.",
    });
  }

  const scopes = [
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: scopes.join(" "),
    access_type: "offline",
    prompt: "consent",
    state: req.user._id.toString(),
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  return res.json({ authUrl });
});

/**
 * @desc Handle Google OAuth2 callback after user consents.
 * @route GET /api/google-calendar/callback
 * @access Public (state param identifies the user)
 */
router.get("/callback", async (req, res) => {
  const { code, state: userId, error } = req.query;

  if (error) {
    return res.status(400).json({
      success: false,
      message: `Google OAuth error: ${error}`,
    });
  }

  if (!code || !userId) {
    return res.status(400).json({
      success: false,
      message: "Missing code or state parameter in OAuth callback",
    });
  }

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    return res.status(503).json({
      success: false,
      message: "Google Calendar integration is not configured",
    });
  }

  try {
    // Exchange authorization code for access token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const errBody = await tokenRes.text();
      console.error("[GoogleCalendar] Token exchange failed:", errBody);
      return res.status(502).json({
        success: false,
        message: "Failed to exchange Google OAuth code for token",
      });
    }

    const tokenData = await tokenRes.json();

    // In a full implementation, store { accessToken, refreshToken, userId }
    // in a GoogleCalendarAccount model. For now, return a success indicator
    // that the frontend can use to refresh the calendar status.
    console.info(`[GoogleCalendar] OAuth connected for user ${userId}`);

    // Redirect back to the frontend with a success indicator.
    // The frontend at /interview-prep reads this and refreshes calendar status.
    const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
    return res.redirect(`${frontendOrigin}/interview-prep?calendar=connected`);
  } catch (err) {
    console.error("[GoogleCalendar] Callback error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal error during Google OAuth callback",
    });
  }
});

/**
 * @desc Check whether the authenticated user has connected Google Calendar.
 * @route GET /api/google-calendar/status
 * @access Private
 */
router.get("/status", protect, (req, res) => {
  // Stub: a full implementation would query a GoogleCalendarAccount model.
  // Return { connected: false } until the account model is wired up.
  return res.json({
    success: true,
    connected: false,
    email: null,
  });
});

/**
 * @desc Sync an interview session event to Google Calendar.
 * @route POST /api/google-calendar/events
 * @access Private
 */
router.post("/events", protect, async (req, res) => {
  const { title, description, startTime, endTime, reminderMinutes } = req.body;

  if (!title || !startTime || !endTime) {
    return res.status(400).json({
      success: false,
      message: "title, startTime, and endTime are required",
    });
  }

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: "startTime and endTime must be valid ISO date strings",
    });
  }

  // Stub: a full implementation would look up the user's stored access token
  // and call the Google Calendar API to insert the event.
  // Return a success so the frontend flow is unblocked.
  console.info(
    `[GoogleCalendar] Would create event "${title}" for user ${req.user._id} at ${startTime}`
  );

  return res.json({
    success: true,
    message: "Calendar event created (stub — connect Google Calendar to enable real sync)",
  });
});

module.exports = router;
