import { Module } from "node:module";
import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";

// ---------------------------------------------------------------------------
// userSheetProgressController.js is CommonJS and loads its deps via
// require(), which vitest's vi.mock cannot intercept. We shim Node's module
// loader so the real UserSheetProgress model is never touched.
//
// Covers issue #1449: saveProgress must reject out-of-range / malformed
// field values (percentage outside [0,100], non-boolean followed,
// non-object completedTopics) while still allowing partial payloads.
// ---------------------------------------------------------------------------

const modelMock = vi.hoisted(() => ({
  find: vi.fn(),
  findOne: vi.fn(),
  findOneAndUpdate: vi.fn(),
  create: vi.fn(),
  bulkWrite: vi.fn(),
}));

const testDoubles = new Map();
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (testDoubles.has(request)) {
    return testDoubles.get(request);
  }
  return originalLoad.call(this, request, parent, isMain);
};

const clearRequireCache = () => {
  Object.keys(require.cache).forEach((key) => {
    if (
      key.includes("controllers\\userSheetProgressController") ||
      key.includes("controllers/userSheetProgressController") ||
      key.includes("models\\UserSheetProgress") ||
      key.includes("models/UserSheetProgress")
    ) {
      delete require.cache[key];
    }
  });
};

let saveProgress;
let getAllProgress;
let getProgress;
let validateSaveProgress;

beforeAll(async () => {
  clearRequireCache();
  testDoubles.set("../models/UserSheetProgress", {
    find: modelMock.find,
    findOne: modelMock.findOne,
    findOneAndUpdate: modelMock.findOneAndUpdate,
    create: modelMock.create,
    bulkWrite: modelMock.bulkWrite,
  });

  const mod = await import("../controllers/userSheetProgressController.js");
  saveProgress = mod.saveProgress;
  getAllProgress = mod.getAllProgress;
  getProgress = mod.getProgress;

  const validator = await import(
    "../Input_validators/ValidateUserSheetProgress.js"
  );
  validateSaveProgress = validator.validateSaveProgress;
});

beforeEach(() => {
  modelMock.find.mockReset();
  modelMock.findOne.mockReset();
  modelMock.findOneAndUpdate.mockReset();
  modelMock.create.mockReset();
  modelMock.bulkWrite.mockReset();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

const mockRes = () => {
  const res = { statusCode: null, body: null };
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (body) => {
    res.body = body;
    return res;
  };
  return res;
};

// ---------------------------------------------------------------------------
// validateSaveProgress middleware
// ---------------------------------------------------------------------------
describe("validateSaveProgress — field validation (#1449)", () => {
  it.each([
    ["percentage 150", { sheetId: "arrays", percentage: 150 }],
    ["percentage -1", { sheetId: "arrays", percentage: -1 }],
    ["percentage non-numeric", { sheetId: "arrays", percentage: "abc" }],
    ["followed non-boolean", { sheetId: "arrays", followed: "yes" }],
    ["completedTopics malformed", { sheetId: "arrays", completedTopics: "x" }],
    ["missing sheetId", { followed: true }],
  ])("rejects %s with 400", (_name, body) => {
    const res = mockRes();
    let nextCalled = false;

    validateSaveProgress({ body }, res, () => {
      nextCalled = true;
    });

    expect(nextCalled).toBe(false);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(expect.objectContaining({ success: false }));
  });

  it("accepts a valid full payload", () => {
    const res = mockRes();
    let nextCalled = false;

    validateSaveProgress(
      {
        body: {
          sheetId: "arrays",
          followed: true,
          completedTopics: { "two-pointers": true },
          percentage: 80,
        },
      },
      res,
      () => {
        nextCalled = true;
      }
    );

    expect(nextCalled).toBe(true);
    expect(res.statusCode).toBeNull();
  });

  it("accepts a partial payload (only followed) so $set preserves other fields", () => {
    const res = mockRes();
    let nextCalled = false;

    validateSaveProgress(
      { body: { sheetId: "arrays", followed: true } },
      res,
      () => {
        nextCalled = true;
      }
    );

    expect(nextCalled).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// saveProgress controller
// ---------------------------------------------------------------------------
describe("saveProgress", () => {
  it("upserts only the explicitly provided fields via findOneAndUpdate", async () => {
    const fakeProgress = {
      sheetId: "arrays",
      followed: true,
      completedTopics: {},
      percentage: 80,
    };
    modelMock.findOneAndUpdate.mockResolvedValue(fakeProgress);

    const req = {
      user: { _id: "user-1" },
      body: { sheetId: "arrays", followed: true, percentage: 80 },
    };
    const res = mockRes();

    await saveProgress(req, res);

    expect(modelMock.findOneAndUpdate).toHaveBeenCalledWith(
      { userId: "user-1", sheetId: "arrays" },
      { $set: { followed: true, percentage: 80 } },
      expect.objectContaining({ upsert: true, new: true })
    );
    expect(res.body).toEqual({ success: true, progress: fakeProgress });
  });

  it("rejects an invalid sheetId with 400", async () => {
    const req = {
      user: { _id: "user-1" },
      body: { sheetId: "   " },
    };
    const res = mockRes();

    await saveProgress(req, res);

    expect(res.statusCode).toBe(400);
    expect(modelMock.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it("returns 500 when findOneAndUpdate throws", async () => {
    modelMock.findOneAndUpdate.mockRejectedValue(new Error("db error"));

    const req = {
      user: { _id: "user-1" },
      body: { sheetId: "arrays", percentage: 50 },
    };
    const res = mockRes();

    await saveProgress(req, res);

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual(expect.objectContaining({ success: false }));
  });
});

// ---------------------------------------------------------------------------
// getAllProgress
// ---------------------------------------------------------------------------
describe("getAllProgress", () => {
  it("calls UserSheetProgress.find with the authenticated user's id", async () => {
    const fakeList = [{ sheetId: "arrays", percentage: 80 }];
    const findPromise = Promise.resolve(fakeList);
    findPromise.limit = vi.fn().mockReturnValue(findPromise);
    modelMock.find.mockReturnValue(findPromise);

    const req = { user: { _id: "user-abc" } };
    const res = mockRes();

    await getAllProgress(req, res);

    expect(modelMock.find).toHaveBeenCalledWith({ userId: "user-abc" });
    expect(res.body).toEqual({ success: true, progressList: fakeList });
  });

  it("returns 500 when find throws", async () => {
    modelMock.find.mockRejectedValue(new Error("db error"));

    const req = { user: { _id: "user-xyz" } };
    const res = mockRes();

    await getAllProgress(req, res);

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual(expect.objectContaining({ success: false }));
  });
});

// ---------------------------------------------------------------------------
// getProgress
// ---------------------------------------------------------------------------
describe("getProgress", () => {
  it("returns progress for the given sheetId", async () => {
    const fakeProgress = { sheetId: "graphs", percentage: 60 };
    modelMock.findOne.mockResolvedValue(fakeProgress);

    const req = { user: { _id: "user-3" }, params: { sheetId: "graphs" } };
    const res = mockRes();

    await getProgress(req, res);

    expect(modelMock.findOne).toHaveBeenCalledWith({
      userId: "user-3",
      sheetId: "graphs",
    });
    expect(res.body).toEqual({ success: true, progress: fakeProgress });
  });

  it("rejects an invalid sheetId with 400", async () => {
    const req = { user: { _id: "user-4" }, params: { sheetId: "" } };
    const res = mockRes();

    await getProgress(req, res);

    expect(res.statusCode).toBe(400);
    expect(modelMock.findOne).not.toHaveBeenCalled();
  });

  it("returns 500 when findOne throws", async () => {
    modelMock.findOne.mockRejectedValue(new Error("timeout"));

    const req = { user: { _id: "user-4" }, params: { sheetId: "dp" } };
    const res = mockRes();

    await getProgress(req, res);

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual(expect.objectContaining({ success: false }));
  });
});
