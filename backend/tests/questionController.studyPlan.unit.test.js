import { Module } from "node:module";
import { describe, it, expect, beforeAll, vi } from "vitest";

// ---------------------------------------------------------------------------
// buildStudyPlanHandler — request-boundary validation (issue #2319).
//
// questionController is CommonJS, so vi.mock cannot intercept its require()
// calls. Same pattern as questionController.redos.unit.test.js: shim Node's
// module loader so the mongoose models are never touched, then drive the
// handler with plain req/res doubles.
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

let buildStudyPlanHandler;

beforeAll(async () => {
  clearRequireCache();
  testDoubles.set("../models/Session", { find: vi.fn() });
  testDoubles.set("../models/Question", {
    find: vi.fn(),
    countDocuments: vi.fn(),
  });

  const mod = await import("../controllers/questionController.js");
  buildStudyPlanHandler = mod.buildStudyPlanHandler;
});

const makeReq = (body) => ({ body });

const mockRes = () => {
  // Express defaults to 200 when the handler calls res.json() without status().
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

const run = async (body) => {
  const res = mockRes();
  await buildStudyPlanHandler(makeReq(body), res);
  return res;
};

describe("buildStudyPlanHandler — malformed problems (issue #2319)", () => {
  it("rejects a null entry with its index", async () => {
    const res = await run({ problems: [null, { title: "Two Sum" }], days: 3 });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toContain("Invalid problem at index 0");
  });

  it("rejects a string entry", async () => {
    const res = await run({ problems: ["not a problem"], days: 3 });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("Invalid problem at index 0");
  });

  it("rejects an empty object (no usable title)", async () => {
    const res = await run({ problems: [{}], days: 3 });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("Invalid problem at index 0");
    expect(res.body.error).toContain("title");
  });

  it("rejects a blank title", async () => {
    const res = await run({ problems: [{ title: "   " }], days: 3 });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("Invalid problem at index 0");
  });

  it("rejects an oversized title (501 chars)", async () => {
    const res = await run({ problems: [{ title: "x".repeat(501) }], days: 3 });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("Invalid problem at index 0");
  });

  it("rejects a non-string difficulty", async () => {
    const res = await run({
      problems: [{ title: "Two Sum", difficulty: 5 }],
      days: 3,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("Invalid problem at index 0");
    expect(res.body.error).toContain("difficulty");
  });

  it("reports the index of the first bad entry, not just index 0", async () => {
    const res = await run({
      problems: [{ title: "Two Sum" }, null],
      days: 3,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("Invalid problem at index 1");
  });

  it("still rejects a bad days value", async () => {
    const res = await run({ problems: [{ title: "Two Sum" }], days: 0 });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe("buildStudyPlanHandler — valid requests (issue #2319)", () => {
  it("schedules every valid problem exactly once and counts omitted difficulty as medium", async () => {
    const problems = [
      { title: "Two Sum", difficulty: "easy" },
      { title: "Trapping Rain Water", difficulty: "hard" },
      { title: "No difficulty given" },
    ];
    const res = await run({ problems, days: 3 });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    const scheduled = res.body.plan.flatMap((day) => day.problems);
    expect(scheduled).toHaveLength(3);
    for (const problem of problems) {
      expect(
        scheduled.filter((entry) => entry.title === problem.title)
      ).toHaveLength(1);
    }

    // easy(1) + hard(3) + omitted-as-medium(2) = 6
    expect(res.body.totalLoad).toBe(6);
  });

  it("keeps scheduling unrecognized difficulty strings as medium", async () => {
    const res = await run({
      problems: [{ title: "Odd one", difficulty: "nightmare" }],
      days: 1,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.totalLoad).toBe(2);
  });
});
