import { describe, it, expect, vi } from "vitest";
const {
  validateSavedAchievements,
} = require("../Input_validators/ValidateAchievement.js");

function makeReq(body = {}) {
  return { body };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("validateSavedAchievements - max length guards", () => {
  it("accepts normal achievement IDs", () => {
    const req = makeReq({
      unlockedAchievements: ["first-interview", "streak-7", "flashcard-master"],
    });
    const res = makeRes();
    validateSavedAchievements(req, res, () => {});
    expect(res.status).not.toHaveBeenCalled();
  });

  it("accepts empty array", () => {
    const req = makeReq({ unlockedAchievements: [] });
    const res = makeRes();
    validateSavedAchievements(req, res, () => {});
    expect(res.status).not.toHaveBeenCalled();
  });

  it("rejects achievement ID exceeding 100 characters", () => {
    const req = makeReq({
      unlockedAchievements: ["A".repeat(101)],
    });
    const res = makeRes();
    validateSavedAchievements(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: "Validation failed" })
    );
  });

  it("accepts achievement ID at exact boundary (100 chars)", () => {
    const req = makeReq({
      unlockedAchievements: ["A".repeat(100)],
    });
    const res = makeRes();
    validateSavedAchievements(req, res, () => {});
    expect(res.status).not.toHaveBeenCalled();
  });

  it("rejects non-array input", () => {
    const req = makeReq({ unlockedAchievements: "not-an-array" });
    const res = makeRes();
    validateSavedAchievements(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("rejects non-string item in array", () => {
    const req = makeReq({ unlockedAchievements: [123] });
    const res = makeRes();
    validateSavedAchievements(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
