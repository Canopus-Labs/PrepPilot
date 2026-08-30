import { describe, it, expect, vi, beforeEach } from "vitest";
import jwt from "jsonwebtoken";
import { google } from "googleapis";

vi.mock("../models/User");
const User = require("../models/User");

const {
  connectCalendar,
  handleCallback,
  getCalendarStatus,
  syncCalendarEvents,
} = require("../controllers/googleCalendarController");

function makeReq(body = {}, params = {}, query = {}, user = null) {
  return { body, params, query, user };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.redirect = vi.fn().mockReturnValue(res);
  return res;
}

const sampleUser = {
  _id: "507f1f77bcf86cd799439011",
  name: "Test User",
  email: "user@example.com",
  googleCalendar: {
    connected: false,
    refreshToken: null,
    email: null,
  },
  save: vi.fn().mockResolvedValue(true),
};

describe("googleCalendarController", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = {
      ...originalEnv,
      JWT_SECRET: "test-secret-12345",
      GOOGLE_CLIENT_ID: "mock-client-id",
      GOOGLE_CLIENT_SECRET: "mock-client-secret",
      GOOGLE_REDIRECT_URI: "http://localhost:5000/api/google-calendar/callback",
      FRONTEND_ORIGIN: "http://localhost:5173",
    };

    vi.spyOn(google.auth.OAuth2.prototype, "generateAuthUrl").mockImplementation(
      () => "https://accounts.google.com/o/oauth2/v2/auth?mock=1",
    );

    vi.spyOn(google.auth.OAuth2.prototype, "getToken").mockImplementation(
      async () => ({
        tokens: {
          access_token: "mock-access-token",
          refresh_token: "mock-refresh-token",
        },
      }),
    );

    vi.spyOn(google.auth.OAuth2.prototype, "setCredentials").mockImplementation(() => {});

    vi.spyOn(google, "oauth2").mockImplementation(() => ({
      userinfo: {
        get: vi.fn().mockResolvedValue({
          data: { email: "connected@gmail.com" },
        }),
      },
    }));

    vi.spyOn(google, "calendar").mockImplementation(() => ({
      events: {
        insert: vi.fn().mockResolvedValue({
          data: { id: "google-event-id-123" },
        }),
      },
    }));
  });

  describe("connectCalendar", () => {
    it("returns 500 if GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is missing", async () => {
      delete process.env.GOOGLE_CLIENT_ID;
      const req = makeReq({}, {}, {}, sampleUser);
      const res = makeRes();

      await connectCalendar(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: "Google OAuth is not configured on the server",
        }),
      );
    });

    it("generates an authUrl with a signed state JWT for the user", async () => {
      const req = makeReq({}, {}, {}, sampleUser);
      const res = makeRes();

      await connectCalendar(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        authUrl: "https://accounts.google.com/o/oauth2/v2/auth?mock=1",
      });
    });
  });

  describe("handleCallback", () => {
    it("redirects to error page if code or state is missing", async () => {
      const req = makeReq({}, {}, {});
      const res = makeRes();

      await handleCallback(req, res);

      expect(res.redirect).toHaveBeenCalledWith(
        "http://localhost:5173/interview-prep?error=calendar_connection_failed",
      );
    });

    it("redirects to error page if state JWT signature is invalid", async () => {
      const req = makeReq({}, {}, { code: "mock-code", state: "invalid-state-jwt" });
      const res = makeRes();

      await handleCallback(req, res);

      expect(res.redirect).toHaveBeenCalledWith(
        "http://localhost:5173/interview-prep?error=invalid_state",
      );
    });

    it("exchanges code for tokens, saves connection for user, and redirects to frontend", async () => {
      const validState = jwt.sign(
        { userId: "507f1f77bcf86cd799439011", action: "google_calendar_connect" },
        "test-secret-12345",
      );

      User.findById = vi.fn().mockResolvedValue(sampleUser);

      const req = makeReq({}, {}, { code: "mock-code", state: validState });
      const res = makeRes();

      await handleCallback(req, res);

      expect(User.findById).toHaveBeenCalledWith("507f1f77bcf86cd799439011");
      expect(sampleUser.save).toHaveBeenCalled();
      expect(sampleUser.googleCalendar.connected).toBe(true);
      expect(sampleUser.googleCalendar.refreshToken).toBe("mock-refresh-token");
      expect(res.redirect).toHaveBeenCalledWith(
        "http://localhost:5173/interview-prep?google_calendar=connected",
      );
    });
  });

  describe("getCalendarStatus", () => {
    it("returns connected: false when user has no active Google Calendar connection", async () => {
      const userWithoutCalendar = {
        ...sampleUser,
        googleCalendar: { connected: false, refreshToken: null },
      };

      const req = makeReq({}, {}, {}, userWithoutCalendar);
      const res = makeRes();

      await getCalendarStatus(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        connected: false,
        email: null,
      });
    });

    it("returns connected: true and user email when Google Calendar is connected", async () => {
      const connectedUser = {
        ...sampleUser,
        googleCalendar: {
          connected: true,
          refreshToken: "mock-refresh-token",
          email: "user@gmail.com",
        },
      };

      const req = makeReq({}, {}, {}, connectedUser);
      const res = makeRes();

      await getCalendarStatus(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        connected: true,
        email: "user@gmail.com",
      });
    });
  });

  describe("syncCalendarEvents", () => {
    it("returns 400 if user has not connected Google Calendar", async () => {
      const unconnectedUser = {
        ...sampleUser,
        googleCalendar: { connected: false, refreshToken: null },
      };

      const req = makeReq(
        { title: "Interview Practice", startTime: new Date().toISOString() },
        {},
        {},
        unconnectedUser,
      );
      const res = makeRes();

      await syncCalendarEvents(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: "Google Calendar is not connected. Please connect your account first.",
        }),
      );
    });

    it("syncs event using user's stored refresh token and returns success", async () => {
      const connectedUser = {
        ...sampleUser,
        googleCalendar: {
          connected: true,
          refreshToken: "mock-refresh-token",
          email: "user@gmail.com",
        },
      };

      const req = makeReq(
        {
          title: "SDE-2 practice session",
          description: "PrepPilot session",
          startTime: "2026-08-30T22:00:00.000Z",
          endTime: "2026-08-30T23:00:00.000Z",
          reminderMinutes: 15,
        },
        {},
        {},
        connectedUser,
      );
      const res = makeRes();

      await syncCalendarEvents(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Google Calendar event synced",
        count: 1,
        eventId: "google-event-id-123",
      });
    });
  });
});
