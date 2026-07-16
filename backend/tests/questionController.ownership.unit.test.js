import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Unit tests for addQuestionToSession — ownership guard
// ---------------------------------------------------------------------------

// Mock Mongoose models before importing the controller
vi.mock("../models/Session.js", () => ({
  default: { findById: vi.fn() },
}));
vi.mock("../models/Question.js", () => ({
  default: { insertMany: vi.fn() },
}));

let addQuestionToSession;
let Session;
let Question;

beforeEach(async () => {
  vi.resetModules();
  vi.clearAllMocks();

  // Re-import after reset so mocks are fresh each suite
  const ctrl = await import("../controllers/questionController.js");
  addQuestionToSession = ctrl.addQuestionToSession;

  Session = (await import("../models/Session.js")).default;
  Question = (await import("../models/Question.js")).default;
});

// ---------------------------------------------------------------------------
// Helper: build minimal req / res stubs
// ---------------------------------------------------------------------------
function makeReq({ sessionId, questions, userId }) {
  return {
    body: { sessionId, questions },
    user: { _id: userId },
  };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

// ---------------------------------------------------------------------------
// 403 — User B tries to write into User A's session
// ---------------------------------------------------------------------------
describe("addQuestionToSession — cross-user write (issue #212)", () => {
  it("returns 403 when req.user does not own the session", async () => {
    const ownerUserId = "aaaaaaaaaaaaaaaaaaaaaaaa";
    const attackerUserId = "bbbbbbbbbbbbbbbbbbbbbbbb";

    Session.findById.mockResolvedValue({
      user: { toString: () => ownerUserId },
      questions: [],
      save: vi.fn(),
    });

    const req = makeReq({
      sessionId: "sessionid123",
      questions: [{ question: "Injected?", answer: "yes" }],
      userId: attackerUserId,
    });
    const res = makeRes();

    await addQuestionToSession(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: "Unauthorized access" })
    );
    // Critical: no questions must have been written
    expect(Question.insertMany).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// 201 — Owner adds questions to their own session (happy path)
// ---------------------------------------------------------------------------
describe("addQuestionToSession — owner adds questions", () => {
  it("returns 201 and persists questions when the caller owns the session", async () => {
    const userId = "aaaaaaaaaaaaaaaaaaaaaaaa";
    const sessionId = "sessionid123";

    const mockSession = {
      user: { toString: () => userId },
      questions: [],
      save: vi.fn().mockResolvedValue(true),
    };

    const mockCreated = [
      { _id: "q1", session: sessionId, question: "What is closure?", answer: "A function…" },
    ];

    Session.findById.mockResolvedValue(mockSession);
    Question.insertMany.mockResolvedValue(mockCreated);

    const req = makeReq({
      sessionId,
      questions: [{ question: "What is closure?", answer: "A function…" }],
      userId,
    });
    const res = makeRes();

    await addQuestionToSession(req, res);

    expect(Question.insertMany).toHaveBeenCalledOnce();
    expect(mockSession.save).toHaveBeenCalledOnce();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockCreated);
  });
});

// ---------------------------------------------------------------------------
// 404 — session not found still returns 404 (regression)
// ---------------------------------------------------------------------------
describe("addQuestionToSession — session not found", () => {
  it("returns 404 when session does not exist", async () => {
    Session.findById.mockResolvedValue(null);

    const req = makeReq({
      sessionId: "nonexistent",
      questions: [{ question: "Q", answer: "A" }],
      userId: "anyuser",
    });
    const res = makeRes();

    await addQuestionToSession(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(Question.insertMany).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// 400 — missing / invalid body (regression)
// ---------------------------------------------------------------------------
describe("addQuestionToSession — bad input", () => {
  it("returns 400 when questions is not an array", async () => {
    const req = makeReq({ sessionId: "s1", questions: "bad", userId: "u1" });
    const res = makeRes();
    await addQuestionToSession(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns 400 when sessionId is missing", async () => {
    const req = makeReq({ sessionId: undefined, questions: [], userId: "u1" });
    const res = makeRes();
    await addQuestionToSession(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});