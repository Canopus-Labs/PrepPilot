import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../models/UserSheetProgress.js");

const UserSheetProgress = require("../models/UserSheetProgress.js");
const {
  exportProgress,
  importProgress,
} = require("../controllers/userSheetProgressController.js");
const {
  normalizeProgressItems,
  normalizeProgressItem,
  clampPercentage,
  buildBulkOps,
  MAX_IMPORT_ITEMS,
} = require("../utils/sheetProgressImport.js");

function makeRes() {
  const res = {
    statusCode: 200,
    headers: {},
    body: undefined,
    setHeader(key, value) {
      this.headers[key] = value;
    },
    send(body) {
      this.body = body;
    },
    json(obj) {
      this.body = obj;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
  };
  return res;
}

describe("clampPercentage", () => {
  it("clamps to the 0-100 range", () => {
    expect(clampPercentage(250)).toBe(100);
    expect(clampPercentage(-10)).toBe(0);
    expect(clampPercentage(42)).toBe(42);
  });

  it("falls back to 0 for non-numeric input", () => {
    expect(clampPercentage("abc")).toBe(0);
    expect(clampPercentage(undefined)).toBe(0);
  });
});

describe("normalizeProgressItem", () => {
  it("normalizes a valid entry", () => {
    const result = normalizeProgressItem(
      { sheetId: "sheet-1", followed: true, completedTopics: { "two-sum": true }, percentage: 42 },
      0
    );
    expect(result.ok).toBe(true);
    expect(result.value.sheetId).toBe("sheet-1");
    expect(result.value.followed).toBe(true);
    expect(result.value.percentage).toBe(42);
  });

  it("trims and clamps loosely-typed fields", () => {
    const result = normalizeProgressItem(
      { sheetId: "  sheet-2  ", followed: "yes", completedTopics: [1, 2], percentage: 250 },
      0
    );
    expect(result.value.sheetId).toBe("sheet-2");
    expect(result.value.followed).toBe(false);
    expect(result.value.completedTopics).toEqual({});
    expect(result.value.percentage).toBe(100);
  });

  it("rejects missing, non-string or oversized sheetIds", () => {
    expect(normalizeProgressItem({ sheetId: "" }, 0).ok).toBe(false);
    expect(normalizeProgressItem({ sheetId: 42 }, 0).ok).toBe(false);
    expect(normalizeProgressItem({ sheetId: "x".repeat(101) }, 0).ok).toBe(false);
    expect(normalizeProgressItem(null, 0).ok).toBe(false);
    expect(normalizeProgressItem([1, 2], 0).ok).toBe(false);
  });
});

describe("normalizeProgressItems", () => {
  it("returns an error for a non-array payload", () => {
    const { items, errors } = normalizeProgressItems({});
    expect(items).toEqual([]);
    expect(errors.length).toBeGreaterThan(0);
  });

  it("skips invalid entries and keeps valid ones", () => {
    const { items, errors } = normalizeProgressItems([
      { sheetId: "a" },
      { bad: true },
      { sheetId: "b" },
    ]);
    expect(items.length).toBe(2);
    expect(errors.length).toBe(1);
  });

  it("rejects oversized payloads", () => {
    const many = Array.from({ length: MAX_IMPORT_ITEMS + 1 }, () => ({ sheetId: "x" }));
    const { items, errors } = normalizeProgressItems(many);
    expect(items).toEqual([]);
    expect(errors[0]).toContain("exceeds limit");
  });
});

describe("buildBulkOps", () => {
  it("creates upsert updateOne ops scoped to the user", () => {
    const ops = buildBulkOps("u1", [
      { sheetId: "s1", followed: true, completedTopics: {}, percentage: 10 },
    ]);
    expect(ops[0].updateOne.filter).toEqual({ userId: "u1", sheetId: "s1" });
    expect(ops[0].updateOne.upsert).toBe(true);
    expect(ops[0].updateOne.update.$set.followed).toBe(true);
  });
});

describe("exportProgress controller", () => {
  beforeEach(() => vi.clearAllMocks());

  it("streams a JSON backup with safe fields", async () => {
    const rows = [
      {
        sheetId: "s1",
        followed: true,
        completedTopics: { a: true },
        percentage: 50,
        updatedAt: new Date("2025-01-01T00:00:00.000Z"),
      },
    ];
    UserSheetProgress.find = vi
      .fn()
      .mockReturnValue({ lean: () => Promise.resolve(rows) });

    const req = { user: { _id: "u1" } };
    const res = makeRes();
    await exportProgress(req, res);

    expect(res.headers["Content-Disposition"]).toContain(
      "sheet-progress-backup.json"
    );
    const body = JSON.parse(res.body);
    expect(body.count).toBe(1);
    expect(body.items[0].sheetId).toBe("s1");
    expect(body.items[0].percentage).toBe(50);
  });

  it("returns 500 when the query fails", async () => {
    UserSheetProgress.find = vi
      .fn()
      .mockReturnValue({ lean: () => Promise.reject(new Error("boom")) });
    const res = makeRes();
    await exportProgress({ user: { _id: "u1" } }, res);
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
  });
});

describe("importProgress controller", () => {
  beforeEach(() => vi.clearAllMocks());

  it("bulk upserts normalized entries and reports counts", async () => {
    UserSheetProgress.bulkWrite = vi
      .fn()
      .mockResolvedValue({ matchedCount: 2, upsertedCount: 1 });
    const req = {
      user: { _id: "u1" },
      body: { items: [{ sheetId: "s1" }, { sheetId: "s2" }, { bad: 1 }] },
    };
    const res = makeRes();
    await importProgress(req, res);

    expect(UserSheetProgress.bulkWrite).toHaveBeenCalledOnce();
    expect(res.body.success).toBe(true);
    expect(res.body.imported).toBe(2);
    expect(res.body.skipped).toBe(1);
    expect(res.body.created).toBe(1);
    expect(res.body.updated).toBe(2);
  });

  it("returns 400 when nothing can be imported", async () => {
    const req = { user: { _id: "u1" }, body: { items: [{ bad: 1 }] } };
    const res = makeRes();
    await importProgress(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("returns 400 when the payload is not an array", async () => {
    const req = { user: { _id: "u1" }, body: { items: { sheetId: "s1" } } };
    const res = makeRes();
    await importProgress(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
