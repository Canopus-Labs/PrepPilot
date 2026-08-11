import { describe, it, expect, vi, beforeEach } from "vitest";

const GoogleCalendarToken = require("../models/GoogleCalendarToken.js");
const GoogleCalendarAuthState = require("../models/GoogleCalendarAuthState.js");
const googleCalendar = require("../utils/googleCalendar.js");
const { encrypt } = require("../utils/encryption.js");
const {
  connectGoogleCalendar,
  googleCalendarCallback,
  getGoogleCalendarStatus,
  createGoogleCalendarEvent,
} = require("../controllers/googleCalendarController.js");

const USER_ID = "507f1f77bcf86cd799439011";
const REDIRECT_URI = "https://backend.example/api/google-calendar/callback";

function makeReq(body = {}, params = {}, query = {}, user = { _id: USER_ID }) {
  return {
    body,
    params,
    query,
    user,
    protocol: "https",
    get: () => "backend.example",
  };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.redirect = vi.fn().mockReturnValue(res);
  return res;
}

describe("connectGoogleCalendar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    googleCalendar.isConfigured = vi.fn(() => true);
    googleCalendar.getRedirectUri = vi.fn(() => REDIRECT_URI);
    googleCalendar.buildAuthUrl = vi.fn(
      (state) => `https://accounts.google.com/o/oauth2/v2/auth?state=${state}`,
    );
  });

  it("stores a single-use state and returns an OAuth auth URL", async () => {
    GoogleCalendarAuthState.create = vi.fn().mockResolvedValue({});
    const res = makeRes();

    await connectGoogleCalendar(makeReq(), res);

    expect(GoogleCalendarAuthState.create).toHaveBeenCalledWith({
      state: expect.any(String),
      userId: USER_ID,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        authUrl: expect.stringContaining("state="),
      }),
    );
  });

  it("rejects connect when the integration is not configured", async () => {
    googleCalendar.isConfigured = vi.fn(() => false);
    GoogleCalendarAuthState.create = vi.fn();
    const res = makeRes();

    await connectGoogleCalendar(makeReq(), res);

    expect(GoogleCalendarAuthState.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false }),
    );
  });

  it("returns 500 when the state cannot be persisted", async () => {
    GoogleCalendarAuthState.create = vi
      .fn()
      .mockRejectedValue(new Error("db down"));
    const res = makeRes();

    await connectGoogleCalendar(makeReq(), res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false }),
    );
  });
});

describe("googleCalendarCallback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    googleCalendar.getRedirectUri = vi.fn(() => REDIRECT_URI);
    googleCalendar.exchangeCode = vi.fn(async () => ({
      access_token: "access-token-123",
      refresh_token: "refresh-token-123",
    }));
    googleCalendar.getGoogleUserInfo = vi.fn(async () => ({
      email: "user@example.com",
    }));
  });

  it("exchanges the code and persists the encrypted refresh token", async () => {
    GoogleCalendarAuthState.findOne = vi.fn().mockResolvedValue({
      _id: "state-doc-id",
      userId: USER_ID,
    });
    GoogleCalendarToken.findOneAndUpdate = vi.fn().mockResolvedValue({});
    GoogleCalendarAuthState.deleteOne = vi.fn().mockResolvedValue({});
    const res = makeRes();

    await googleCalendarCallback(
      makeReq({}, {}, { code: "oauth-code", state: "state-123" }),
      res,
    );

    expect(googleCalendar.exchangeCode).toHaveBeenCalledWith(
      "oauth-code",
      REDIRECT_URI,
    );
    expect(GoogleCalendarToken.findOneAndUpdate).toHaveBeenCalledWith(
      { userId: USER_ID },
      expect.objectContaining({
        userId: USER_ID,
        refreshTokenEnc: expect.any(String),
        email: "user@example.com",
      }),
      { upsert: true, new: true },
    );
    const storedToken =
      GoogleCalendarToken.findOneAndUpdate.mock.calls[0][1].refreshTokenEnc;
    expect(storedToken).not.toBe("refresh-token-123");
    expect(GoogleCalendarAuthState.deleteOne).toHaveBeenCalledWith({
      _id: "state-doc-id",
    });
    expect(res.redirect).toHaveBeenCalledWith("http://localhost:5173");
  });

  it("redirects to the app without persisting when code/state are missing", async () => {
    GoogleCalendarAuthState.findOne = vi.fn();
    GoogleCalendarToken.findOneAndUpdate = vi.fn();
    const res = makeRes();

    await googleCalendarCallback(makeReq({}, {}, {}), res);

    expect(GoogleCalendarAuthState.findOne).not.toHaveBeenCalled();
    expect(GoogleCalendarToken.findOneAndUpdate).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith("http://localhost:5173");
  });

  it("redirects to the app when the state is unknown or expired", async () => {
    GoogleCalendarAuthState.findOne = vi.fn().mockResolvedValue(null);
    GoogleCalendarToken.findOneAndUpdate = vi.fn();
    const res = makeRes();

    await googleCalendarCallback(
      makeReq({}, {}, { code: "oauth-code", state: "unknown" }),
      res,
    );

    expect(GoogleCalendarToken.findOneAndUpdate).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith("http://localhost:5173");
  });
});

describe("getGoogleCalendarStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    googleCalendar.isConfigured = vi.fn(() => true);
  });

  it("reports not connected when the user has no stored token", async () => {
    GoogleCalendarToken.findOne = vi.fn().mockResolvedValue(null);
    const res = makeRes();

    await getGoogleCalendarStatus(makeReq(), res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      connected: false,
      email: null,
    });
  });

  it("reports the linked account when a token exists", async () => {
    GoogleCalendarToken.findOne = vi.fn().mockResolvedValue({
      email: "user@example.com",
    });
    const res = makeRes();

    await getGoogleCalendarStatus(makeReq(), res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      connected: true,
      email: "user@example.com",
    });
  });

  it("reports the feature as disabled when not configured", async () => {
    googleCalendar.isConfigured = vi.fn(() => false);
    GoogleCalendarToken.findOne = vi.fn();
    const res = makeRes();

    await getGoogleCalendarStatus(makeReq(), res);

    expect(GoogleCalendarToken.findOne).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, connected: false }),
    );
  });
});

describe("createGoogleCalendarEvent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    googleCalendar.isConfigured = vi.fn(() => true);
    googleCalendar.refreshAccessToken = vi.fn(async () => "access-token-123");
    googleCalendar.createCalendarEvent = vi.fn(async (_accessToken, event) => ({
      id: "event-123",
      ...event,
    }));
  });

  it("rejects the sync when the calendar is not connected", async () => {
    GoogleCalendarToken.findOne = vi.fn().mockResolvedValue(null);
    const res = makeRes();

    await createGoogleCalendarEvent(
      makeReq({
        title: "Interview practice",
        startTime: "2026-08-11T10:00:00.000Z",
        endTime: "2026-08-11T11:00:00.000Z",
      }),
      res,
    );

    expect(googleCalendar.createCalendarEvent).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false }),
    );
  });

  it("creates a calendar event with the mapped payload", async () => {
    GoogleCalendarToken.findOne = vi.fn().mockResolvedValue({
      refreshTokenEnc: encrypt("refresh-token-123"),
    });
    const res = makeRes();

    await createGoogleCalendarEvent(
      makeReq({
        title: "Interview practice",
        description: "PrepPilot session",
        startTime: "2026-08-11T10:00:00.000Z",
        endTime: "2026-08-11T11:00:00.000Z",
        reminderMinutes: 15,
      }),
      res,
    );

    expect(googleCalendar.refreshAccessToken).toHaveBeenCalledWith(
      "refresh-token-123",
    );
    expect(googleCalendar.createCalendarEvent).toHaveBeenCalledWith(
      "access-token-123",
      {
        summary: "Interview practice",
        description: "PrepPilot session",
        start: { dateTime: "2026-08-11T10:00:00.000Z" },
        end: { dateTime: "2026-08-11T11:00:00.000Z" },
        reminders: {
          useDefault: false,
          overrides: [{ method: "popup", minutes: 15 }],
        },
      },
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, event: expect.any(Object) }),
    );
  });

  it("returns 500 when the Calendar API call fails", async () => {
    GoogleCalendarToken.findOne = vi.fn().mockResolvedValue({
      refreshTokenEnc: encrypt("refresh-token-123"),
    });
    googleCalendar.refreshAccessToken = vi
      .fn()
      .mockRejectedValue(new Error("token refresh failed"));
    const res = makeRes();

    await createGoogleCalendarEvent(
      makeReq({
        title: "Interview practice",
        startTime: "2026-08-11T10:00:00.000Z",
        endTime: "2026-08-11T11:00:00.000Z",
      }),
      res,
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false }),
    );
  });
});
