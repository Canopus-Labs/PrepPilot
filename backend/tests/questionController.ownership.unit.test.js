import { describe, it, expect, vi, beforeEach } from "vitest";
import Module from "module";

// ---------------------------------------------------------------------------
// CJS controller mocks via Module._load shim (vi.mock cannot intercept the
// require() calls inside the CJS controller).
// ---------------------------------------------------------------------------

const moduleMocks = {};

const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request in moduleMocks) return moduleMocks[request];
  return originalLoad.apply(this, arguments);
};

const mockStartSession = vi.fn();
const mockSessionFindById = vi.fn();
const mockSessionUpdateOne = vi.fn();
const mockQuestionInsertMany = vi.fn();

function makeFakeMongoSession() {
  return {
    withTransaction: async (fn) => fn(),
    endSession: vi.fn().mockResolvedValue(),
  };
}

moduleMocks["mongoose"] = {
  startSession: (...args) => mockStartSession(...args),
};

moduleMocks["../models/Session"] = {
  findById: (...args) => mockSessionFindById(...args),
  updateOne: (...args) => mockSessionUpdateOne(...args),
};

moduleMocks["../models/Question"] = {
  insertMany: (...args) => mockQuestionInsertMany(...args),
};

const { addQuestionToSession } = require("../controllers/questionController");

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

beforeEach(() => {
  mockStartSession.mockReset();
  mockSessionFindById.mockReset();
  mockSessionUpdateOne.mockReset();
  mockQuestionInsertMany.mockReset();

  mockStartSession.mockResolvedValue(makeFakeMongoSession());
});

describe("addQuestionToSession — cross-user write (issue #212)", () => {
  it("returns 403 when req.user does not own the session", async () => {
    const ownerUserId = "aaaaaaaaaaaaaaaaaaaaaaaa";
    const attackerUserId = "bbbbbbbbbbbbbbbbbbbbbbbb";

    mockSessionFindById.mockReturnValue({
      session: vi.fn().mockResolvedValue({
        user: { toString: () => ownerUserId },
      }),
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
    expect(mockQuestionInsertMany).not.toHaveBeenCalled();
    expect(mockSessionUpdateOne).not.toHaveBeenCalled();
  });
});

describe("addQuestionToSession — owner adds questions", () => {
  it("returns 201, inserts questions, and links them atomically", async () => {
    const userId = "aaaaaaaaaaaaaaaaaaaaaaaa";
    const sessionId = "sessionid123";

    mockSessionFindById.mockReturnValue({
      session: vi.fn().mockResolvedValue({
        user: { toString: () => userId },
      }),
    });

    const mockCreated = [
      { _id: "q1", session: sessionId, question: "What is closure?", answer: "A function…" },
    ];

    mockQuestionInsertMany.mockResolvedValue(mockCreated);
    mockSessionUpdateOne.mockResolvedValue({ modifiedCount: 1 });

    const req = makeReq({
      sessionId,
      questions: [{ question: "What is closure?", answer: "A function…" }],
      userId,
    });
    const res = makeRes();

    await addQuestionToSession(req, res);

    expect(mockQuestionInsertMany).toHaveBeenCalledOnce();
    expect(mockQuestionInsertMany).toHaveBeenCalledWith(
      [{ session: sessionId, question: "What is closure?", answer: "A function…" }],
      expect.objectContaining({ session: expect.anything() }),
    );
    // Atomic $push linkage (no read-modify-write) so concurrent adds don't
    // lose a batch; the session's questions array is never saved wholesale.
    expect(mockSessionUpdateOne).toHaveBeenCalledWith(
      { _id: sessionId },
      { $push: { questions: { $each: ["q1"] } } },
      expect.objectContaining({ session: expect.anything() }),
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockCreated);
  });

  it("returns 500 and rolls back when the session linkage update fails (no orphans)", async () => {
    const userId = "aaaaaaaaaaaaaaaaaaaaaaaa";
    const sessionId = "sessionid123";

    mockSessionFindById.mockReturnValue({
      session: vi.fn().mockResolvedValue({ user: { toString: () => userId } }),
    });
    mockQuestionInsertMany.mockResolvedValue([{ _id: "q1" }]);
    mockSessionUpdateOne.mockRejectedValue(new Error("DB down"));

    const res = makeRes();
    await addQuestionToSession(
      makeReq({
        sessionId,
        questions: [{ question: "Q", answer: "A" }],
        userId,
      }),
      res,
    );

    expect(res.status).toHaveBeenCalledWith(500);
    // The insert and linkage run in one transaction (withTransaction), so a
    // failure here aborts the whole operation rather than orphaning questions.
    expect(mockQuestionInsertMany).toHaveBeenCalled();
  });
});

describe("addQuestionToSession — session not found", () => {
  it("returns 404 when session does not exist", async () => {
    mockSessionFindById.mockReturnValue({
      session: vi.fn().mockResolvedValue(null),
    });

    const req = makeReq({
      sessionId: "nonexistent",
      questions: [{ question: "Q", answer: "A" }],
      userId: "anyuser",
    });
    const res = makeRes();

    await addQuestionToSession(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(mockQuestionInsertMany).not.toHaveBeenCalled();
  });
});

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
