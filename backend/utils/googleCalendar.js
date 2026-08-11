const axios = require("axios");

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";
const GOOGLE_CALENDAR_EVENTS_URL =
  "https://www.googleapis.com/calendar/v3/calendars/primary/events";

const GOOGLE_CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar.events";

// The feature is opt-in: without the OAuth credentials and an encryption key
// for the refresh token, every endpoint reports the integration as disabled.
const isConfigured = () =>
  Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_CALENDAR_ENCRYPTION_KEY,
  );

// The redirect URI must exactly match the one authorized in the Google Cloud
// Console. Prefer an explicit callback URL, then BASE_URL, then the request
// host as a last resort.
const getRedirectUri = (req) =>
  process.env.GOOGLE_CALENDAR_CALLBACK_URL ||
  `${
    process.env.BASE_URL || `${req.protocol}://${req.get("host")}`
  }/api/google-calendar/callback`;

const buildAuthUrl = (state, redirectUri) => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: GOOGLE_CALENDAR_SCOPE,
    access_type: "offline",
    prompt: "consent",
    state,
  });
  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
};

const exchangeCode = async (code, redirectUri) => {
  const { data } = await axios.post(
    GOOGLE_TOKEN_URL,
    new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
  );
  return data;
};

const refreshAccessToken = async (refreshToken) => {
  const { data } = await axios.post(
    GOOGLE_TOKEN_URL,
    new URLSearchParams({
      refresh_token: refreshToken,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      grant_type: "refresh_token",
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
  );
  return data.access_token;
};

const getGoogleUserInfo = async (accessToken) => {
  const { data } = await axios.get(GOOGLE_USERINFO_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

const createCalendarEvent = async (accessToken, event) => {
  const { data } = await axios.post(GOOGLE_CALENDAR_EVENTS_URL, event, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};

module.exports = {
  isConfigured,
  getRedirectUri,
  buildAuthUrl,
  exchangeCode,
  refreshAccessToken,
  getGoogleUserInfo,
  createCalendarEvent,
};
