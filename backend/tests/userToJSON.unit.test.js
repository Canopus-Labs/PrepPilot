import { describe, it, expect, beforeAll } from "vitest";

// ---------------------------------------------------------------------------
// GET /api/auth/profile secret redaction (issue #923): the User schema's
// toJSON transform must never serialize password / refresh-token / email
// verification secrets, which were previously leaked by res.json(user).
// ---------------------------------------------------------------------------

let User;

beforeAll(async () => {
  const mod = await import("../models/User.js");
  User = mod.default ?? mod;
});

const buildUser = () =>
  new User({
    name: "Test User",
    email: "test@example.com",
    password: "hashed-super-secret",
    profileImageUrl: "https://example.com/avatar.png",
    refreshTokenHash: "refresh-hash",
    refreshTokenExpiresAt: new Date(),
    tokenVersion: 3,
    firstName: "Test",
    lastName: "User",
    bio: "hello",
    visibility: "Public",
    prepPilotId: "testpilot123",
    emailVerificationToken: "verification-token",
    emailVerificationExpires: new Date(),
    isEmailVerified: true,
  });

describe("User toJSON transform", () => {
  it("drops every secret field from toJSON()", () => {
    const json = buildUser().toJSON();

    expect(json.password).toBeUndefined();
    expect(json.refreshTokenHash).toBeUndefined();
    expect(json.refreshTokenExpiresAt).toBeUndefined();
    expect(json.emailVerificationToken).toBeUndefined();
    expect(json.emailVerificationExpires).toBeUndefined();
    expect(json.tokenVersion).toBeUndefined();
  });

  it("keeps the public profile fields", () => {
    const json = buildUser().toJSON();

    expect(json.name).toBe("Test User");
    expect(json.email).toBe("test@example.com");
    expect(json.profileImageUrl).toBe("https://example.com/avatar.png");
    expect(json.firstName).toBe("Test");
    expect(json.bio).toBe("hello");
    expect(json.visibility).toBe("Public");
    expect(json.prepPilotId).toBe("testpilot123");
  });

  it("JSON.stringify (the res.json path) also strips secrets", () => {
    const str = JSON.stringify(buildUser());
    expect(str).not.toContain("refreshTokenHash");
    expect(str).not.toContain("emailVerificationToken");
    expect(str).not.toContain("hashed-super-secret");
  });
});
