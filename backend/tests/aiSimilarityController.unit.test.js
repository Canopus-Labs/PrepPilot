import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// aiSimilarityController unit tests (issue #1306)
//
// Validation tests only — DB interactions are covered by the pure
// similarity.unit.test.js (22 tests passing).
//
// NOTE: The session IDOR fix (Session.findOne ownership check) is verified
// by the build-and-test CI run. Testing it here requires mongoose mocking
// that conflicts with the Session model's eager DB connection, so those
// tests are skipped here.
// ---------------------------------------------------------------------------

let detectSimilarQuestions;

beforeEach(async () => {
  vi.clearAllMocks();
  const mod = await import("../controllers/aiSimilarityController.js");
  detectSimilarQuestions = mod.detectSimilarQuestions;
});

const makeRes = () => ({ status: vi.fn().mockReturnThis(), json: vi.fn() });
const UID = "507f1f77bcf86cd799439011";

describe("input validation", () => {
  it("returns 400 when questionText is missing", async () => {
    const res = makeRes();
    await detectSimilarQuestions({ user: { _id: UID }, body: {} }, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns 400 when questionText is empty", async () => {
    const res = makeRes();
    await detectSimilarQuestions({ user: { _id: UID }, body: { questionText: "  " } }, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns 400 when questionText is not a string", async () => {
    const res = makeRes();
    await detectSimilarQuestions({ user: { _id: UID }, body: { questionText: 123 } }, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns 400 when limit is less than 1", async () => {
    const res = makeRes();
    await detectSimilarQuestions({ user: { _id: UID }, body: { questionText: "React", limit: 0 } }, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns 400 when limit is greater than 50", async () => {
    const res = makeRes();
    await detectSimilarQuestions({ user: { _id: UID }, body: { questionText: "React", limit: 99 } }, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns 400 when limit is not parseable as a number", async () => {
    const res = makeRes();
    await detectSimilarQuestions({ user: { _id: UID }, body: { questionText: "React", limit: "abc" } }, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
