import { describe, it, expect, beforeAll } from "vitest";
import express from "express";
import request from "supertest";
import { loginLimiter } from "../middlewares/rateLimiter.js";

// ---------------------------------------------------------------------------
// Rate-limit bypass fix (issue #1438): with no trusted reverse proxy
// configured, a client-supplied X-Forwarded-For header must NOT rotate the
// rate-limit bucket. req.ip stays the direct socket address, so the 11th login
// attempt is still rejected even while spoofing a different IP each request.
// ---------------------------------------------------------------------------

let app;

beforeAll(() => {
  app = express();
  app.use(express.json());
  app.post("/login", loginLimiter, (req, res) => res.status(200).json({ ok: true }));
});

describe("login limiter keyed on the trusted client IP", () => {
  it("rejects the 11th attempt even when X-Forwarded-For is rotated per request", async () => {
    const statuses = [];
    for (let i = 0; i <= 10; i++) {
      const res = await request(app)
        .post("/login")
        .set("X-Forwarded-For", `203.0.113.${i}`)
        .send({ email: `user${i}@example.com`, password: "wrong" });
      statuses.push(res.status);
    }

    // The first 10 requests pass through to the handler (200), proving the
    // spoofed header did not create a fresh bucket for each attempt.
    for (let i = 0; i < 10; i++) {
      expect(statuses[i]).toBe(200);
    }
    // The 11th attempt is rejected by loginLimiter (max: 10).
    expect(statuses[10]).toBe(429);
  });
});
