const User = require("../models/User");
const {
  getGoogleCalendarAuthUrl,
  exchangeGoogleCalendarCode,
  createOrUpdateGoogleCalendarEvent,
  getGoogleCalendarConnectionStatus,
  encryptSecret,
} = require("../services/googleCalendarService.js");

const connectGoogleCalendar = async (req, res) => {
  try {
    const { authUrl } = getGoogleCalendarAuthUrl(req.user?._id?.toString() || "anonymous");
    return res.status(200).json({ success: true, authUrl });
  } catch (error) {
    console.error("Google Calendar connect error:", error.message);
    return res.status(500).json({ success: false, message: error.message || "Unable to connect Google Calendar" });
  }
};

const handleGoogleCalendarCallback = async (req, res) => {
  try {
    const { code, state, error } = req.query;

    if (error) {
      return res.status(400).json({ success: false, message: "Google authorization failed" });
    }

    if (!code || !state) {
      return res.status(400).json({ success: false, message: "Invalid Google callback payload" });
    }

    const [userId] = state.split(":");
    const tokens = await exchangeGoogleCalendarCode(code);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.googleCalendarConnected = true;
    user.googleCalendarEmail = user.email;
    user.googleCalendarConnectedAt = new Date();
    user.googleCalendarAccessToken = encryptSecret(tokens.accessToken);
    user.googleCalendarRefreshToken = encryptSecret(tokens.refreshToken);
    user.googleCalendarTokenExpiry = tokens.expiryDate ? new Date(tokens.expiryDate) : null;
    await user.save();

    return res.status(200).json({ success: true, message: "Google Calendar connected successfully" });
  } catch (error) {
    console.error("Google Calendar callback error:", error.message);
    return res.status(500).json({ success: false, message: error.message || "Unable to complete Google Calendar connection" });
  }
};

const getGoogleCalendarStatus = async (req, res) => {
  try {
    const status = await getGoogleCalendarConnectionStatus(req.user);
    return res.status(200).json({ success: true, ...status });
  } catch (error) {
    console.error("Google Calendar status error:", error.message);
    return res.status(500).json({ success: false, message: error.message || "Unable to fetch Google Calendar status" });
  }
};

const syncGoogleCalendarEvent = async (req, res) => {
  try {
    const { title, description, startTime, endTime, reminderMinutes, eventId } = req.body || {};

    if (!title || !startTime || !endTime) {
      return res.status(400).json({ success: false, message: "title, startTime, and endTime are required" });
    }

    const result = await createOrUpdateGoogleCalendarEvent(req.user, {
      title,
      description,
      startTime,
      endTime,
      reminderMinutes,
      eventId,
    });

    await User.findByIdAndUpdate(req.user._id, {
      googleCalendarLastSyncedAt: new Date(),
    });

    return res.status(200).json({ success: true, event: result });
  } catch (error) {
    console.error("Google Calendar sync error:", error.message);
    const statusCode = error.message === "expired" ? 401 : 500;
    return res.status(statusCode).json({ success: false, message: error.message === "expired" ? "Google OAuth token has expired. Please reconnect Google Calendar." : error.message || "Unable to sync Google Calendar event" });
  }
};

module.exports = {
  connectGoogleCalendar,
  handleGoogleCalendarCallback,
  getGoogleCalendarStatus,
  syncGoogleCalendarEvent,
};
