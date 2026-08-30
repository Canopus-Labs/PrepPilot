const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getOAuth2Client = () => {
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ||
    "http://localhost:5000/api/google-calendar/callback";

  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri,
  );
};

/**
 * @desc Generate Google OAuth URL for calendar connection
 * @route GET /api/google-calendar/connect
 * @access Private
 */
const connectCalendar = async (req, res) => {
  try {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Google OAuth is not configured on the server",
      });
    }

    const oauth2Client = getOAuth2Client();

    // Create a signed JWT state containing the user ID to prevent CSRF in OAuth callback
    const stateToken = jwt.sign(
      { userId: req.user._id.toString(), action: "google_calendar_connect" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/calendar.events",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
      state: stateToken,
    });

    return res.status(200).json({
      success: true,
      authUrl,
    });
  } catch (error) {
    console.error("Connect Google Calendar error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to initiate Google Calendar connection",
    });
  }
};

/**
 * @desc OAuth callback route executed by Google redirect
 * @route GET /api/google-calendar/callback
 * @access Public (verifies signed state token)
 */
const handleCallback = async (req, res) => {
  const frontendOrigin =
    process.env.FRONTEND_ORIGIN?.trim() || "http://localhost:5173";

  try {
    const { code, state, error: oauthError } = req.query;

    if (oauthError || !code || !state) {
      return res.redirect(
        `${frontendOrigin}/interview-prep?error=calendar_connection_failed`,
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(state, process.env.JWT_SECRET);
    } catch {
      return res.redirect(
        `${frontendOrigin}/interview-prep?error=invalid_state`,
      );
    }

    if (!decoded?.userId) {
      return res.redirect(
        `${frontendOrigin}/interview-prep?error=invalid_user`,
      );
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.redirect(
        `${frontendOrigin}/interview-prep?error=user_not_found`,
      );
    }

    const oauth2Client = getOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    let email = user.email;
    try {
      const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
      const userInfo = await oauth2.userinfo.get();
      if (userInfo.data?.email) {
        email = userInfo.data.email;
      }
    } catch (err) {
      console.warn("Could not retrieve Google user email:", err.message);
    }

    const refreshToken =
      tokens.refresh_token || user.googleCalendar?.refreshToken || null;

    user.googleCalendar = {
      connected: true,
      refreshToken,
      email,
      connectedAt: new Date(),
    };

    await user.save();

    return res.redirect(
      `${frontendOrigin}/interview-prep?google_calendar=connected`,
    );
  } catch (error) {
    console.error("Google Calendar callback error:", error);
    return res.redirect(
      `${frontendOrigin}/interview-prep?error=calendar_connection_error`,
    );
  }
};

/**
 * @desc Get Google Calendar connection status for the authenticated user
 * @route GET /api/google-calendar/status
 * @access Private
 */
const getCalendarStatus = async (req, res) => {
  try {
    const isConnected = !!(
      req.user.googleCalendar?.connected &&
      req.user.googleCalendar?.refreshToken
    );

    return res.status(200).json({
      success: true,
      connected: isConnected,
      email: isConnected ? req.user.googleCalendar?.email || req.user.email : null,
    });
  } catch (error) {
    console.error("Get calendar status error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load Google Calendar status",
    });
  }
};

/**
 * @desc Create/sync events to the authenticated user's Google Calendar
 * @route POST /api/google-calendar/events & POST /api/google-calendar/sync-events
 * @access Private
 */
const syncCalendarEvents = async (req, res) => {
  try {
    const user = req.user;
    if (!user.googleCalendar?.connected || !user.googleCalendar?.refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Google Calendar is not connected. Please connect your account first.",
      });
    }

    const oauth2Client = getOAuth2Client();
    oauth2Client.setCredentials({
      refresh_token: user.googleCalendar.refreshToken,
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const payload = req.body || {};
    const eventsList = Array.isArray(payload.events)
      ? payload.events
      : [payload];

    const createdEvents = [];

    for (const evt of eventsList) {
      const summary = evt.title || evt.summary || "Interview Practice Session";
      const description =
        evt.description || "PrepPilot interview practice session";

      const startDateTime = evt.startTime || evt.start || new Date().toISOString();
      const endDateTime =
        evt.endTime ||
        evt.end ||
        new Date(new Date(startDateTime).getTime() + 60 * 60 * 1000).toISOString();

      const reminderMinutes =
        typeof evt.reminderMinutes === "number" ? evt.reminderMinutes : 15;

      const eventResource = {
        summary,
        description,
        start: { dateTime: new Date(startDateTime).toISOString() },
        end: { dateTime: new Date(endDateTime).toISOString() },
        reminders: {
          useDefault: false,
          overrides: [{ method: "popup", minutes: reminderMinutes }],
        },
      };

      const response = await calendar.events.insert({
        calendarId: "primary",
        requestBody: eventResource,
      });

      createdEvents.push(response.data);
    }

    return res.status(200).json({
      success: true,
      message: "Google Calendar event synced",
      count: createdEvents.length,
      eventId: createdEvents[0]?.id || null,
    });
  } catch (error) {
    console.error("Sync Google Calendar events error:", error?.message || error);
    return res.status(500).json({
      success: false,
      message: "Failed to sync Google Calendar event",
      error: "A server error occurred",
    });
  }
};

module.exports = {
  connectCalendar,
  handleCallback,
  getCalendarStatus,
  syncCalendarEvents,
};
