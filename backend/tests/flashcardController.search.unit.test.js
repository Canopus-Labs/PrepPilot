import { Module } from "node:module";
import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";

// ---------------------------------------------------------------------------
// getUserFlashcards — Keyword search (q) unit tests (issue #2292).
// CommonJS dependency shim pattern matching existing controller test suites.
// ---------------------------------------------------------------------------

const flashcardMock = vi.hoisted(() => ({
  find: vi.fn(),
}));

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
      key.includes("controllers\\flashcardController") ||
      key.includes("controllers/flashcardController") ||
      key.includes("models\\Flashcard") ||
      key.includes("models/Flashcard")
    ) {
      delete require.cache[key];
    }
  });
};

const chainable = (value) => ({
  sort: vi.fn().mockResolvedValue(value),
});

let getUserFlashcards;

beforeAll(async () => {
  clearRequireCache();
  testDoubles.set("../models/Flashcard", flashcardMock);

  const mod = await import("../controllers/flashcardController.js");
  getUserFlashcards = mod.getUserFlashcards;
});

beforeEach(() => {
  flashcardMock.find.mockReset();
});

const makeReq = (query = {}, userId = "user123") => ({ query, user: { _id: userId } });

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

describe("getUserFlashcards — keyword search q (issue #2292)", () => {
  it("queries by userId only when q, due, and category are omitted", async () => {
    flashcardMock.find.mockReturnValue(chainable([{ _id: "card1" }]));
    const res = mockRes();

    await getUserFlashcards(makeReq({}), res);

    const queryArg = flashcardMock.find.mock.calls[0][0];
    expect(queryArg).toEqual({ userId: "user123" });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(1);
  });

  it("applies due filter when due=true", async () => {
    flashcardMock.find.mockReturnValue(chainable([]));

    await getUserFlashcards(makeReq({ due: "true" }), mockRes());

    const queryArg = flashcardMock.find.mock.calls[0][0];
    expect(queryArg.userId).toBe("user123");
    expect(queryArg.dueDate).toHaveProperty("$lte");
    expect(queryArg.$or).toBeUndefined();
  });

  it("applies category filter when category is provided", async () => {
    flashcardMock.find.mockReturnValue(chainable([]));

    await getUserFlashcards(makeReq({ category: "DSA" }), mockRes());

    const queryArg = flashcardMock.find.mock.calls[0][0];
    expect(queryArg.userId).toBe("user123");
    expect(queryArg.category).toBe("DSA");
    expect(queryArg.$or).toBeUndefined();
  });

  it("constructs case-insensitive $or search across question and answer when q is supplied", async () => {
    flashcardMock.find.mockReturnValue(chainable([]));

    await getUserFlashcards(makeReq({ q: "recursion" }), mockRes());

    const queryArg = flashcardMock.find.mock.calls[0][0];
    expect(queryArg.userId).toBe("user123");
    expect(queryArg.$or).toBeDefined();
    expect(queryArg.$or).toHaveLength(2);
    expect(queryArg.$or[0].question.source).toBe("recursion");
    expect(queryArg.$or[0].question.flags).toContain("i");
    expect(queryArg.$or[1].answer.source).toBe("recursion");
    expect(queryArg.$or[1].answer.flags).toContain("i");
  });

  it("combines due + category + q simultaneously", async () => {
    flashcardMock.find.mockReturnValue(chainable([]));

    await getUserFlashcards(makeReq({ due: "true", category: "DSA", q: "binary search" }), mockRes());

    const queryArg = flashcardMock.find.mock.calls[0][0];
    expect(queryArg.userId).toBe("user123");
    expect(queryArg.dueDate).toHaveProperty("$lte");
    expect(queryArg.category).toBe("DSA");
    expect(queryArg.$or).toBeDefined();
    expect(queryArg.$or[0].question.source).toBe("binary search");
    expect(queryArg.$or[1].answer.source).toBe("binary search");
  });

  it("escapes regex metacharacters in q for safety (C++, ReDoS)", async () => {
    flashcardMock.find.mockReturnValue(chainable([]));

    await getUserFlashcards(makeReq({ q: "C++ (a+)+$" }), mockRes());

    const queryArg = flashcardMock.find.mock.calls[0][0];
    expect(queryArg.$or[0].question.source).toBe("C\\+\\+ \\(a\\+\\)\\+\\$");
  });

  it("truncates search term q to 200 characters", async () => {
    flashcardMock.find.mockReturnValue(chainable([]));

    const longQuery = "a".repeat(500);
    await getUserFlashcards(makeReq({ q: longQuery }), mockRes());

    const queryArg = flashcardMock.find.mock.calls[0][0];
    expect(queryArg.$or[0].question.source.length).toBeLessThanOrEqual(200);
  });

  it("omits $or query when q is empty or whitespace only", async () => {
    flashcardMock.find.mockReturnValue(chainable([]));

    await getUserFlashcards(makeReq({ q: "   " }), mockRes());
    expect(flashcardMock.find.mock.calls[0][0].$or).toBeUndefined();

    flashcardMock.find.mockReset();
    await getUserFlashcards(makeReq({ q: "" }), mockRes());
    expect(flashcardMock.find.mock.calls[0][0].$or).toBeUndefined();
  });

  it("preserves strict userId ownership when $or is present", async () => {
    flashcardMock.find.mockReturnValue(chainable([]));

    await getUserFlashcards(makeReq({ q: "secret" }, "user999"), mockRes());

    const queryArg = flashcardMock.find.mock.calls[0][0];
    expect(queryArg.userId).toBe("user999");
  });
});
