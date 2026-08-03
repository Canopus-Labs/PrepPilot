import { describe, it, expect, beforeAll, beforeEach, afterAll, vi } from "vitest";

// ---------------------------------------------------------------------------
// validateEnv placeholder rejection (issue #927):
// the documented .env.example JWT_SECRET placeholder must fail validation
// instead of being accepted as a usable secret.
// ---------------------------------------------------------------------------

let checkEnv;

beforeAll(async () => {
  const mod = await import("../config/validateEnv.js");
  checkEnv = mod.checkEnv;
});

beforeEach(() => {
  vi.stubEnv("MONGO_URI", "mongodb://localhost:27017/interview_prep_ai");
  vi.stubEnv("JWT_SECRET", "a_real_random_secret_value_32_chars_minimum_xyz");
  vi.stubEnv("GEMINI_API_KEY", "AIzaSy-real-key");
});

afterAll(() => {
  vi.unstubAllEnvs();
});

const report = () => checkEnv();

describe("checkEnv — placeholder rejection", () => {
  it("rejects the documented .env.example JWT_SECRET placeholder", () => {
    vi.stubEnv("JWT_SECRET", "your_jwt_secret_key_here_change_me");
    const r = report();
    expect(r.valid).toBe(false);
    expect(r.placeholders).toContain("JWT_SECRET");
  });

  it("rejects the documented GEMINI_API_KEY placeholder", () => {
    vi.stubEnv("GEMINI_API_KEY", "your_gemini_api_key_here");
    const r = report();
    expect(r.valid).toBe(false);
    expect(r.placeholders).toContain("GEMINI_API_KEY");
  });

  it("rejects a plain 'secret' value", () => {
    vi.stubEnv("JWT_SECRET", "secret");
    const r = report();
    expect(r.placeholders).toContain("JWT_SECRET");
  });

  it("is case/whitespace-insensitive when detecting placeholders", () => {
    vi.stubEnv("JWT_SECRET", "  YOUR_JWT_SECRET_KEY_HERE_CHANGE_ME  ");
    const r = report();
    expect(r.placeholders).toContain("JWT_SECRET");
  });
});

describe("checkEnv — happy path and missing vars", () => {
  it("is valid when all required vars are real", () => {
    expect(report().valid).toBe(true);
  });

  it("reports missing vars", () => {
    vi.stubEnv("JWT_SECRET", "");
    const r = report();
    expect(r.valid).toBe(false);
    expect(r.missing).toContain("JWT_SECRET");
    expect(r.placeholders).not.toContain("JWT_SECRET");
  });
});
