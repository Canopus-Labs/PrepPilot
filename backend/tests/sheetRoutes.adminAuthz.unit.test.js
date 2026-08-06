import { describe, it, expect, beforeAll, afterEach, vi } from "vitest";

// ---------------------------------------------------------------------------
// Issue #1446: /api/sheets write routes must be admin-only. Non-admin users
// must receive 403 on POST /upload, POST /validate, PUT /:id, and DELETE /:id,
// while the public read routes stay open.
// ---------------------------------------------------------------------------

let sheetRouter;
let requireAdmin;

beforeAll(async () => {
  const sheetRouterMod = await import("../routes/sheetJsonUpload.js");
  sheetRouter = sheetRouterMod.default ?? sheetRouterMod;

  const authMod = await import("../middlewares/authMiddleware.js");
  requireAdmin = authMod.requireAdmin;
});

afterEach(() => {
  vi.unstubAllEnvs();
});

function getLayerStack(router, method, path) {
  const layer = router.stack.find(
    (l) =>
      l.route &&
      l.route.path === path &&
      l.route.methods[method.toLowerCase()]
  );
  if (!layer) return null;
  return layer.route.stack.map((s) => s.handle);
}

const WRITE_ROUTES = [
  ["POST", "/upload"],
  ["POST", "/validate"],
  ["PUT", "/:id"],
  ["DELETE", "/:id"],
];

describe("/api/sheets write routes require admin (#1446)", () => {
  it.each(WRITE_ROUTES)("%s %s mounts protect then requireAdmin", (method, path) => {
    const stack = getLayerStack(sheetRouter, method, path);
    expect(stack).not.toBeNull();
    const protectIdx = stack.findIndex((fn) => fn && fn.name === "protect");
    const adminIdx = stack.findIndex((fn) => fn && fn.name === "requireAdmin");
    expect(protectIdx).toBeGreaterThanOrEqual(0);
    expect(adminIdx).toBe(protectIdx + 1);
  });
});

describe("public read routes remain unprotected (#1446)", () => {
  it.each([
    ["GET", "/"],
    ["GET", "/:id"],
  ])("%s %s does not mount protect or requireAdmin", (method, path) => {
    const stack = getLayerStack(sheetRouter, method, path);
    expect(stack).not.toBeNull();
    expect(stack.some((fn) => fn && fn.name === "protect")).toBe(false);
    expect(stack.some((fn) => fn && fn.name === "requireAdmin")).toBe(false);
  });
});

describe("requireAdmin middleware (#1446)", () => {
  it("returns 403 when no admin allow-list is configured", () => {
    vi.stubEnv("ADMIN_EMAILS", "");
    let statusCode = null;
    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: () => res,
    };
    requireAdmin({ user: { email: "user@example.com" } }, res, () => {});
    expect(statusCode).toBe(403);
  });

  it("returns 403 for an email not in the allow-list", () => {
    vi.stubEnv("ADMIN_EMAILS", "admin@example.com");
    let statusCode = null;
    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: () => res,
    };
    requireAdmin({ user: { email: "user@example.com" } }, res, () => {});
    expect(statusCode).toBe(403);
  });

  it("calls next() for an allow-listed email (case-insensitive)", () => {
    vi.stubEnv("ADMIN_EMAILS", "Admin@Example.com");
    let nextCalled = false;
    const res = { status: () => res, json: () => res };
    requireAdmin({ user: { email: "admin@example.com" } }, res, () => {
      nextCalled = true;
    });
    expect(nextCalled).toBe(true);
  });

  it("returns 403 when req.user is missing", () => {
    vi.stubEnv("ADMIN_EMAILS", "admin@example.com");
    let statusCode = null;
    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: () => res,
    };
    requireAdmin({}, res, () => {});
    expect(statusCode).toBe(403);
  });
});
