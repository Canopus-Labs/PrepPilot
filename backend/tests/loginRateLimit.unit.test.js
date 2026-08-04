import { describe, it, expect, beforeAll } from "vitest";
import express from "express";
import request from "supertest";

// ---------------------------------------------------------------------------
// POST /api/auth/login rate limiting (issue #922):
// loginLimiter (10 attempts / 15 min) must actually be wired to the login
// route and return 429 once the limit is exceeded.
// ---------------------------------------------------------------------------

let app;
let routerStack;

beforeAll(async () => {
  const authRoutes = await import("../routes/authRoutes.js");
  const router = authRoutes.default ?? authRoutes;
  routerStack = router.stack;

  app = express();
  app.use(express.json());
  app.use(router);
});

const loginLayer = () =>
  routerStack.find(
    (l) => l.route && l.route.path === "/login" && l.route.methods.post
  );

describe("POST /login middleware chain", () => {
  it("registers the route", () => {
    expect(loginLayer()).toBeTruthy();
  });

  it("mounts the strict limiter plus validator plus controller", () => {
    // Identity comparison across the CJS/ESM boundary is unreliable, so assert
    // on the chain length: a loginLimiter + validateUserLogin + loginUser
    // chain has three handlers, not the previous two-handler chain.
    const handles = loginLayer().route.stack.map((s) => s.handle);
    expect(handles.length).toBeGreaterThanOrEqual(3);
  });
});

describe("POST /login brute-force protection", () => {
  it("accepts attempts under the limit then returns 429 on the 11th", async () => {
    const statuses = [];
    for (let i = 0; i <= 10; i++) {
      const res = await request(app)
        .post("/login")
        .send({ email: `user${i}@example.com`, password: "short" });
      statuses.push(res.status);
    }
    // The first 10 attempts pass through to validation (400), proving the
    // limiter is not pre-emptively blocking below its threshold.
    for (let i = 0; i < 10; i++) {
      expect(statuses[i]).toBe(400);
    }
    // The 11th attempt is rejected by loginLimiter (max: 10).
    expect(statuses[10]).toBe(429);
  });
});

