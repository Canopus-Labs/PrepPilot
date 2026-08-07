import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../models/NotesSummary.js");

const NotesSummary = require("../models/NotesSummary.js");
const { saveSummary } = require("../controllers/notesSummaryController.js");

function makeReq(body = {}, userId = "507f1f77bcf86cd799439011") {
  return { body, user: { _id: userId } };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("saveSummary controller", () => {
  beforeEach(() => vi.clearAllMocks());

  it("saves a Zod-validated notes summary payload with object metadata", async () => {
    const payload = {
      fileName: "operating-systems.pdf",
      sourceType: "upload",
      sourceUrl: null,
      pageCount: 12,
      wordCount: 2400,
      contentHash: "abc123",
      summary: "These notes cover scheduling, memory management, and file systems.",
      topics: {
        chapters: ["Processes"],
        subtopics: ["Scheduling"],
        keywords: ["kernel", "thread"],
      },
      prerequisites: ["Basic computer architecture"],
      difficulty: {
        level: "Intermediate",
        explanation: "Requires familiarity with OS fundamentals.",
      },
      readingTime: {
        minutes: 10,
        label: "10 min read",
        pages: 12,
      },
      learningOutcomes: ["Explain process scheduling tradeoffs"],
    };
    const safeSummary = { _id: "summary-1", ...payload };

    NotesSummary.findOneAndUpdate = vi.fn().mockResolvedValue({
      toSafeObject: vi.fn().mockReturnValue(safeSummary),
    });
    NotesSummary.countDocuments = vi.fn().mockResolvedValue(1);

    const req = makeReq(payload);
    const res = makeRes();

    await saveSummary(req, res);

    expect(NotesSummary.findOneAndUpdate).toHaveBeenCalledWith(
      {
        user: req.user._id,
        fileName: payload.fileName,
      },
      expect.objectContaining({
        user: req.user._id,
        topics: payload.topics,
        difficulty: payload.difficulty,
        readingTime: payload.readingTime,
      }),
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      summary: safeSummary,
    });
  });
});
