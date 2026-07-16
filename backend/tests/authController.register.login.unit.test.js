import { describe, it, expect, vi, beforeEach } from "vitest";

// ─── Module Mocks ─────────────────────────────────────────────────────────────
// Mirror the same mock shape used in authController.tokens.unit.test.js

vi.mock("../models/User.js", () => ({
  findById: vi.fn(),
  findOne: vi.fn(),
  create: vi.fn(),
}));

vi.mock("bcryptjs", () => ({
  compare: vi.fn(),
  genSalt: vi.fn().mockResolvedValue("salt"),
  hash: vi.fn().mockResolvedValue("hashed_refresh_token"),
}));

vi.mock("jsonwebtoken", () => ({
  sign: vi.fn().mockReturnValue("mock_jwt_token"),
  verify: vi.fn(),
}));

// passwordPolicy is called inside registerUser to validate the password
vi.mock("../utils/passwordPolicy.js", () => ({
  validatePassword: vi.fn().mockReturnValue({ valid: true, errors: [] }),
}));

// sendVerificationEmail is imported at the top of authController even though
// it is not called during register/login (email verification is currently
// disabled). Mocking it avoids errors from missing SMTP configuration.
vi.mock("../utils/sendEmail.js", () => ({
  sendVerificationEmail: vi.fn().mockResolvedValue(undefined),
}));

// ─── Test Variables ───────────────────────────────────────────────────────────

let registerUser;
let loginUser;
let User;
let bcrypt;
let validatePassword;

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(async () => {
  vi.resetModules();
  vi.clearAllMocks();

  process.env.JWT_SECRET = "test-secret";

  const ctrl = await import("../controllers/authController.js");
  registerUser = ctrl.registerUser ?? ctrl.default?.registerUser;
  loginUser = ctrl.loginUser ?? ctrl.default?.loginUser;

  const UserModule = await import("../models/User.js");
  User = UserModule.default ?? UserModule;

  const bcryptModule = await import("bcryptjs");
  bcrypt = bcryptModule.default ?? bcryptModule;

  const policyModule = await import("../utils/passwordPolicy.js");
  validatePassword = policyModule.validatePassword ?? policyModule.default?.validatePassword;
});

// ─── Helper ───────────────────────────────────────────────────────────────────

/** Build a minimal Express-style res mock with chainable .status() */
const makeRes = () => {
  const res = { status: vi.fn(), json: vi.fn() };
  res.status.mockReturnValue(res);
  return res;
};

// ─────────────────────────────────────────────────────────────────────────────
// registerUser
// ─────────────────────────────────────────────────────────────────────────────

describe("registerUser", () => {
  it("returns 400 when the password fails policy validation", async () => {
    validatePassword.mockReturnValueOnce({
      valid: false,
      errors: ["Password must be at least 8 characters long."],
    });

    const req = {
      body: { name: "Test User", email: "test@example.com", password: "weak" },
    };
    const res = makeRes();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "Password must be at least 8 characters long.",
      })
    );
    // User should never be created when validation fails
    expect(User.create).not.toHaveBeenCalled();
  });

  it("returns 400 when the email address is already registered", async () => {
    validatePassword.mockReturnValueOnce({ valid: true, errors: [] });
    User.findOne.mockResolvedValueOnce({ _id: "existing-id", email: "test@example.com" });

    const req = {
      body: { name: "Test User", email: "test@example.com", password: "StrongPass1!" },
    };
    const res = makeRes();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: expect.stringContaining("already exists"),
      })
    );
    expect(User.create).not.toHaveBeenCalled();
  });

  it("creates the user, hashes the refresh token, and returns 201 with tokens", async () => {
    validatePassword.mockReturnValueOnce({ valid: true, errors: [] });
    User.findOne.mockResolvedValueOnce(null); // email not taken

    const mockUser = {
      _id: "new-user-id",
      name: "Test User",
      email: "test@example.com",
      profileImageUrl: "https://example.com/avatar.png",
      refreshTokenHash: null,
      refreshTokenExpiresAt: null,
      save: vi.fn().mockResolvedValue(undefined),
    };
    User.create.mockResolvedValueOnce(mockUser);

    const req = {
      body: {
        name: "Test User",
        email: "test@example.com",
        password: "StrongPass1!",
        profileImageUrl: "https://example.com/avatar.png",
      },
    };
    const res = makeRes();

    await registerUser(req, res);

    // Password must be hashed before storing
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalled();

    // User document must be persisted after setting the refresh token hash
    expect(mockUser.save).toHaveBeenCalledOnce();

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        _id: "new-user-id",
        email: "test@example.com",
      })
    );
  });

  it("returns 500 when an unexpected database error occurs", async () => {
    validatePassword.mockReturnValueOnce({ valid: true, errors: [] });
    User.findOne.mockRejectedValueOnce(new Error("DB connection lost"));

    const req = {
      body: { name: "Test", email: "test@example.com", password: "StrongPass1!" },
    };
    const res = makeRes();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// loginUser
// ─────────────────────────────────────────────────────────────────────────────

describe("loginUser", () => {
  it("returns 401 when no account exists for the given email", async () => {
    User.findOne.mockResolvedValueOnce(null);

    const req = { body: { email: "nobody@example.com", password: "any" } };
    const res = makeRes();

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });

  it("returns 401 when the password does not match the stored hash", async () => {
    User.findOne.mockResolvedValueOnce({
      _id: "user-id",
      password: "hashed_existing_password",
      isEmailVerified: true,
    });
    bcrypt.compare.mockResolvedValueOnce(false);

    const req = { body: { email: "test@example.com", password: "WrongPassword1!" } };
    const res = makeRes();

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });

  it("returns 403 when the account email has not been verified", async () => {
    User.findOne.mockResolvedValueOnce({
      _id: "user-id",
      password: "hashed_password",
      isEmailVerified: false,
    });
    bcrypt.compare.mockResolvedValueOnce(true);

    const req = { body: { email: "test@example.com", password: "StrongPass1!" } };
    const res = makeRes();

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });

  it("stores a hashed refresh token and returns 200 with tokens on valid credentials", async () => {
    const mockUser = {
      _id: "user-id",
      name: "Test User",
      email: "test@example.com",
      password: "hashed_password",
      profileImageUrl: null,
      isEmailVerified: true,
      refreshTokenHash: null,
      refreshTokenExpiresAt: null,
      save: vi.fn().mockResolvedValue(undefined),
    };

    User.findOne.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(true); // password matches

    const req = { body: { email: "test@example.com", password: "StrongPass1!" } };
    const res = makeRes();

    await loginUser(req, res);

    // Refresh token must be hashed before saving (not stored in plaintext)
    expect(bcrypt.hash).toHaveBeenCalled();
    expect(mockUser.save).toHaveBeenCalledOnce();

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      })
    );
  });

  it("returns 500 when an unexpected error occurs during login", async () => {
    User.findOne.mockRejectedValueOnce(new Error("DB timeout"));

    const req = { body: { email: "test@example.com", password: "any" } };
    const res = makeRes();

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
});

