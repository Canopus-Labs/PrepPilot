import { Module } from "node:module";
import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";

// ---------------------------------------------------------------------------
// Register account-enumeration fix (issue #930):
// registering with an already-existing email must not return a distinct
// "already exists" error — the response is generic and the status is the same.
//
// authController.js is CommonJS and loads its deps via require(), which
// vitest's vi.mock cannot intercept. We shim Node's module loader instead so
// the real User model / bcrypt are never touched.
// ---------------------------------------------------------------------------

const userMock = vi.hoisted(() => ({
  findOne: vi.fn(),
  create: vi.fn(),
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

let registerUser;

beforeAll(async () => {
  clearRequireCache();
  testDoubles.set("../models/User", {
    findOne: userMock.findOne,
    create: userMock.create,
  });
  testDoubles.set("bcryptjs", {
    hash: vi.fn(async () => "hashed_refresh_token"),
    compare: vi.fn(),
  });

  const mod = await import("../controllers/authController.js");
  registerUser = mod.registerUser;
});

beforeEach(() => {
  vi.stubEnv("JWT_SECRET", "test_secret");
  userMock.findOne.mockReset();
  userMock.create.mockReset();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

const mockRes = () => {
  const res = { statusCode: null, body: null };
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (body) => {
    res.body = body;
    return res;
  };
  res.cookie = vi.fn(() => res);
  return res;
};

const req = (overrides = {}) => ({
  body: { name: "Test User", email: "new@example.com", password: "StrongPass123!" },
  ...overrides,
});

describe("registerUser — account enumeration", () => {
  const REGISTRATION_MESSAGE = "If this email is not already registered, your account has been created.";

  it("returns a generic 201 for an already-registered email (no tokens, no user data)", async () => {
    userMock.findOne.mockResolvedValue({ _id: "existing-id" });

    const res = mockRes();
    await registerUser(req(), res);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ success: true, message: REGISTRATION_MESSAGE });
    expect(userMock.create).not.toHaveBeenCalled();
  });

  it("returns the identical generic 201 for a brand-new email (no tokens, no user data, no cookie)", async () => {
    userMock.findOne.mockResolvedValue(null);
    const fakeUser = {
      _id: "new-id",
      tokenVersion: 0,
      name: "Test User",
      email: "new@example.com",
      profileImageUrl: null,
      refreshTokenHash: null,
      refreshTokenExpiresAt: null,
      save: vi.fn(async function () {
        return this;
      }),
    };
    userMock.create.mockResolvedValue(fakeUser);

    const res = mockRes();
    await registerUser(req(), res);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ success: true, message: REGISTRATION_MESSAGE });
    expect(res.cookie).not.toHaveBeenCalled();
  });

  it("produces responses indistinguishable in shape for fresh vs already-registered emails", async () => {
    // Fresh email path
    userMock.findOne.mockResolvedValue(null);
    const fakeUser = {
      _id: "new-id",
      tokenVersion: 0,
      name: "Test User",
      email: "new@example.com",
      profileImageUrl: null,
      refreshTokenHash: null,
      refreshTokenExpiresAt: null,
      save: vi.fn(async function () {
        return this;
      }),
    };
    userMock.create.mockResolvedValue(fakeUser);

    const freshRes = mockRes();
    await registerUser(req(), freshRes);

    // Already-registered email path
    userMock.create.mockClear();
    userMock.findOne.mockResolvedValue({ _id: "existing-id" });

    const existingRes = mockRes();
    await registerUser(req(), existingRes);

    expect(freshRes.statusCode).toBe(201);
    expect(existingRes.statusCode).toBe(201);
    expect(Object.keys(freshRes.body).sort()).toEqual(Object.keys(existingRes.body).sort());
    expect(freshRes.body).toEqual(existingRes.body);
  });
});
