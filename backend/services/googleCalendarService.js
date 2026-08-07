const crypto = require("crypto");
const { google } = require("googleapis");

const GOOGLE_CALENDAR_SCOPES = ["https://www.googleapis.com/auth/calendar.events"];
const ENCRYPTION_ALGORITHM = "aes-256-gcm";
const ENCRYPTION_KEY = crypto
  .createHash("sha256")
  .update(process.env.JWT_SECRET || "prep-pilot-google-calendar")
  .digest();

const getGoogleOAuthClient = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error("Google Calendar integration is not configured.");
  }

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
};

const encryptSecret = (value) => {
  if (!value) return null;

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, ENCRYPTION_KEY, iv);
  const encrypted = Buffer.concat([
    cipher.update(Buffer.from(value, "utf8")),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString("base64");
};

const decryptSecret = (value) => {
  if (!value) return null;

  try {
    const buffer = Buffer.from(value, "base64");
    const iv = buffer.subarray(0, 12);
    const tag = buffer.subarray(12, 28);
    const encrypted = buffer.subarray(28);
    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, ENCRYPTION_KEY, iv);
    decipher.setAuthTag(tag);

    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
  } catch (error) {
    console.error("Failed to decrypt Google Calendar token:", error.message);
    return null;
  }
};

const getGoogleCalendarAuthUrl = (userId) => {
  const oauth2Client = getGoogleOAuthClient();
  const state = `${userId}:${crypto.randomBytes(8).toString("hex")}`;
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: GOOGLE_CALENDAR_SCOPES,
    state,
  });

  return { authUrl, state };
};

const exchangeGoogleCalendarCode = async (code) => {
  const oauth2Client = getGoogleOAuthClient();
  const { tokens } = await oauth2Client.getToken(code);

  return {
    accessToken: tokens.access_token || null,
    refreshToken: tokens.refresh_token || null,
    expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
    scope: tokens.scope || GOOGLE_CALENDAR_SCOPES.join(" "),
  };
};

const buildCalendarEventPayload = (payload) => {
  const startTime = payload.startTime ? new Date(payload.startTime) : new Date(Date.now() + 60 * 60 * 1000);
  const endTime = payload.endTime ? new Date(payload.endTime) : new Date(startTime.getTime() + 60 * 60 * 1000);
  const reminderMinutes = Number(payload.reminderMinutes || 10);

  return {
    summary: payload.title || "PrepPilot Interview Prep",
    description: payload.description || "Synced from PrepPilot",
    start: {
      dateTime: startTime.toISOString(),
      timeZone: "UTC",
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: "UTC",
    },
    reminders: {
      useDefault: false,
      overrides: [{ method: "popup", minutes: reminderMinutes }],
    },
  };
};

const createOrUpdateGoogleCalendarEvent = async (user, payload) => {
  if (!user) {
    throw new Error("User is required");
  }

  const accessToken = decryptSecret(user.googleCalendarAccessToken);
  const refreshToken = decryptSecret(user.googleCalendarRefreshToken);

  if (!accessToken || !refreshToken) {
    throw new Error("Google Calendar is not connected");
  }

  const oauth2Client = getGoogleOAuthClient();
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
    expiry_date: user.googleCalendarTokenExpiry ? new Date(user.googleCalendarTokenExpiry).getTime() : undefined,
  });

  if (user.googleCalendarTokenExpiry && new Date(user.googleCalendarTokenExpiry).getTime() <= Date.now()) {
    try {
      const { credentials } = await oauth2Client.refreshAccessToken();
      return {
        credentials: {
          accessToken: credentials.access_token || accessToken,
          refreshToken: credentials.refresh_token || refreshToken,
          expiryDate: credentials.expiry_date ? new Date(credentials.expiry_date).toISOString() : null,
        },
      };
    } catch (error) {
      throw new Error("expired");
    }
  }

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const requestBody = buildCalendarEventPayload(payload);
  const calendarId = payload.calendarId || "primary";

  const response = payload.eventId
    ? await calendar.events.update({ calendarId, eventId: payload.eventId, requestBody })
    : await calendar.events.insert({ calendarId, requestBody });

  return {
    eventId: response.data.id,
    htmlLink: response.data.htmlLink,
    credentials: {
      accessToken,
      refreshToken,
      expiryDate: user.googleCalendarTokenExpiry ? new Date(user.googleCalendarTokenExpiry).toISOString() : null,
    },
  };
};

const getGoogleCalendarConnectionStatus = async (user) => {
  if (!user) {
    return { connected: false };
  }

  return {
    connected: Boolean(user.googleCalendarConnected),
    email: user.googleCalendarEmail || null,
    connectedAt: user.googleCalendarConnectedAt || null,
  };
};

module.exports = {
  encryptSecret,
  decryptSecret,
  getGoogleCalendarAuthUrl,
  exchangeGoogleCalendarCode,
  createOrUpdateGoogleCalendarEvent,
  getGoogleCalendarConnectionStatus,
};
