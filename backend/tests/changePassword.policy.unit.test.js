import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Unit tests for changePassword — password policy enforcement
//
// Strategy: mock User and bcrypt so the handler runs in-process without a
// real DB or hashing cost. The validatePassword utility is NOT mocked —
// we want to assert that the real policy logic is exercised.
// ---------------------------------------------------------------------------

vi.mock("../models/User.js", () => ({ findById: vi.fn() }));
vi.mock("bcryptjs", () => ({
  compare: vi.fn(),
  genSalt: vi.fn().mockResolvedValue("salt"),
  hash: vi.fn().mockResolvedValue("hashed"),
}));

let changePassword;
let User;
let bcrypt;

beforeEach(async () => {
  vi.resetModules();
  vi.clearAllMocks();

  // Re-import after reset so mocks are fresh
  const ctrl = await import("../controllers/authController.js");
  changePassword = ctrl.changePassword ?? ctrl.default?.changePassword;

  const UserModule = await import("../models/User.js");
  User = UserModule.default ?? UserModule;

  const bcryptModule = await import("bcryptjs");
  bcrypt = bcryptModule.default ?? bcryptModule;
});

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------
function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

function makeReq(originalPassword, newPassword) {
  return {
    user: { _id: "user-abc" },
    body: { originalPassword, newPassword },
  };
}

// ---------------------------------------------------------------------------
// 400 — weak newPassword is now rejected (regression guard for the bug)
// ---------------------------------------------------------------------------
describe("changePassword — policy enforcement on newPassword", () => {
  it("returns 400 for a single-character newPassword", async () => {
    const req = makeReq("P@ssw0rd1", "a");
    const res = makeRes();

    await changePassword(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    // DB must never be reached
    expect(User.findById).not.toHaveBeenCalled();
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  it("returns 400 for a password missing an uppercase letter", async () => {
    const req = makeReq("P@ssw0rd1", "p@ssw0rd1");
    const res = makeRes();
    await changePassword(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: expect.stringMatching(/uppercase/i) })
    );
  });

  it("returns 400 for a password missing a digit", async () => {
    const req = makeReq("P@ssw0rd1", "P@ssword");
    const res = makeRes();
    await changePassword(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: expect.stringMatching(/number/i) })
    );
  });

  it("returns 400 for a password missing a special character", async () => {
    const req = makeReq("P@ssw0rd1", "Passw0rd");
    const res = makeRes();
    await changePassword(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: expect.stringMatching(/special character/i) })
    );
  });

  it("returns 400 for a password shorter than 8 characters", async () => {
    const req = makeReq("P@ssw0rd1", "P@1a");
    const res = makeRes();
    await changePassword(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: expect.stringMatching(/8 characters/i) })
    );
  });
});

// ---------------------------------------------------------------------------
// 200 — compliant newPassword proceeds through to save (happy path)
// ---------------------------------------------------------------------------
describe("changePassword — compliant newPassword succeeds", () => {
  it("returns 200 when newPassword satisfies the full policy", async () => {
    const mockUser = {
      password: "old-hash",
      save: vi.fn().mockResolvedValue(true),
    };

    User.findById.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    const req = makeReq("P@ssw0rd1", "N3wP@ssword!");
    const res = makeRes();

    await changePassword(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith("N3wP@ssword!", "salt");
    expect(mockUser.save).toHaveBeenCalledOnce();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, message: "Password updated successfully" })
    );
  });
});

// ---------------------------------------------------------------------------
// Pre-existing guards — regression: these must still work after the fix
// ---------------------------------------------------------------------------
describe("changePassword — pre-existing guards (regression)", () => {
  it("returns 400 when originalPassword is missing", async () => {
    const req = makeReq("", "N3wP@ssword!");
    const res = makeRes();
    await changePassword(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(User.findById).not.toHaveBeenCalled();
  });

  it("returns 400 when originalPassword is incorrect", async () => {
    User.findById.mockResolvedValue({ password: "hash" });
    bcrypt.compare.mockResolvedValue(false);

    const req = makeReq("WrongP@ss1", "N3wP@ssword!");
    const res = makeRes();
    await changePassword(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Incorrect original password" })
    );
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  it("returns 404 when user is not found", async () => {
    User.findById.mockResolvedValue(null);

    const req = makeReq("P@ssw0rd1", "N3wP@ssword!");
    const res = makeRes();
    await changePassword(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});