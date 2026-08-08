import { Module } from "node:module";
import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";

// ---------------------------------------------------------------------------
// aiController.js is CommonJS and loads its deps via require(), which vitest's
// vi.mock cannot intercept. We shim Node's module loader so the real
// geminiHelper and the Session/Question models are never touched.
//
// Covers issue #1628: object-form Gemini responses ({ "questions": [...] })
// must be normalized so the response always carries a `question` key.
// ---------------------------------------------------------------------------

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
      key.includes("controllers\\aiController") ||
      key.includes("controllers/aiController") ||
      key.includes("utils\\geminiHelper") ||
      key.includes("utils/geminiHelper") ||
      key.includes("models\\Session") ||
      key.includes("models/Session") ||
      key.includes("models\\Question") ||
      key.includes("models/Question")
    ) {
      delete require.cache[key];
    }
  });
};

const generateWithFallback = vi.fn();
const SessionFind = vi.fn();
const QuestionFind = vi.fn();

let generateInterviewQuestions;

beforeAll(async () => {
  clearRequireCache();
  testDoubles.set("../utils/geminiHelper", {
    generateWithFallback,
    generateChatWithFallback: vi.fn(),
    DEFAULT_CANDIDATE_MODELS: [],
  });
  testDoubles.set("../models/Session", { find: SessionFind });
  testDoubles.set("../models/Question", { find: QuestionFind });

  const mod = await import("../controllers/aiController.js");
  generateInterviewQuestions = mod.generateInterviewQuestions;
});

beforeEach(() => {
  generateWithFallback.mockReset();
  SessionFind.mockReset();
  QuestionFind.mockReset();
  // Mongoose `.find()` returns a chainable Query; `.select()` resolves with the docs.
  SessionFind.mockReturnValue({ select: vi.fn().mockResolvedValue([]) });
  QuestionFind.mockReturnValue({ select: vi.fn().mockResolvedValue([]) });
});

const makeReq = () => ({
  body: { role: "Frontend Developer", experience: "2", topicsToFocus: ["React"], numberOfQuestions: 3 },
  user: { _id: "507f1f77bcf86cd799439011" },
});

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

const QS = [{ question: "q1?", answer: "a1" }];

describe('generateInterviewQuestions — object-form Gemini response (issue #1628)', () => {
  it('normalizes { questions: [...] } into a `question` key', async () => {
    generateWithFallback.mockResolvedValue({
      result: { response: { text: () => JSON.stringify({ questions: QS }) } },
      usedModel: "models/gemini-2.5-flash",
    });

    const res = makeRes();
    await generateInterviewQuestions(makeReq(), res);

    expect(res.status).toHaveBeenCalledWith(200);
    const sent = res.json.mock.calls[0][0];
    expect(sent.model).toBe("models/gemini-2.5-flash");
    expect(Array.isArray(sent.question)).toBe(true);
    expect(sent.question).toEqual(QS);
  });

  it('still passes a bare array through with a `question` key', async () => {
    generateWithFallback.mockResolvedValue({
      result: { response: { text: () => JSON.stringify(QS) } },
      usedModel: "models/gemini-2.5-flash",
    });

    const res = makeRes();
    await generateInterviewQuestions(makeReq(), res);

    expect(res.status).toHaveBeenCalledWith(200);
    const sent = res.json.mock.calls[0][0];
    expect(Array.isArray(sent.question)).toBe(true);
    expect(sent.question).toEqual(QS);
  });

  it('rejects an object without a questions array', async () => {
    generateWithFallback.mockResolvedValue({
      result: { response: { text: () => JSON.stringify({ title: "no list here" }) } },
      usedModel: "models/gemini-2.5-flash",
    });

    const res = makeRes();
    await generateInterviewQuestions(makeReq(), res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json.mock.calls[0][0].message).toBe("Invalid AI response format");
  });
});
