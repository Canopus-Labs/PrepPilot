"use strict";

/**
 * Unit tests for userSheetProgressController
 *
 * These tests use Jest module mocking. Before the fix, jest.mock on
 * '../models/UserSheetProgress' was NOT seen by getAllProgress because the
 * require() in the controller appeared after the export definition, causing
 * the binding to resolve to the real module before the mock could intercept.
 * After moving the require to the top of the file, the mock is applied first
 * and all three handlers see the same mocked binding.
 */

jest.mock("../models/UserSheetProgress");

const UserSheetProgress = require("../models/UserSheetProgress");
const ctrl = require("../controllers/userSheetProgressController");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

beforeEach(() => {
  jest.clearAllMocks();
});

// ---------------------------------------------------------------------------
// getAllProgress — this is the regression test that proves the fix
// ---------------------------------------------------------------------------
describe("getAllProgress", () => {
  it("calls UserSheetProgress.find with the authenticated user's id", async () => {
    const userId = "user-abc-123";
    const fakeList = [{ sheetId: "arrays", percentage: 80 }];

    UserSheetProgress.find = jest.fn().mockResolvedValue(fakeList);

    const req = { user: { _id: userId } };
    const res = makeRes();

    await ctrl.getAllProgress(req, res);

    // KEY assertion: the mock must have been called.
    // Before the fix this fails — find is called on the real model, not the mock.
    expect(UserSheetProgress.find).toHaveBeenCalledWith({ userId });
    expect(res.json).toHaveBeenCalledWith({ success: true, progressList: fakeList });
  });

  it("returns 500 when find throws", async () => {
    UserSheetProgress.find = jest.fn().mockRejectedValue(new Error("db error"));

    const req = { user: { _id: "user-xyz" } };
    const res = makeRes();

    await ctrl.getAllProgress(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, error: "db error" })
    );
  });
});

// ---------------------------------------------------------------------------
// saveProgress
// ---------------------------------------------------------------------------
describe("saveProgress — update existing", () => {
  it("updates and saves an existing progress document", async () => {
    const mockProgress = {
      followed: false,
      completedTopics: [],
      percentage: 0,
      save: jest.fn().mockResolvedValue(true),
    };

    UserSheetProgress.findOne = jest.fn().mockResolvedValue(mockProgress);

    const req = {
      user: { _id: "user-1" },
      body: { sheetId: "arrays", followed: true, completedTopics: ["Two Pointers"], percentage: 50 },
    };
    const res = makeRes();

    await ctrl.saveProgress(req, res);

    expect(mockProgress.save).toHaveBeenCalledOnce();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    );
  });
});

describe("saveProgress — create new", () => {
  it("creates a new progress document when none exists", async () => {
    const created = { sheetId: "trees", percentage: 20 };
    UserSheetProgress.findOne = jest.fn().mockResolvedValue(null);
    UserSheetProgress.create = jest.fn().mockResolvedValue(created);

    const req = {
      user: { _id: "user-2" },
      body: { sheetId: "trees", followed: false, completedTopics: [], percentage: 20 },
    };
    const res = makeRes();

    await ctrl.saveProgress(req, res);

    expect(UserSheetProgress.create).toHaveBeenCalledOnce();
    expect(res.json).toHaveBeenCalledWith({ success: true, progress: created });
  });
});

// ---------------------------------------------------------------------------
// getProgress
// ---------------------------------------------------------------------------
describe("getProgress", () => {
  it("returns progress for the given sheetId", async () => {
    const fakeProgress = { sheetId: "graphs", percentage: 60 };
    UserSheetProgress.findOne = jest.fn().mockResolvedValue(fakeProgress);

    const req = { user: { _id: "user-3" }, params: { sheetId: "graphs" } };
    const res = makeRes();

    await ctrl.getProgress(req, res);

    expect(UserSheetProgress.findOne).toHaveBeenCalledWith({
      userId: "user-3",
      sheetId: "graphs",
    });
    expect(res.json).toHaveBeenCalledWith({ success: true, progress: fakeProgress });
  });

  it("returns 500 when findOne throws", async () => {
    UserSheetProgress.findOne = jest.fn().mockRejectedValue(new Error("timeout"));

    const req = { user: { _id: "user-4" }, params: { sheetId: "dp" } };
    const res = makeRes();

    await ctrl.getProgress(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, error: "timeout" })
    );
  });
});