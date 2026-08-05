import { Module } from "node:module";
import { describe, it, expect, beforeAll, beforeEach, afterEach, afterAll, vi } from "vitest";

// ---------------------------------------------------------------------------
// Forgot-password / reset-password flow (issue #1264):
// POST /api/auth/forgot-password generates a short-lived reset token and
// emails a reset link; POST /api/auth/reset-password applies the new password
// and revokes all existing sessions.
//
// authController.js is CommonJS and loads its deps via require(), which
// vitest's vi.mock cannot intercept. We shim Node's module loader instead so
// the real User model / nodemailer are never touched.
// ---------------------------------------------------------------------------

const userMock = vi.hoisted(() => ({
  findOne: vi.fn(),
}));

const sendEmailMock = vi.hoisted(() => ({
  sendVerificationEmail: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
}));

const testDoubles = new Map();
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (testDoubles.has(request)) {
    return testDoubles.get(request);
  }
  return originalLoad.call(this, request, parent, isMain);
};

const clearRequireCache = () => {
  Object.keys(require.cache).forEach((key) => {
    if (
      key.includes("controllers\\authController") ||
      key.includes("controllers/authController") ||
      key.includes("models\\User") ||
      key.includes("models/User")
    ) {
      delete require.cache[key];
    }
  });
};

let forgotPassword;
let resetPassword;

beforeAll(async () => {
  clearRequireCache();
  testDoubles.set("../models/User", {
    findOne: userMock.findOne,
  });
  testDoubles.set("../utils/sendEmail", {
    sendVerificationEmail: sendEmailMock.sendVerificationEmail,
    sendPasswordResetEmail: sendEmailMock.sendPasswordResetEmail,
  });

  const mod = await import("../controllers/authController.js");
  forgotPassword = mod.forgotPassword;
  resetPassword = mod.resetPassword;
});

beforeEach(() => {
  vi.stubEnv("JWT_SECRET", "test_secret");
  vi.stubEnv("FRONTEND_URL", "https://preppilot.test");
  userMock.findOne.mockReset();
  sendEmailMock.sendPasswordResetEmail.mockReset();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

afterAll(() => {
  Module._load = originalLoad;
});

const mockRes = () => {
  const res = { statusCode: 200, body: null };
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (body) => {
    res.body = body;
    return res;
  };
  res.clearCookie = vi.fn(() => res);
  return res;
};

describe("forgotPassword", () => {
  it("returns 400 when email is missing", async () => {
    const res = mockRes();
    await forgotPassword({ body: {} }, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(userMock.findOne).not.toHaveBeenCalled();
  });

  it("returns a generic success when the account does not exist (anti-enumeration)", async () => {
    userMock.findOne.mockResolvedValue(null);

    const res = mockRes();
    await forgotPassword({ body: { email: "nobody@example.com" } }, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain("reset link has been sent");
    expect(sendEmailMock.sendPasswordResetEmail).not.toHaveBeenCalled();
  });

  it("generates a short-lived token and emails a reset link for an existing account", async () => {
    const fakeUser = {
      email: "user@example.com",
      passwordResetToken: null,
      passwordResetExpires: null,
      save: vi.fn(async function () {
        return this;
      }),
    };
    userMock.findOne.mockResolvedValue(fakeUser);

    const res = mockRes();
    await forgotPassword({ body: { email: " user@example.com " } }, res);

    expect(userMock.findOne).toHaveBeenCalledWith({ email: "user@example.com" });
    expect(fakeUser.passwordResetToken).toMatch(/^[a-f0-9]{64}$/);
    const expiresInMs = fakeUser.passwordResetExpires.getTime() - Date.now();
    expect(expiresInMs).toBeGreaterThan(50 * 60 * 1000);
    expect(expiresInMs).toBeLessThan(70 * 60 * 1000);
    expect(fakeUser.save).toHaveBeenCalledTimes(1);
    expect(sendEmailMock.sendPasswordResetEmail).toHaveBeenCalledWith(
      "user@example.com",
      `https://preppilot.test/reset-password?token=${fakeUser.passwordResetToken}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain("reset link has been sent");
  });

  it("returns 500 when a database error occurs", async () => {
    userMock.findOne.mockRejectedValue(new Error("Database connection lost"));

    const res = mockRes();
    await forgotPassword({ body: { email: "user@example.com" } }, res);

    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
  });
});

describe("resetPassword", () => {
  it("returns 400 when token or newPassword is missing", async () => {
    const res = mockRes();
    await resetPassword({ body: { token: "abc" } }, res);

    expect(res.statusCode).toBe(400);
    expect(userMock.findOne).not.toHaveBeenCalled();
  });

  it("returns 400 when the new password fails the password policy", async () => {
    const res = mockRes();
    await resetPassword({ body: { token: "abc", newPassword: "weak" } }, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(userMock.findOne).not.toHaveBeenCalled();
  });

  it("returns 400 when the token is invalid or expired", async () => {
    userMock.findOne.mockResolvedValue(null);

    const res = mockRes();
    await resetPassword({ body: { token: "stale-token", newPassword: "StrongPass123!" } }, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain("invalid or has expired");
  });

  it("sets the raw password, clears reset + session tokens, and bumps tokenVersion", async () => {
    const fakeUser = {
      password: "old-hash",
      passwordResetToken: "valid-token",
      passwordResetExpires: new Date(Date.now() + 60 * 60 * 1000),
      refreshTokenHash: "old-refresh-hash",
      refreshTokenExpiresAt: new Date(Date.now() + 10000),
      tokenVersion: 1,
      save: vi.fn(async function () {
        return this;
      }),
    };
    userMock.findOne.mockResolvedValue(fakeUser);

    const res = mockRes();
    await resetPassword({ body: { token: "valid-token", newPassword: "StrongPass123!" } }, res);

    expect(userMock.findOne).toHaveBeenCalledWith({
      passwordResetToken: "valid-token",
      passwordResetExpires: { $gt: expect.any(Date) },
    });
    expect(fakeUser.password).toBe("StrongPass123!");
    expect(fakeUser.passwordResetToken).toBeNull();
    expect(fakeUser.passwordResetExpires).toBeNull();
    expect(fakeUser.refreshTokenHash).toBeNull();
    expect(fakeUser.refreshTokenExpiresAt).toBeNull();
    expect(fakeUser.tokenVersion).toBe(2);
    expect(fakeUser.save).toHaveBeenCalledTimes(1);
    expect(res.clearCookie).toHaveBeenCalledWith("refreshToken", {
      path: "/api/auth",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("returns 500 when a database error occurs", async () => {
    userMock.findOne.mockRejectedValue(new Error("Database connection lost"));

    const res = mockRes();
    await resetPassword({ body: { token: "abc", newPassword: "StrongPass123!" } }, res);

    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
  });
});
