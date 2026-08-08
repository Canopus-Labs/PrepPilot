import { Module } from "node:module";
import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";

// ---------------------------------------------------------------------------
// createSession transaction fix (issue #1442): the 201 response must be sent
// only after the transaction commits, and validation failures must return 4xx
// from the outer handler instead of `return res...` inside the withTransaction
// callback (which would resolve it and commit).
//
// sessionController.js is CommonJS, so we shim Node's module loader (same
// pattern as registerEnumeration.unit.test.js).
// ---------------------------------------------------------------------------

const sessionMock = vi.hoisted(() => ({
  countDocuments: vi.fn(),
  create: vi.fn(),
}));
const questionMock = vi.hoisted(() => ({ insertMany: vi.fn() }));
const mongooseMock = vi.hoisted(() => ({ startSession: vi.fn() }));

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
      key.includes("controllers\\sessionController") ||
      key.includes("controllers/sessionController")
    ) {
      delete require.cache[key];
    }
  });
};

let createSession;
let currentSession;

const makeSessionObj = () => ({
  withTransaction: vi.fn(async (cb) => cb()),
  endSession: vi.fn(async () => {}),
});

beforeAll(async () => {
  clearRequireCache();
  testDoubles.set("mongoose", mongooseMock);
  testDoubles.set("../models/Session", sessionMock);
  testDoubles.set("../models/Question", questionMock);

  const mod = await import("../controllers/sessionController.js");
  createSession = mod.createSession;
});

beforeEach(() => {
  sessionMock.countDocuments.mockReset();
  sessionMock.create.mockReset();
  questionMock.insertMany.mockReset();
  mongooseMock.startSession.mockReset();
  currentSession = makeSessionObj();
  mongooseMock.startSession.mockImplementation(async () => currentSession);
});

const mockRes = () => {
  const res = { statusCode: 200, body: null };
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

const req = (overrides = {}) => ({
  user: { _id: "user-1" },
  body: { role: "Backend Engineer", experience: "3", topicsToFocus: [], description: "" },
  ...overrides,
});

describe("createSession — transaction boundary", () => {
  it("returns 400 for a missing role without starting a transaction", async () => {
    const res = mockRes();
    await createSession(req({ body: { role: "   ", experience: "3" } }), res);

    expect(res.statusCode).toBe(400);
    expect(mongooseMock.startSession).not.toHaveBeenCalled();
  });

  it("returns 400 for a non-numeric experience", async () => {
    const res = mockRes();
    await createSession(req({ body: { role: "Engineer", experience: "abc" } }), res);

    expect(res.statusCode).toBe(400);
    expect(mongooseMock.startSession).not.toHaveBeenCalled();
  });

  it("returns 400 when the session limit is reached without starting a transaction", async () => {
    sessionMock.countDocuments.mockResolvedValue(50);

    const res = mockRes();
    await createSession(req(), res);

    expect(res.statusCode).toBe(400);
    expect(mongooseMock.startSession).not.toHaveBeenCalled();
  });

  it("does not emit 201 when the transaction commit fails", async () => {
    sessionMock.countDocuments.mockResolvedValue(0);
    currentSession.withTransaction.mockRejectedValueOnce(new Error("commit failed"));

    const res = mockRes();
    await createSession(req(), res);

    expect(res.statusCode).toBe(500);
    expect(res.statusCode).not.toBe(201);
    expect(currentSession.endSession).toHaveBeenCalled();
  });

  it("emits 201 with the created session only after the transaction commits", async () => {
    sessionMock.countDocuments.mockResolvedValue(0);
    const createdSession = {
      _id: "s1",
      role: "Backend Engineer",
      questions: [],
      save: vi.fn(async function () {
        return this;
      }),
    };
    sessionMock.create.mockResolvedValue([createdSession]);
    questionMock.insertMany.mockResolvedValue([]);

    const res = mockRes();
    await createSession(req(), res);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.session).toBe(createdSession);
    expect(currentSession.endSession).toHaveBeenCalled();
  });
});
