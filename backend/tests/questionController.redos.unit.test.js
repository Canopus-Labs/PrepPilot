import { Module } from "node:module";
import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";

// ---------------------------------------------------------------------------
// getMyQuestions — ReDoS-safe search handling (issue #1143).
//
// authController-style CommonJS modules load deps via require(), which vitest's
// vi.mock cannot intercept. We shim Node's module loader so the real mongoose
// models are never touched, then assert on the filter object that gets passed
// to Question.find().
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

// Mimics the mongoose Query methods getMyQuestions chains onto its models.
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

beforeAll(async () => {
  clearRequireCache();
  testDoubles.set("../models/Session", { find: sessionMock.find });
  testDoubles.set("../models/Question", {
    find: questionMock.find,
    countDocuments: questionMock.countDocuments,
  });

  const mod = await import("../controllers/questionController.js");
  getMyQuestions = mod.getMyQuestions;
});

beforeEach(() => {
  sessionMock.find.mockReset();
  questionMock.find.mockReset();
  questionMock.countDocuments.mockReset();
});

const makeReq = (query = {}) => ({ query, user: { _id: "u1" } });

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

const seed = () => {
  sessionMock.find.mockImplementation(() => chainable([{ _id: "s1" }]));
  questionMock.find.mockImplementation(() => chainable([]));
  questionMock.countDocuments.mockResolvedValue(0);
};

async function runAndGetSearchRegex(query) {
  seed();
  await getMyQuestions(makeReq(query), mockRes());
  const filter = questionMock.find.mock.calls[0][0];
  return filter.$or;
}

describe("getMyQuestions — regex-safe search term (issue #1143)", () => {
  it("escapes regex metacharacters so the query is a literal substring", async () => {
    const $or = await runAndGetSearchRegex({ q: "(a+)+$" });

    const source = $or[0].question.source;
    expect(source).toBe("\\(a\\+\\)\\+\\$");
  });

  it("does not contain nested quantifiers for crafted patterns", async () => {
    const $or = await runAndGetSearchRegex({
      q: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!",
    });

    expect($or[0].question.source).not.toMatch(/\(\S*\)\+/);
    expect($or[1].answer.source).toBe($or[0].question.source);
    expect($or[2].note.source).toBe($or[0].question.source);
  });

  it("caps the search term length to 200 characters", async () => {
    const $or = await runAndGetSearchRegex({ q: "x".repeat(5000) });

    expect($or[0].question.source.length).toBeLessThanOrEqual(200);
  });

  it("keeps matching case-insensitive", async () => {
    const $or = await runAndGetSearchRegex({ q: "HTTP/2" });

    expect($or[0].question.flags).toContain("i");
    expect($or[0].question.source).toBe("HTTP\\/2");
  });

  it("skips the regex when q is empty or whitespace only", async () => {
    expect(await runAndGetSearchRegex({ q: "   " })).toBeUndefined();
    expect(await runAndGetSearchRegex({})).toBeUndefined();
  });
});
