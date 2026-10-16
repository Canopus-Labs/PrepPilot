import fs from "fs";
import path from "path";
import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import { generalLimiter } from "../middlewares/rateLimiter.js";

// ---------------------------------------------------------------------------
// Issue #2342: Security bypass via duplicate routes and missing Rate Limiters in server.js
// 1. All route definitions must be declared before app.listen().
// 2. Sensitive and public endpoints (/api/google-calendar, /api/roadmaps) must enforce generalLimiter.
// 3. No duplicate route registrations (e.g. /api/books, /api/jobs, /api/google-calendar, /api/courses) after listen.
// ---------------------------------------------------------------------------

describe("server.js route registration and rate-limiting configuration (#2342)", () => {
  const serverJsPath = path.resolve(__dirname, "../server.js");
  const serverJsContent = fs.readFileSync(serverJsPath, "utf8");

  it("registers all API routes prior to app.listen()", () => {
    const listenIndex = serverJsContent.indexOf("app.listen(");
    expect(listenIndex).toBeGreaterThan(0);

    const afterListen = serverJsContent.slice(listenIndex);
    // Ensure no app.use("/api/...") calls exist after app.listen()
    const apiRouteMatchAfterListen = afterListen.match(/app\.use\(\s*["']\/api\/[a-zA-Z0-9_-]+["']/g);
    expect(apiRouteMatchAfterListen).toBeNull();
  });

  it("applies generalLimiter to /api/roadmaps", () => {
    const roadmapRouteRegex = /app\.use\(\s*["']\/api\/roadmaps["']\s*,\s*generalLimiter\s*,\s*roadmapRoutes\s*\)/;
    expect(serverJsContent).toMatch(roadmapRouteRegex);
  });

  it("applies generalLimiter to /api/google-calendar in the main routes block", () => {
    const googleCalendarRouteRegex = /app\.use\(\s*["']\/api\/google-calendar["']\s*,\s*generalLimiter\s*,\s*googleCalendarRoutes\s*\)/;
    expect(serverJsContent).toMatch(googleCalendarRouteRegex);
  });

  it("contains no duplicate registrations for books, jobs, courses, and google-calendar", () => {
    const countOccurrences = (pattern) => {
      const matches = serverJsContent.match(pattern);
      return matches ? matches.length : 0;
    };

    expect(countOccurrences(/app\.use\(\s*["']\/api\/books["']/g)).toBe(1);
    expect(countOccurrences(/app\.use\(\s*["']\/api\/jobs["']/g)).toBe(1);
    expect(countOccurrences(/app\.use\(\s*["']\/api\/courses["']/g)).toBe(1);
    expect(countOccurrences(/app\.use\(\s*["']\/api\/google-calendar["']/g)).toBe(1);
    expect(countOccurrences(/app\.use\(\s*["']\/api\/roadmaps["']/g)).toBe(1);
  });

  it("enforces 429 Too Many Requests when generalLimiter threshold is exceeded", async () => {
    const testApp = express();
    testApp.use("/api/test-general-limit", generalLimiter, (req, res) => {
      res.status(200).json({ ok: true });
    });

    // Make 100 successful requests
    for (let i = 0; i < 100; i++) {
      const res = await request(testApp).get("/api/test-general-limit");
      expect(res.status).toBe(200);
    }

    // 101st request should be rejected by generalLimiter (max: 100)
    const blockedRes = await request(testApp).get("/api/test-general-limit");
    expect(blockedRes.status).toBe(429);
    expect(blockedRes.body.error).toContain("Too many requests");
  });
});
