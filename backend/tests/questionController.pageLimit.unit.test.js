import { Module } from "node:module";
import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";

// ---------------------------------------------------------------------------
// getMyQuestions — non-numeric page/limit must not 500 (issue #1145).
// The route-layer zod schema rejects malformed values with 400; the controller
// defensively coerces so NaN can never reach .skip()/.limit().
// ---------------------------------------------------------------------------

const sessionMock = vi.hoisted(() => ({ find: vi.fn() }));
const questionMock = vi.hoisted(() => ({ find: vi.fn(), countDocuments: vi.fn() }));

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
      key.includes("controllers\\questionController") ||
      key.includes("controllers/questionController") ||
      key.includes("models\\Session") ||
      key.includes("models/Session") ||
      key.includes("models\\Question") ||
      key.includes("models/Question")
    ) {
      delete require.cache[key];
    }
  });
};

const chainable = (value) => {
  const stub = {
    select: vi.fn().mockReturnThis(),
    sort: vi.fn().mockReturnThis(),
    skip: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    populate: vi.fn().mockReturnThis(),
    lean: vi.fn().mockResolvedValue(value),
  };
  return stub;
};

let getMyQuestions;
let validateGetMyQuestions;

beforeAll(async () => {
  clearRequireCache();
  testDoubles.set("../models/Session", { find: sessionMock.find });
  testDoubles.set("../models/Question", {
    find: questionMock.find,
    countDocuments: questionMock.countDocuments,
  });

  const ctrl = await import("../controllers/questionController.js");
  getMyQuestions = ctrl.getMyQuestions;

  const validators = await import("../Input_validators/ValidateQuestions.js");
  validateGetMyQuestions = validators.validateGetMyQuestions;
});

beforeEach(() => {
  sessionMock.find.mockReset();
  questionMock.find.mockReset();
  questionMock.countDocuments.mockReset();
});

const makeReq = (query = {}) => ({ query, user: { _id: "u1" } });

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

// Seeds a healthy controller call and returns the query stub for assertions.
const seed = () => {
  sessionMock.find.mockImplementation(() => chainable([{ _id: "s1" }]));
  const queryStub = chainable([]);
  questionMock.find.mockImplementation(() => queryStub);
  questionMock.countDocuments.mockResolvedValue(0);
  return queryStub;
};

// ---------------------------------------------------------------------------
// Route-layer validation: malformed page/limit → 400, valid → next()
// ---------------------------------------------------------------------------
describe("validateGetMyQuestions — route layer (issue #1145)", () => {
  it.each(["abc", "1e5!", "0", "-1", "1.5"])("rejects page=%s with 400", async (page) => {
    const res = mockRes();
    const next = vi.fn();
    validateGetMyQuestions(makeReq({ page }), res, next);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Validation failed");
    expect(next).not.toHaveBeenCalled();
  });

  it.each(["abc", "xyz", "0", "-1", "101", "1.5"])("rejects limit=%s with 400", async (limit) => {
    const res = mockRes();
    const next = vi.fn();
    validateGetMyQuestions(makeReq({ limit }), res, next);

    expect(res.statusCode).toBe(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("passes valid query params through to the handler", () => {
    const res = mockRes();
    const next = vi.fn();
    validateGetMyQuestions(makeReq({ page: "3", limit: "25", pinned: "true", q: "loops" }), res, next);

    expect(res.statusCode).toBe(200);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("passes when page/limit are absent (defaults handled by the controller)", () => {
    const res = mockRes();
    const next = vi.fn();
    validateGetMyQuestions(makeReq({}), res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// Controller layer: defensive coercion, no NaN into .skip()/.limit(), no 500
// ---------------------------------------------------------------------------
describe("getMyQuestions — controller defensive coercion (issue #1145)", () => {
  it("falls back to page=1 limit=20 for a non-numeric page (no 500)", async () => {
    const queryStub = seed();
    const res = mockRes();

    await getMyQuestions(makeReq({ page: "abc" }), res);

    expect(res.statusCode).toBe(200);
    expect(queryStub.skip).toHaveBeenCalledWith(0);
    expect(queryStub.limit).toHaveBeenCalledWith(20);
  });

  it("falls back to the default limit for a non-numeric limit (no 500)", async () => {
    const queryStub = seed();
    const res = mockRes();

    await getMyQuestions(makeReq({ page: "2", limit: "xyz" }), res);

    expect(res.statusCode).toBe(200);
    expect(queryStub.skip).toHaveBeenCalledWith(20);
    expect(queryStub.limit).toHaveBeenCalledWith(20);
  });

  it("never passes NaN to skip/limit for garbage values", async () => {
    const queryStub = seed();
    const res = mockRes();

    await getMyQuestions(makeReq({ page: "1e5!", limit: "10x" }), res);

    const skipArg = queryStub.skip.mock.calls[0][0];
    const limitArg = queryStub.limit.mock.calls[0][0];
    expect(Number.isNaN(skipArg)).toBe(false);
    expect(Number.isNaN(limitArg)).toBe(false);
  });

  it("clamps an oversized limit to 100", async () => {
    const queryStub = seed();
    const res = mockRes();

    await getMyQuestions(makeReq({ limit: "5000" }), res);

    expect(queryStub.limit).toHaveBeenCalledWith(100);
  });
});
