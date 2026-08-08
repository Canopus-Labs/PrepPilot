import { describe, it, expect, beforeAll } from "vitest";

// ---------------------------------------------------------------------------
// Issue #1631: profileImageUrl must be validated on write. z.string().url()
// alone accepts non-http schemes (e.g. "javascript:..."), and PUT /api/auth/
// profile previously had no validator at all. Both the register and profile
// update paths must now accept only http(s) URLs (plus "" / null).
// ---------------------------------------------------------------------------

let authValidators;

beforeAll(async () => {
  const mod = await import("../Input_validators/ValidateAuth.js");
  authValidators = mod;
});

function run(mw, req) {
  let passed = false;
  let statusCode = null;
  let body = null;
  const res = {
    status: (code) => {
      statusCode = code;
      return res;
    },
    json: (payload) => {
      body = payload;
      return res;
    },
  };
  mw(req, res, () => {
    passed = true;
  });
  return { passed, statusCode, body };
}

const VALID_SIGNUP = {
  name: "Test User",
  email: "test@example.com",
  password: "Password123!",
};

describe("register (validateUserSignup) profileImageUrl validation", () => {
  it("accepts a valid https URL and writes the trimmed value to req.body", () => {
    const req = { body: { ...VALID_SIGNUP, profileImageUrl: "  https://cdn.example.com/img.png  " } };
    const result = run(authValidators.validateUserSignup, req);
    expect(result.passed).toBe(true);
    expect(result.statusCode).toBe(null);
    expect(req.body.profileImageUrl).toBe("https://cdn.example.com/img.png");
  });

  it("accepts a valid http URL", () => {
    const req = { body: { ...VALID_SIGNUP, profileImageUrl: "http://x.com/a.png" } };
    expect(run(authValidators.validateUserSignup, req).passed).toBe(true);
  });

  it("accepts an empty string and a missing field", () => {
    expect(run(authValidators.validateUserSignup, { body: { ...VALID_SIGNUP, profileImageUrl: "" } }).passed).toBe(true);
    expect(run(authValidators.validateUserSignup, { body: { ...VALID_SIGNUP } }).passed).toBe(true);
  });

  it.each([
    ["javascript:alert(1)", "javascript scheme"],
    ["data:text/html,<script>alert(1)</script>", "data scheme"],
    ["ftp://x.com/img.png", "ftp scheme"],
    ["not a url", "plain string"],
  ])("rejects %s (%s) with 400", (value) => {
    const req = { body: { ...VALID_SIGNUP, profileImageUrl: value } };
    const result = run(authValidators.validateUserSignup, req);
    expect(result.passed).toBe(false);
    expect(result.statusCode).toBe(400);
    expect(result.body.success).toBe(false);
    expect(result.body.errors.some((e) => e.field === "profileImageUrl")).toBe(true);
  });

  it("rejects a URL longer than 2048 characters", () => {
    const req = { body: { ...VALID_SIGNUP, profileImageUrl: `https://x.com/${"a".repeat(2050)}` } };
    const result = run(authValidators.validateUserSignup, req);
    expect(result.passed).toBe(false);
    expect(result.statusCode).toBe(400);
  });
});

describe("update profile (validateUpdateProfile) profileImageUrl validation", () => {
  it("accepts a valid https URL and preserves unrelated fields via passthrough", () => {
    const req = { body: { profileImageUrl: "https://cdn.example.com/me.png", firstName: "Ada", bio: "hi" } };
    const result = run(authValidators.validateUpdateProfile, req);
    expect(result.passed).toBe(true);
    expect(req.body.firstName).toBe("Ada");
    expect(req.body.bio).toBe("hi");
  });

  it("accepts empty string and null so the image can be cleared", () => {
    expect(run(authValidators.validateUpdateProfile, { body: { profileImageUrl: "" } }).passed).toBe(true);
    expect(run(authValidators.validateUpdateProfile, { body: { profileImageUrl: null } }).passed).toBe(true);
  });

  it.each(["javascript:alert(1)", "data:image/png;base64,AAAA", "ftp://x.com/a.png", "not a url"])(
    "rejects %s with 400",
    (value) => {
      const req = { body: { profileImageUrl: value } };
      const result = run(authValidators.validateUpdateProfile, req);
      expect(result.passed).toBe(false);
      expect(result.statusCode).toBe(400);
      expect(result.body.errors.some((e) => e.field === "profileImageUrl")).toBe(true);
    }
  );

  it("rejects a URL longer than 2048 characters", () => {
    const req = { body: { profileImageUrl: `http://x.com/${"b".repeat(2050)}` } };
    const result = run(authValidators.validateUpdateProfile, req);
    expect(result.passed).toBe(false);
    expect(result.statusCode).toBe(400);
  });
});
