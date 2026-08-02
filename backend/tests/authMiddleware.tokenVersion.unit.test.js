import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { protect } from "../middlewares/authMiddleware.js"; // compiles the User model once

const User = mongoose.model("User"); // same instance the middleware uses
const SECRET = "test-secret";
const realFindById = User.findById;

beforeEach(() => {
  process.env.JWT_SECRET = SECRET;
});

afterEach(() => {
  User.findById = realFindById; // restore the shared model instance
});

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

// Patch the shared User model so findById(...).select("-password") resolves to `user`.
function stubUser(user) {
  User.findById = vi.fn().mockReturnValue({ select: vi.fn().mockResolvedValue(user) });
}

function bearer(payload) {
  return { headers: { authorization: `Bearer ${jwt.sign(payload, SECRET)}` } };
}

describe("protect — access-token version check", () => {
  it("allows a token whose version matches the user", async () => {
    stubUser({ _id: "u1", tokenVersion: 3 });
    const req = bearer({ id: "u1", tokenType: "access", tokenVersion: 3 });
    const res = makeRes();
    const next = vi.fn();

    await protect(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
    expect(req.user.tokenVersion).toBe(3);
  });

  it("rejects a token issued before a logout / password change (stale version)", async () => {
    stubUser({ _id: "u1", tokenVersion: 4 }); // user bumped after this token was issued
    const req = bearer({ id: "u1", tokenType: "access", tokenVersion: 3 });
    const res = makeRes();
    const next = vi.fn();

    await protect(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("treats a legacy token with no version as version 0", async () => {
    stubUser({ _id: "u1", tokenVersion: 1 }); // any bump invalidates legacy tokens
    const req = bearer({ id: "u1", tokenType: "access" }); // no tokenVersion field
    const res = makeRes();
    const next = vi.fn();

    await protect(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });
});
