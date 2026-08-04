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
  res.cookie = () => res;
  return res;
};

const req = (overrides = {}) => ({
  body: { name: "Test User", email: "new@example.com", password: "StrongPass123!" },
  ...overrides,
});

describe("registerUser — account enumeration", () => {
  it("returns a generic 201 for an already-registered email (no tokens, no user data)", async () => {
    userMock.findOne.mockResolvedValue({ _id: "existing-id" });

    const res = mockRes();
    await registerUser(req(), res);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain("already registered");
    expect(res.body.accessToken).toBeUndefined();
    expect(res.body._id).toBeUndefined();
    expect(userMock.create).not.toHaveBeenCalled();
  });

  it("returns 201 with tokens for a brand-new email", async () => {
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
    expect(res.body.success).toBe(true);
    expect(res.body.accessToken).toBeTruthy();
  });
});
