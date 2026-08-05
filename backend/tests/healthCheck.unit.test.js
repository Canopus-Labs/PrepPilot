import express from "express";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  buildHealthPayload,
  formatBytes,
  formatUptime,
  getDbState,
} from "../utils/healthCheck.js";
import healthRoutes from "../routes/healthRoutes.js";

function buildApp() {
  const app = express();
  app.use("/api/health", healthRoutes);
  return app;
}

describe("healthCheck utils", () => {
  it("formats byte counts with human units", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(1023)).toBe("1023 B");
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(5 * 1024 * 1024)).toBe("5 MB");
    expect(formatBytes(1.5 * 1024 * 1024 * 1024)).toBe("1.5 GB");
    expect(formatBytes(-4)).toBe("0 B");
    expect(formatBytes(Number.NaN)).toBe("0 B");
  });

  it("formats uptime into compact human segments", () => {
    expect(formatUptime(45)).toBe("45s");
    expect(formatUptime(125)).toBe("2m 5s");
    expect(formatUptime(3661)).toBe("1h 1m 1s");
    expect(formatUptime(90061)).toBe("1d 1h 1m 1s");
    expect(formatUptime(-10)).toBe("0s");
  });

  it("maps mongoose readyState to a readable status", () => {
    expect(getDbState({ readyState: 1 })).toEqual({
      state: 1,
      status: "connected",
      ok: true,
    });
    expect(getDbState({ readyState: 0 })).toEqual({
      state: 0,
      status: "disconnected",
      ok: false,
    });
    expect(getDbState(null)).toEqual({
      state: 99,
      status: "uninitialized",
      ok: false,
    });
  });

  it("builds a health payload with ok=false when the DB is not connected", () => {
    const payload = buildHealthPayload({ readyState: 0 });
    expect(payload.ok).toBe(false);
    expect(payload.status).toBe("degraded");
    expect(payload.database.status).toBe("disconnected");
    expect(typeof payload.uptimeSeconds).toBe("number");
    expect(typeof payload.timestamp).toBe("string");
    expect(payload.memory).toHaveProperty("heapUsed");
    expect(payload.runtime.node).toMatch(/^v/);
  });

  it("builds a health payload with ok=true when the DB is connected", () => {
    const payload = buildHealthPayload({ readyState: 1, host: "mongodb-test" });
    expect(payload.ok).toBe(true);
    expect(payload.status).toBe("ok");
    expect(payload.database.host).toBe("mongodb-test");
  });
});

describe("health routes", () => {
  let server;
  let baseUrl;

  beforeAll(async () => {
    const app = buildApp();
    server = app.listen(0);
    await new Promise((resolve) => server.once("listening", resolve));
    const { port } = server.address();
    baseUrl = `http://127.0.0.1:${port}`;
  });

  afterAll(async () => {
    if (!server) return;
    await new Promise((resolve) => server.close(resolve));
  });

  it("GET /api/health returns a full health payload with 200", async () => {
    const response = await fetch(`${baseUrl}/api/health`);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("status");
    expect(body).toHaveProperty("uptimeSeconds");
    expect(body).toHaveProperty("memory");
    expect(body).toHaveProperty("database");
    expect(body.database).toHaveProperty("state");
  });

  it("GET /api/health/live returns 200 while the process runs", async () => {
    const response = await fetch(`${baseUrl}/api/health/live`);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.status).toBe("ok");
    expect(typeof body.uptimeSeconds).toBe("number");
  });

  it("GET /api/health/ready returns 503 when the DB is not connected", async () => {
    const response = await fetch(`${baseUrl}/api/health/ready`);
    expect(response.status).toBe(503);
    const body = await response.json();
    expect(body.status).toBe("unavailable");
    expect(body.database.connected).toBe(false);
  });
});
