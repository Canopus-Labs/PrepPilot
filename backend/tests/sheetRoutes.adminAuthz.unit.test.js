import mongoose from "mongoose";
import { describe, it, expect, beforeAll, afterEach, vi } from "vitest";

// ---------------------------------------------------------------------------
// Issue #1446: /api/sheets write routes must be admin-only. Non-admin users
// must receive 403 on POST /upload, POST /validate, PUT /:id, and DELETE /:id,
// while the public read routes stay open.
// ---------------------------------------------------------------------------

let sheetRouter;
let requireAdmin;
let Sheet;

beforeAll(async () => {
  const sheetRouterMod = await import("../routes/sheetJsonUpload.js");
  sheetRouter = sheetRouterMod.default ?? sheetRouterMod;

  const authMod = await import("../middlewares/authMiddleware.js");
  requireAdmin = authMod.requireAdmin;

  Sheet = mongoose.models.Sheet;
});

afterEach(() => {
  vi.restoreAllMocks();
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

function getRouteHandler(method, path) {
  const stack = getLayerStack(sheetRouter, method, path);
  return stack[stack.length - 1];
}

function createRes() {
  const res = {
    statusCode: 200,
    body: null,
    status: vi.fn((code) => {
      res.statusCode = code;
      return res;
    }),
    json: vi.fn((body) => {
      res.body = body;
      return res;
    }),
  };
  return res;
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

describe("/api/sheets mutation audit trail", () => {
  it.each([
    ["POST", "/upload"],
    ["PUT", "/:id"],
    ["DELETE", "/:id"],
  ])("%s %s stays admin-only while adding audit behavior (#1715)", (method, path) => {
    const stack = getLayerStack(sheetRouter, method, path);
    expect(stack).not.toBeNull();
    const protectIdx = stack.findIndex((fn) => fn && fn.name === "protect");
    const adminIdx = stack.findIndex((fn) => fn && fn.name === "requireAdmin");

    expect(protectIdx).toBeGreaterThanOrEqual(0);
    expect(adminIdx).toBe(protectIdx + 1);
  });

  it("keeps soft-delete audit fields on the sheet model", () => {
    expect(Sheet.schema.path("createdBy")).toBeTruthy();
    expect(Sheet.schema.path("updatedBy")).toBeTruthy();
    expect(Sheet.schema.path("deletedAt")).toBeTruthy();
    expect(Sheet.schema.path("deletedBy")).toBeTruthy();
  });

  it("records createdBy and updatedBy when uploading sheets", async () => {
    const userId = new mongoose.Types.ObjectId();
    const findOneAndUpdate = vi
      .spyOn(Sheet, "findOneAndUpdate")
      .mockResolvedValue({ id: "array-basics" });
    const uploadHandler = getRouteHandler("POST", "/upload");
    const res = createRes();

    await uploadHandler(
      {
        user: { _id: userId },
        body: {
          filename: "sheets.json",
          data: { id: "array-basics", title: "Array Basics" },
        },
      },
      res
    );

    expect(findOneAndUpdate).toHaveBeenCalledWith(
      { id: "array-basics" },
      expect.objectContaining({
        $set: expect.objectContaining({
          updatedBy: userId,
          deletedAt: null,
        }),
        $setOnInsert: expect.objectContaining({
          createdBy: userId,
          uploadedAt: expect.any(Date),
        }),
        $unset: { deletedBy: "" },
      }),
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("records updatedBy when updating a sheet", async () => {
    const userId = new mongoose.Types.ObjectId();
    const findOneAndUpdate = vi
      .spyOn(Sheet, "findOneAndUpdate")
      .mockResolvedValue({ id: "array-basics" });
    const updateHandler = getRouteHandler("PUT", "/:id");
    const res = createRes();

    await updateHandler(
      {
        user: { _id: userId },
        params: { id: "array-basics" },
        body: { id: "array-basics", title: "Array Basics" },
      },
      res
    );

    expect(findOneAndUpdate).toHaveBeenCalledWith(
      { id: "array-basics", deletedAt: null },
      {
        $set: expect.objectContaining({
          updatedBy: userId,
        }),
      },
      { new: true, setDefaultsOnInsert: true }
    );
    expect(res.body).toEqual({ message: "Sheet updated.", sheet: { id: "array-basics" } });
  });

  it("soft-deletes sheets instead of hard-deleting catalog records", async () => {
    const userId = new mongoose.Types.ObjectId();
    const deletedAt = new Date();
    const findOneAndUpdate = vi
      .spyOn(Sheet, "findOneAndUpdate")
      .mockResolvedValue({ id: "array-basics", deletedAt });
    const findOneAndDelete = vi.spyOn(Sheet, "findOneAndDelete");
    const deleteHandler = getRouteHandler("DELETE", "/:id");
    const res = createRes();

    await deleteHandler(
      {
        user: { _id: userId },
        params: { id: "array-basics" },
        body: { confirmId: "array-basics" },
      },
      res
    );

    expect(findOneAndUpdate).toHaveBeenCalledWith(
      { id: "array-basics", deletedAt: null },
      {
        $set: {
          deletedAt: expect.any(Date),
          deletedBy: userId,
        },
      },
      { new: true }
    );
    expect(findOneAndDelete).not.toHaveBeenCalled();
    expect(res.body).toEqual({
      message: "Sheet deleted.",
      id: "array-basics",
      deletedAt,
    });
  });

  it("returns 404 when soft-deleting a missing or already deleted sheet", async () => {
    vi.spyOn(Sheet, "findOneAndUpdate").mockResolvedValue(null);
    const deleteHandler = getRouteHandler("DELETE", "/:id");
    const res = createRes();

    await deleteHandler(
      {
        user: { _id: new mongoose.Types.ObjectId() },
        params: { id: "array-basics" },
        body: { confirmId: "array-basics" },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.body).toEqual({ error: "Sheet not found." });
  });
});
