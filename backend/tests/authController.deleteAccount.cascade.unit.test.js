import { Module } from "node:module";
import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";

// ---------------------------------------------------------------------------
// deleteUserAccount — transactional cascade cleanup (issue #1144).
//
// authController.js is CommonJS and loads deps via require(), which vitest's
// vi.mock cannot intercept. We shim Node's module loader so the real mongoose
// models / sessions are never touched.
// ---------------------------------------------------------------------------

const mongooseMock = vi.hoisted(() => ({ startSession: vi.fn() }));
const userMock = vi.hoisted(() => ({ findById: vi.fn(), findByIdAndDelete: vi.fn() }));
const sessionMock = vi.hoisted(() => ({ find: vi.fn(), deleteMany: vi.fn() }));
const questionMock = vi.hoisted(() => ({ deleteMany: vi.fn() }));
const flashcardMock = vi.hoisted(() => ({ deleteMany: vi.fn() }));
const resumeMock = vi.hoisted(() => ({ deleteMany: vi.fn() }));
const notesSummaryMock = vi.hoisted(() => ({ deleteMany: vi.fn() }));
const roadmapProjectMock = vi.hoisted(() => ({ deleteMany: vi.fn() }));
const userSheetProgressMock = vi.hoisted(() => ({ deleteMany: vi.fn() }));

const txMock = {
  withTransaction: vi.fn(),
  endSession: vi.fn(),
};

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
      key.includes("controllers\\authController") ||
      key.includes("controllers/authController") ||
      key.includes("models\\")
    ) {
      delete require.cache[key];
    }
  });
};

// Mongoose queries are thenable objects that also expose .session(); this
// builds the smallest such stub so `.session(tx)` chains work in the handler.
const chainQuery = (value) => {
  const q = { session: vi.fn().mockReturnThis() };
  const p = Promise.resolve(value);
  q.then = p.then.bind(p);
  q.catch = p.catch.bind(p);
  q.finally = p.finally.bind(p);
  return q;
};

const rejectedChainQuery = (error) => {
  const q = { session: vi.fn().mockReturnThis() };
  const p = Promise.reject(error);
  q.then = p.then.bind(p);
  q.catch = p.catch.bind(p);
  q.finally = p.finally.bind(p);
  return q;
};

let deleteUserAccount;

beforeAll(async () => {
  clearRequireCache();

  testDoubles.set("mongoose", mongooseMock);
  testDoubles.set("../models/User", {
    findById: userMock.findById,
    findByIdAndDelete: userMock.findByIdAndDelete,
  });
  testDoubles.set("../models/Session", {
    find: sessionMock.find,
    deleteMany: sessionMock.deleteMany,
  });
  testDoubles.set("../models/Question", { deleteMany: questionMock.deleteMany });
  testDoubles.set("../models/Flashcard", { deleteMany: flashcardMock.deleteMany });
  testDoubles.set("../models/Resume", { deleteMany: resumeMock.deleteMany });
  testDoubles.set("../models/NotesSummary", { deleteMany: notesSummaryMock.deleteMany });
  testDoubles.set("../models/RoadmapProject", { deleteMany: roadmapProjectMock.deleteMany });
  testDoubles.set("../models/UserSheetProgress", { deleteMany: userSheetProgressMock.deleteMany });

  const mod = await import("../controllers/authController.js");
  deleteUserAccount = mod.deleteUserAccount;
});

beforeEach(() => {
  process.env.NODE_ENV = "test";
  mongooseMock.startSession.mockReset();
  userMock.findById.mockReset();
  userMock.findByIdAndDelete.mockReset();
  sessionMock.find.mockReset();
  sessionMock.deleteMany.mockReset();
  questionMock.deleteMany.mockReset();
  flashcardMock.deleteMany.mockReset();
  resumeMock.deleteMany.mockReset();
  notesSummaryMock.deleteMany.mockReset();
  roadmapProjectMock.deleteMany.mockReset();
  userSheetProgressMock.deleteMany.mockReset();
  txMock.withTransaction.mockReset();
  txMock.endSession.mockReset();
});

afterEach(() => {
  delete process.env.NODE_ENV;
});

const makeRes = () => {
  const res = { statusCode: 200, body: null, clearCookie: vi.fn() };
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

// Seeds a healthy cascade: sessions found, every collection deletion succeeds.
const seedSuccessfulCascade = () => {
  mongooseMock.startSession.mockResolvedValue(txMock);
  sessionMock.find.mockImplementation(() => chainQuery([{ _id: "session-1" }, { _id: "session-2" }]));
  questionMock.deleteMany.mockImplementation(() => chainQuery({ deletedCount: 5 }));
  sessionMock.deleteMany.mockImplementation(() => chainQuery({ deletedCount: 2 }));
  flashcardMock.deleteMany.mockImplementation(() => chainQuery({ deletedCount: 3 }));
  resumeMock.deleteMany.mockImplementation(() => chainQuery({ deletedCount: 2 }));
  notesSummaryMock.deleteMany.mockImplementation(() => chainQuery({ deletedCount: 1 }));
  roadmapProjectMock.deleteMany.mockImplementation(() => chainQuery({ deletedCount: 4 }));
  userSheetProgressMock.deleteMany.mockImplementation(() => chainQuery({ deletedCount: 6 }));
  userMock.findByIdAndDelete.mockImplementation(() => chainQuery({ _id: "user-to-delete-id" }));
  txMock.withTransaction.mockImplementation((fn) => fn(txMock));
};

describe("deleteUserAccount — transactional cascade (issue #1144)", () => {
  it("returns 404 before starting a transaction when the user is not found", async () => {
    userMock.findById.mockResolvedValueOnce(null);

    const res = makeRes();
    await deleteUserAccount({ user: { _id: "missing" } }, res);

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ success: false, message: "User not found" });
    expect(mongooseMock.startSession).not.toHaveBeenCalled();
  });

  it("runs every cascade delete inside the transaction and responds only after commit", async () => {
    seedSuccessfulCascade();
    userMock.findById.mockResolvedValueOnce({ _id: "user-to-delete-id" });

    const res = makeRes();
    await deleteUserAccount({ user: { _id: "user-to-delete-id" } }, res);

    // Every collection is wiped inside the transaction session.
    expect(questionMock.deleteMany).toHaveBeenCalledWith({ session: { $in: ["session-1", "session-2"] } });
    expect(sessionMock.deleteMany).toHaveBeenCalledWith({ user: "user-to-delete-id" });
    expect(flashcardMock.deleteMany).toHaveBeenCalledWith({ userId: "user-to-delete-id" });
    expect(resumeMock.deleteMany).toHaveBeenCalledWith({ user: "user-to-delete-id" });
    expect(notesSummaryMock.deleteMany).toHaveBeenCalledWith({ user: "user-to-delete-id" });
    expect(roadmapProjectMock.deleteMany).toHaveBeenCalledWith({ userId: "user-to-delete-id" });
    expect(userSheetProgressMock.deleteMany).toHaveBeenCalledWith({ userId: "user-to-delete-id" });
    expect(userMock.findByIdAndDelete).toHaveBeenCalledWith("user-to-delete-id");

    // The delete queries are bound to the transaction session.
    expect(sessionMock.find).toHaveBeenCalledWith({ user: "user-to-delete-id" });
    expect(sessionMock.find.mock.results[0].value.session).toHaveBeenCalledWith(txMock);
    expect(userMock.findByIdAndDelete.mock.results[0].value.session).toHaveBeenCalledWith(txMock);

    expect(txMock.withTransaction).toHaveBeenCalledTimes(1);
    expect(txMock.endSession).toHaveBeenCalledTimes(1);

    expect(res.clearCookie).toHaveBeenCalledWith("refreshToken", expect.objectContaining({ httpOnly: true, path: "/api/auth" }));
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true, message: "Account and all associated data deleted successfully" });
  });

  it("rolls back and never deletes the account when one collection delete fails", async () => {
    seedSuccessfulCascade();
    // Inject a failure into the questions deletion — the whole transaction aborts.
    questionMock.deleteMany.mockImplementation(() => rejectedChainQuery(new Error("network blip")));
    userMock.findById.mockResolvedValueOnce({ _id: "user-to-delete-id" });

    const res = makeRes();
    await deleteUserAccount({ user: { _id: "user-to-delete-id" } }, res);

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ success: false, message: "Internal server error occurred" });
    // The account must NOT have been deleted (nothing committed).
    expect(userMock.findByIdAndDelete).not.toHaveBeenCalled();
    expect(txMock.endSession).toHaveBeenCalledTimes(1);
  });

  it("falls back to a compensating cleanup pass when transactions are unsupported", async () => {
    seedSuccessfulCascade();
    userMock.findById.mockResolvedValueOnce({ _id: "user-to-delete-id" });
    // Simulate standalone Mongo rejecting the transaction attempt.
    txMock.withTransaction.mockRejectedValueOnce(
      new Error("Transaction numbers are only allowed on a replica set members or mongos")
    );

    const res = makeRes();
    await deleteUserAccount({ user: { _id: "user-to-delete-id" } }, res);

    // The compensating pass (no session) still completes account deletion.
    expect(userMock.findByIdAndDelete).toHaveBeenCalledWith("user-to-delete-id");
    expect(userMock.findByIdAndDelete.mock.results[0].value.session).toHaveBeenCalledWith(null);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(txMock.endSession).toHaveBeenCalledTimes(1);
  });

  it("handles an account with no associated data (no sessions)", async () => {
    seedSuccessfulCascade();
    sessionMock.find.mockImplementation(() => chainQuery([]));
    userMock.findById.mockResolvedValueOnce({ _id: "bare-user" });

    const res = makeRes();
    await deleteUserAccount({ user: { _id: "bare-user" } }, res);

    expect(questionMock.deleteMany).not.toHaveBeenCalled();
    expect(userMock.findByIdAndDelete).toHaveBeenCalledWith("bare-user");
    expect(res.statusCode).toBe(200);
  });
});
