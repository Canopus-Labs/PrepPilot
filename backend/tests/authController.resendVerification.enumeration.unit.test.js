import { describe, it, expect, beforeEach, vi } from "vitest";
import express from "express";
import request from "supertest";

// Auto-mock the User model (same pattern as the repo's
// interviewExperienceController test: auto-mock + overwrite findOne). The email
// subsystem is stubbed by patching nodemailer.createTransport BEFORE the
// controller loads, so sendEmail.js captures a fake transporter whose sendMail
// is a spy — no real SMTP connection is attempted.
vi.mock("../models/User.js");

const nodemailer = require("nodemailer");
const sendMail = vi.fn().mockResolvedValue({});
nodemailer.createTransport = () => ({ sendMail });

const User = require("../models/User.js");
const { resendVerificationEmail } = require("../controllers/authController.js");

function buildApp() {
  const app = express();
  app.use(express.json());
  app.post("/api/auth/resend-verification", resendVerificationEmail);
  return app;
}

function fakeUser({ isEmailVerified = false } = {}) {
  return {
    email: "victim@example.com",
    isEmailVerified,
    save: vi.fn().mockResolvedValue(),
    emailVerificationToken: "old",
    emailVerificationExpires: new Date(),
  };
}

const GENERIC_MESSAGE =
  "If this email is registered and unverified, a verification link has been sent.";

beforeEach(() => {
  vi.clearAllMocks();
  User.findOne = vi.fn();
  sendMail.mockResolvedValue({});
});

describe("resend-verification — email enumeration prevention (#1414)", () => {
  it("returns 200 with the generic message when the email is not registered", async () => {
    User.findOne.mockResolvedValue(null);
    const res = await request(buildApp())
      .post("/api/auth/resend-verification")
      .send({ email: "nobody@example.com" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, message: GENERIC_MESSAGE });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("returns the SAME 200 generic message when the email is already verified", async () => {
    User.findOne.mockResolvedValue(fakeUser({ isEmailVerified: true }));
    const res = await request(buildApp())
      .post("/api/auth/resend-verification")
      .send({ email: "victim@example.com" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, message: GENERIC_MESSAGE });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("returns the SAME generic message for an unverified user but actually sends the email", async () => {
    const user = fakeUser({ isEmailVerified: false });
    User.findOne.mockResolvedValue(user);
    const res = await request(buildApp())
      .post("/api/auth/resend-verification")
      .send({ email: "Victim@Example.com" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe(GENERIC_MESSAGE);
    // A fresh token must be issued and the verification email actually sent.
    expect(user.save).toHaveBeenCalled();
    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it("produces indistinguishable responses for not-found vs already-verified", async () => {
    User.findOne.mockResolvedValue(null);
    const r1 = await request(buildApp())
      .post("/api/auth/resend-verification")
      .send({ email: "a@example.com" });

    User.findOne.mockResolvedValue(fakeUser({ isEmailVerified: true }));
    const r2 = await request(buildApp())
      .post("/api/auth/resend-verification")
      .send({ email: "b@example.com" });

    // An attacker must not be able to tell these two states apart.
    expect(r1.status).toBe(r2.status);
    expect(JSON.stringify(r1.body)).toBe(JSON.stringify(r2.body));
  });

  it("still rejects an empty email with 400", async () => {
    const res = await request(buildApp())
      .post("/api/auth/resend-verification")
      .send({ email: "" });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
