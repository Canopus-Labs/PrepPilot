import { describe, it, expect, beforeAll } from "vitest";
import express from "express";
import request from "supertest";

// ---------------------------------------------------------------------------
// Integration-style unit tests for the CORS middleware in server.js
//
// We extract just the CORS middleware logic under test by replicating the same
// block in an isolated Express app — this lets us test the middleware behaviour
// without starting a real server or connecting to MongoDB.
// ---------------------------------------------------------------------------

function buildApp(allowedOrigins = new Set(["https://allowed.example.com"])) {
  const app = express();

  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const renderPattern =
      /^https:\/\/(?:interview-prep(?:aration)?-ai|preppilot-backend)-[a-z0-9-]+\.onrender\.com$/;
    const localhostPattern =
      /^http:\/\/(localhost|127\.0\.0\.1):(5\d{3}|3\d{3})$/;

    if (
      origin &&
      (allowedOrigins.has(origin) ||
        renderPattern.test(origin) ||
        localhostPattern.test(origin))
    ) {
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Vary", "Origin");
      res.header("Access-Control-Allow-Credentials", "true");
    } else if (origin) {
      if (req.method === "OPTIONS") {
        return res.sendStatus(403);
      }
    }

    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      return res.sendStatus(200);
    }
    next();
  });

  // Sentinel route to confirm non-OPTIONS requests reach handlers
  app.get("/api/test", (_req, res) => res.json({ ok: true }));
  app.post("/api/test", (_req, res) => res.json({ ok: true }));

  return app;
}

let app;
beforeAll(() => { app = buildApp(); });

// ---------------------------------------------------------------------------
// Approved origin — OPTIONS preflight
// ---------------------------------------------------------------------------
describe("CORS preflight — approved origin", () => {
  it("returns 200 for an OPTIONS from an approved origin", async () => {
    const res = await request(app)
      .options("/api/test")
      .set("Origin", "https://allowed.example.com")
      .set("Access-Control-Request-Method", "POST");

    expect(res.status).toBe(200);
  });

  it("sets Access-Control-Allow-Origin for an approved origin", async () => {
    const res = await request(app)
      .options("/api/test")
      .set("Origin", "https://allowed.example.com")
      .set("Access-Control-Request-Method", "POST");

    expect(res.headers["access-control-allow-origin"]).toBe("https://allowed.example.com");
  });

  it("sets Access-Control-Allow-Methods for an approved origin", async () => {
    const res = await request(app)
      .options("/api/test")
      .set("Origin", "https://allowed.example.com")
      .set("Access-Control-Request-Method", "POST");

    expect(res.headers["access-control-allow-methods"]).toBeTruthy();
  });

  it("sets Access-Control-Allow-Headers for an approved origin", async () => {
    const res = await request(app)
      .options("/api/test")
      .set("Origin", "https://allowed.example.com")
      .set("Access-Control-Request-Method", "POST");

    expect(res.headers["access-control-allow-headers"]).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// Approved origin — Render dynamic subdomain pattern
// ---------------------------------------------------------------------------
describe("CORS preflight — approved Render subdomain", () => {
  it("returns 200 for a Render preview subdomain", async () => {
    const res = await request(app)
      .options("/api/test")
      .set("Origin", "https://preppilot-backend-abc123.onrender.com")
      .set("Access-Control-Request-Method", "GET");

    expect(res.status).toBe(200);
    expect(res.headers["access-control-allow-origin"]).toBe(
      "https://preppilot-backend-abc123.onrender.com"
    );
  });
});

// ---------------------------------------------------------------------------
// Approved origin — localhost dev pattern
// ---------------------------------------------------------------------------
describe("CORS preflight — localhost dev origins", () => {
  it("returns 200 for localhost:5173", async () => {
    const res = await request(app)
      .options("/api/test")
      .set("Origin", "http://localhost:5173")
      .set("Access-Control-Request-Method", "GET");

    expect(res.status).toBe(200);
    expect(res.headers["access-control-allow-origin"]).toBe("http://localhost:5173");
  });
});

// ---------------------------------------------------------------------------
// Disallowed origin — OPTIONS preflight (the bug fix regression guard)
// ---------------------------------------------------------------------------
describe("CORS preflight — disallowed origin", () => {
  it("returns 403 for an OPTIONS from a disallowed origin", async () => {
    const res = await request(app)
      .options("/api/test")
      .set("Origin", "https://attacker.example.com")
      .set("Access-Control-Request-Method", "POST");

    expect(res.status).toBe(403);
  });

  it("does NOT set Access-Control-Allow-Origin for a disallowed origin", async () => {
    const res = await request(app)
      .options("/api/test")
      .set("Origin", "https://attacker.example.com")
      .set("Access-Control-Request-Method", "POST");

    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });

  it("does NOT set Access-Control-Allow-Methods for a disallowed origin", async () => {
    const res = await request(app)
      .options("/api/test")
      .set("Origin", "https://attacker.example.com")
      .set("Access-Control-Request-Method", "POST");

    expect(res.headers["access-control-allow-methods"]).toBeUndefined();
  });

  it("does NOT set Access-Control-Allow-Headers for a disallowed origin", async () => {
    const res = await request(app)
      .options("/api/test")
      .set("Origin", "https://attacker.example.com")
      .set("Access-Control-Request-Method", "POST");

    expect(res.headers["access-control-allow-headers"]).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Non-OPTIONS requests from disallowed origins reach route handlers
// (CORS is browser-enforcement-only; server must not block simple requests)
// ---------------------------------------------------------------------------
describe("Non-OPTIONS from disallowed origin — reaches handler", () => {
  it("GET from a disallowed origin still returns 200 from the route", async () => {
    const res = await request(app)
      .get("/api/test")
      .set("Origin", "https://attacker.example.com");

    // Route handler is reached; browser would block the response, not the server
    expect(res.status).toBe(200);
    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });

  it("POST from a disallowed origin still reaches the route handler", async () => {
    const res = await request(app)
      .post("/api/test")
      .set("Origin", "https://attacker.example.com");

    expect(res.status).toBe(200);
    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// No Origin header (same-origin / server-to-server) — passes through
// ---------------------------------------------------------------------------
describe("Requests with no Origin header", () => {
  it("OPTIONS with no Origin returns 200 (same-origin preflight)", async () => {
    const res = await request(app).options("/api/test");
    expect(res.status).toBe(200);
  });

  it("GET with no Origin reaches the handler", async () => {
    const res = await request(app).get("/api/test");
    expect(res.status).toBe(200);
  });
});