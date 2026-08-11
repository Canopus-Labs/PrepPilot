const crypto = require("crypto");
const GoogleCalendarToken = require("../models/GoogleCalendarToken");
const GoogleCalendarAuthState = require("../models/GoogleCalendarAuthState");
const { encrypt, decrypt } = require("../utils/encryption");
const googleCalendar = require("../utils/googleCalendar");

const FRONTEND_URL = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

/**
 * @desc Start the Google OAuth2 flow
 * @route GET /api/google-calendar/connect
 * @access Private
 */
const connectGoogleCalendar = async (req, res) => {
  if (!googleCalendar.isConfigured()) {
    return res.status(400).json({
      success: false,
      message: "Google Calendar integration is not configured",
    });
  }

  try {
    const state = crypto.randomBytes(24).toString("hex");
    await GoogleCalendarAuthState.create({ state, userId: req.user._id });

    const redirectUri = googleCalendar.getRedirectUri(req);
    const authUrl = googleCalendar.buildAuthUrl(state, redirectUri);

    return res.status(200).json({ success: true, authUrl });
  } catch (error) {
    console.error("Failed to start Google Calendar connect:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to connect Google Calendar",
    });
  }
};

/**
 * @desc Exchange the OAuth code, persist the refresh token, and return
 *       the user to the app
 * @route GET /api/google-calendar/callback
 * @access Public (OAuth redirect target)
 */
const googleCalendarCallback = async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.redirect(FRONTEND_URL);
  }

  try {
    const authState = await GoogleCalendarAuthState.findOne({ state });
    if (!authState) {
      return res.redirect(FRONTEND_URL);
    }

    const redirectUri = googleCalendar.getRedirectUri(req);
    const tokens = await googleCalendar.exchangeCode(code, redirectUri);
    if (!tokens.refresh_token) {
      return res.redirect(FRONTEND_URL);
    }

    const userInfo = await googleCalendar.getGoogleUserInfo(tokens.access_token);

    await GoogleCalendarToken.findOneAndUpdate(
      { userId: authState.userId },
      {
        userId: authState.userId,
        refreshTokenEnc: encrypt(tokens.refresh_token),
        email: userInfo.email || "",
      },
      { upsert: true, new: true },
    );

    await GoogleCalendarAuthState.deleteOne({ _id: authState._id });

    return res.redirect(FRONTEND_URL);
  } catch (error) {
    console.error("Google Calendar callback failed:", error.message);
    return res.redirect(FRONTEND_URL);
  }
};

/**
 * @desc Report whether the user's Google Calendar is linked
 * @route GET /api/google-calendar/status
 * @access Private
 */
const getGoogleCalendarStatus = async (req, res) => {
  if (!googleCalendar.isConfigured()) {
    return res.status(200).json({
      success: false,
      connected: false,
      message: "Google Calendar integration is not configured",
    });
  }

  try {
    const tokenDoc = await GoogleCalendarToken.findOne({
      userId: req.user._id,
    });

    if (!tokenDoc) {
      return res.status(200).json({
        success: true,
        connected: false,
        email: null,
      });
    }

    return res.status(200).json({
      success: true,
      connected: true,
      email: tokenDoc.email,
    });
  } catch (error) {
    console.error("Failed to load Google Calendar status:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to load Google Calendar status",
    });
  }
};

/**
 * @desc Create a calendar event from the interview prep session
 * @route POST /api/google-calendar/events
 * @access Private
 */
const createGoogleCalendarEvent = async (req, res) => {
  if (!googleCalendar.isConfigured()) {
    return res.status(400).json({
      success: false,
      message: "Google Calendar integration is not configured",
    });
  }

  try {
    const tokenDoc = await GoogleCalendarToken.findOne({
      userId: req.user._id,
    });
    if (!tokenDoc) {
      return res.status(400).json({
        success: false,
        message: "Google Calendar is not connected",
      });
    }

    const accessToken = await googleCalendar.refreshAccessToken(
      decrypt(tokenDoc.refreshTokenEnc),
    );

    const event = {
      summary: req.body.title,
      description: req.body.description || "",
      start: { dateTime: req.body.startTime },
      end: { dateTime: req.body.endTime },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "popup", minutes: req.body.reminderMinutes ?? 15 },
        ],
      },
    };

    const createdEvent = await googleCalendar.createCalendarEvent(
      accessToken,
      event,
    );

    return res.status(201).json({ success: true, event: createdEvent });
  } catch (error) {
    console.error("Failed to sync Google Calendar event:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to sync Google Calendar event",
    });
  }
};

module.exports = {
  connectGoogleCalendar,
  googleCalendarCallback,
  getGoogleCalendarStatus,
  createGoogleCalendarEvent,
};
