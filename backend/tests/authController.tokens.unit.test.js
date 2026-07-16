import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../models/User.js", () => ({
  findById: vi.fn(),
  findOne: vi.fn(),
  create: vi.fn(),
}));

vi.mock("bcryptjs", () => ({
  compare: vi.fn(),
  genSalt: vi.fn().mockResolvedValue("salt"),
  hash: vi.fn().mockResolvedValue("hashed"),
}));

const mockJwt = {
  sign: vi.fn(),
  verify: vi.fn(),
};

vi.mock("jsonwebtoken", () => mockJwt);

let refreshToken;
let logoutUser;
let User;
let bcrypt;
let jwt;

beforeEach(async () => {
  vi.resetModules();
  vi.clearAllMocks();

  process.env.JWT_SECRET = "test-secret";

  const ctrl = await import("../controllers/authController.js");
  refreshToken = ctrl.refreshToken ?? ctrl.default?.refreshToken;
  logoutUser = ctrl.logoutUser ?? ctrl.default?.logoutUser;

  const UserModule = await import("../models/User.js");
  User = UserModule.default ?? UserModule;

  const bcryptModule = await import("bcryptjs");
  bcrypt = bcryptModule.default ?? bcryptModule;

  const jwtModule = await import("jsonwebtoken");
  jwt = jwtModule.default ?? jwtModule;
});

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("authController refresh-token rotation", () => {
  it("rotates the refresh token and returns a new access token", async () => {
    const mockUser = {
      _id: "user-123",
      refreshTokenHash: "stored-hash",
      save: vi.fn().mockResolvedValue(true),
    };

    User.findById.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.verify.mockReturnValue({ id: "user-123" });
    jwt.sign
      .mockReturnValueOnce("new-access-token")
      .mockReturnValueOnce("new-refresh-token");

    const req = { body: { refreshToken: "incoming-refresh-token" } };
    const res = makeRes();

    await refreshToken(req, res);

    expect(jwt.verify).toHaveBeenCalledWith("incoming-refresh-token", "test-secret");
    expect(bcrypt.compare).toHaveBeenCalledWith("incoming-refresh-token", "stored-hash");
    expect(mockUser.refreshTokenHash).toBe("hashed");
    expect(mockUser.save).toHaveBeenCalledOnce();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        accessToken: "new-access-token",
        refreshToken: "new-refresh-token",
      })
    );
  });

  it("revokes the stored refresh token on logout", async () => {
    const mockUser = {
      _id: "user-123",
      refreshTokenHash: "stored-hash",
      save: vi.fn().mockResolvedValue(true),
    };

    User.findById.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.verify.mockReturnValue({ id: "user-123" });

    const req = { body: { refreshToken: "logout-token" } };
    const res = makeRes();

    await logoutUser(req, res);

    expect(jwt.verify).toHaveBeenCalledWith("logout-token", "test-secret");
    expect(bcrypt.compare).toHaveBeenCalledWith("logout-token", "stored-hash");
    expect(mockUser.refreshTokenHash).toBeNull();
    expect(mockUser.save).toHaveBeenCalledOnce();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, message: expect.stringContaining("logged out") })
    );
  });
});
