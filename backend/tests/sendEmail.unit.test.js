import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";

// ---------------------------------------------------------------------------
// SMTP TLS verification (issue #928):
// the custom SMTP transporter must not disable certificate verification
// (rejectUnauthorized: false removed).
// ---------------------------------------------------------------------------

let createTransporter;

beforeAll(async () => {
  const mod = await import("../utils/sendEmail.js");
  createTransporter = mod.createTransporter;
});

afterAll(() => {
  vi.unstubAllEnvs();
});

const customSmtpEnv = () => {
  vi.stubEnv("EMAIL_SERVICE", "smtp");
  vi.stubEnv("EMAIL_HOST", "smtp.example.com");
  vi.stubEnv("EMAIL_PORT", "587");
  vi.stubEnv("EMAIL_SECURE", "false");
  vi.stubEnv("EMAIL_USER", "user@example.com");
  vi.stubEnv("EMAIL_PASS", "pass");
};

describe("createTransporter — custom SMTP", () => {
  it("does not disable TLS certificate verification", () => {
    customSmtpEnv();
    const transporter = createTransporter();
    // rejectUnauthorized must be undefined (nodemailer default = verify) or
    // explicitly true — never false.
    expect(transporter.options.tls?.rejectUnauthorized).not.toBe(false);
  });
});
