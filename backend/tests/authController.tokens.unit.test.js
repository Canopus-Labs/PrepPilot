import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const { refreshToken, logoutUser } = require("../controllers/authController.js");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let originalUserFindById;
let originalBcryptCompare;
let originalBcryptHash;
let originalJwtVerify;
let originalJwtSign;

beforeEach(() => {
  originalUserFindById = User.findById;
  originalBcryptCompare = bcrypt.compare;
  originalBcryptHash = bcrypt.hash;
  originalJwtVerify = jwt.verify;
  originalJwtSign = jwt.sign;

  User.findById = vi.fn();
  bcrypt.compare = vi.fn();
  bcrypt.hash = vi.fn().mockResolvedValue("hashed");
  jwt.verify = vi.fn();
  jwt.sign = vi.fn();

  process.env.JWT_SECRET = "test-secret";
});

afterEach(() => {

  User.findById = originalUserFindById;
  bcrypt.compare = originalBcryptCompare;
  bcrypt.hash = originalBcryptHash;
  jwt.verify = originalJwtVerify;
  jwt.sign = originalJwtSign;
});

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.cookie = vi.fn().mockReturnValue(res);
  res.clearCookie = vi.fn().mockReturnValue(res);
  return res;
}


function makeReq(refreshTokenCookieValue) {
  return { cookies: { refreshToken: refreshTokenCookieValue }, body: {} };
}

describe("authController refresh-token rotation", () => {
  it("rotates the refresh token and returns a new access token", async () => {
    const mockUser = {
      _id: "user-123",
      refreshTokenHash: "stored-hash",
      refreshTokenExpiresAt: new Date(Date.now() + 60_000),
      save: vi.fn().mockResolvedValue(true),
    };

    User.findById.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.verify.mockReturnValue({ id: "user-123", tokenType: "refresh" });
    jwt.sign
      .mockReturnValueOnce("new-access-token")
      .mockReturnValueOnce("new-refresh-token");

    const req = makeReq("incoming-refresh-token");
    const res = makeRes();

    await refreshToken(req, res);

    expect(jwt.verify).toHaveBeenCalledWith("incoming-refresh-token", "test-secret");
    expect(bcrypt.compare).toHaveBeenCalledWith("incoming-refresh-token", "stored-hash");
    expect(mockUser.refreshTokenHash).toBe("hashed");
    expect(mockUser.save).toHaveBeenCalledOnce();
    expect(res.cookie).toHaveBeenCalledWith(
      "refreshToken",
      "new-refresh-token",
      expect.objectContaining({ httpOnly: true })
    );
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, accessToken: "new-access-token" })
    );
  });

  it("rejects refresh when no refreshToken cookie is present", async () => {
    const req = makeReq(undefined);
    const res = makeRes();

    await refreshToken(req, res);

    expect(User.findById).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
  });
});

describe("authController logout", () => {
  it("revokes the stored refresh token on logout", async () => {
    const mockUser = {
      _id: "user-123",
      refreshTokenHash: "stored-hash",
      save: vi.fn().mockResolvedValue(true),
    };

    User.findById.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.verify.mockReturnValue({ id: "user-123", tokenType: "refresh" });

    const req = makeReq("logout-token");
    const res = makeRes();

    await logoutUser(req, res);

    expect(jwt.verify).toHaveBeenCalledWith("logout-token", "test-secret");
    expect(bcrypt.compare).toHaveBeenCalledWith("logout-token", "stored-hash");
    expect(mockUser.refreshTokenHash).toBeNull();
    expect(mockUser.save).toHaveBeenCalledOnce();
    expect(res.clearCookie).toHaveBeenCalledWith("refreshToken", expect.any(Object));
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, message: expect.stringContaining("logged out") })
    );
  });

  it("rejects logout when no refreshToken cookie is present", async () => {
    const req = makeReq(undefined);
    const res = makeRes();

    await logoutUser(req, res);

    expect(User.findById).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
  });
});