import { Module } from "node:module";
import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";

// ---------------------------------------------------------------------------
// resend-verification enumeration fix (issue #1437): the endpoint must return
// the identical generic 200 for every input (not found / verified / unverified)
// so it cannot be used as an account oracle.
//
// authController.js is CommonJS, so we shim Node's module loader (same pattern
// as registerEnumeration.unit.test.js).
// ---------------------------------------------------------------------------

const userMock = vi.hoisted(() => ({
  findOne: vi.fn(),
}));

const sendEmailMock = vi.hoisted(() => ({
  sendVerificationEmail: vi.fn(),
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

let resendVerificationEmail;

beforeAll(async () => {
  clearRequireCache();
  testDoubles.set("../models/User", {
    findOne: userMock.findOne,
    create: vi.fn(),
  });
  testDoubles.set("../utils/sendEmail", sendEmailMock);

  const mod = await import("../controllers/authController.js");
  resendVerificationEmail = mod.resendVerificationEmail;
});

beforeEach(() => {
  userMock.findOne.mockReset();
  sendEmailMock.sendVerificationEmail.mockReset();
  sendEmailMock.sendVerificationEmail.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
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
  return res;
};

const req = (email) => ({ body: { email } });

const GENERIC = {
  success: true,
  message: "If this email is registered, a verification link has been sent.",
};

describe("resendVerificationEmail — account enumeration", () => {
  it("returns the generic 200 and sends nothing when the email is not registered", async () => {
    userMock.findOne.mockResolvedValue(null);

    const res = mockRes();
    await resendVerificationEmail(req("not-registered@example.com"), res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(GENERIC);
    expect(sendEmailMock.sendVerificationEmail).not.toHaveBeenCalled();
  });

  it("returns the generic 200 (not a 400) for an already-verified email and sends nothing", async () => {
    userMock.findOne.mockResolvedValue({ email: "verified@example.com", isEmailVerified: true });

    const res = mockRes();
    await resendVerificationEmail(req("verified@example.com"), res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(GENERIC);
    expect(sendEmailMock.sendVerificationEmail).not.toHaveBeenCalled();
  });

  it("sends the email and returns the same generic shape for an unverified user", async () => {
    const unverified = {
      email: "unverified@example.com",
      isEmailVerified: false,
      emailVerificationToken: null,
      emailVerificationExpires: null,
      save: vi.fn(async function () {
        return this;
      }),
    };
    userMock.findOne.mockResolvedValue(unverified);
    vi.stubEnv("FRONTEND_URL", "http://localhost:5173");

    const res = mockRes();
    await resendVerificationEmail(req("unverified@example.com"), res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(GENERIC);
    expect(sendEmailMock.sendVerificationEmail).toHaveBeenCalledTimes(1);
    expect(sendEmailMock.sendVerificationEmail).toHaveBeenCalledWith(
      "unverified@example.com",
      expect.stringContaining("http://localhost:5173/verify-email")
    );
  });

  it("returns 400 only when the email field itself is missing", async () => {
    const res = mockRes();
    await resendVerificationEmail(req(undefined), res);

    expect(res.statusCode).toBe(400);
    expect(userMock.findOne).not.toHaveBeenCalled();
  });
});
