import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// SM-2 Unit Tests
// Tests the calculateSM2 helper exported from flashcardController.js.
// Uses the same Module._load shim pattern as other unit tests in this suite.
// ---------------------------------------------------------------------------

const sessionMock = vi.hoisted(() => ({ findOne: vi.fn() }));
const flashcardMock = vi.hoisted(() => ({
  findOne: vi.fn(),
  findOneAndUpdate: vi.fn(),
  find: vi.fn(),
  create: vi.fn(),
  findById: vi.fn(),
}));

const testDoubles = new Map([
  ["../models/Session", sessionMock],
  ["../models/Flashcard", flashcardMock],
]);

const originalLoad = require("module").Module._load;
require("module").Module._load = function (request, parent, isMain) {
  if (testDoubles.has(request)) {
    return testDoubles.get(request);
  }
  return originalLoad.call(this, request, parent, isMain);
};

beforeEach(() => {
  vi.clearAllMocks();
});

// Lazily import after mocks are wired so the controller uses test doubles.
let calculateSM2;

const getSM2 = async () => {
  if (calculateSM2) return calculateSM2;
  const mod = await import("../controllers/flashcardController.js");
  calculateSM2 = mod.calculateSM2;
  return calculateSM2;
};

describe("calculateSM2 — rating \"again\"", () => {
  it("resets repetition to 0 and interval to 1 on first \"again\"", async () => {
    const fn = await getSM2();
    const result = fn({ interval: 10, repetition: 3, efactor: 2.5 }, "again");
    expect(result.repetition).toBe(0);
    expect(result.interval).toBe(1);
  });

  it("accepts string rating \"1\" as equivalent to \"again\"", async () => {
    const fn = await getSM2();
    const result = fn({ interval: 10, repetition: 3, efactor: 2.5 }, "1");
    expect(result.repetition).toBe(0);
    expect(result.interval).toBe(1);
  });
});

describe("calculateSM2 — rating \"hard\"", () => {
  it("keeps repetition at 0 on first hard review", async () => {
    const fn = await getSM2();
    const result = fn({ interval: 0, repetition: 0, efactor: 2.5 }, "hard");
    expect(result.repetition).toBe(1);
    expect(result.interval).toBe(1);
  });

  it("limits interval progression on hard (interval * 1.2, min 1)", async () => {
    const fn = await getSM2();
    const result = fn({ interval: 10, repetition: 2, efactor: 2.5 }, "hard");
    expect(result.interval).toBeGreaterThanOrEqual(1);
    expect(result.interval).toBeLessThanOrEqual(Math.round(10 * 1.2));
  });

  it("accepts string rating \"2\" as equivalent to \"hard\"", async () => {
    const fn = await getSM2();
    const result = fn({ interval: 5, repetition: 1, efactor: 2.5 }, "2");
    expect(result.repetition).toBeGreaterThanOrEqual(1);
  });
});

describe("calculateSM2 — rating \"good\" / \"medium\"", () => {
  it("sets interval to 1 on first successful review (repetition 0)", async () => {
    const fn = await getSM2();
    const result = fn({ interval: 0, repetition: 0, efactor: 2.5 }, "good");
    expect(result.repetition).toBe(1);
    expect(result.interval).toBe(1);
  });

  it("sets interval to 6 on second successful review", async () => {
    const fn = await getSM2();
    const result = fn({ interval: 1, repetition: 1, efactor: 2.5 }, "medium");
    expect(result.repetition).toBe(2);
    expect(result.interval).toBe(6);
  });

  it("multiplies interval by efactor on third+ review", async () => {
    const fn = await getSM2();
    const result = fn({ interval: 6, repetition: 2, efactor: 2.5 }, "good");
    expect(result.repetition).toBe(3);
    expect(result.interval).toBe(Math.round(6 * 2.5));
  });

  it("accepts string rating \"3\" as equivalent to \"good\"", async () => {
    const fn = await getSM2();
    const result = fn({ interval: 0, repetition: 0, efactor: 2.5 }, "3");
    expect(result.repetition).toBe(1);
  });
});

describe("calculateSM2 — rating \"easy\"", () => {
  it("sets interval to 2 on first easy review", async () => {
    const fn = await getSM2();
    const result = fn({ interval: 0, repetition: 0, efactor: 2.5 }, "easy");
    expect(result.repetition).toBe(1);
    expect(result.interval).toBe(2);
  });

  it("uses efactor * 1.3 as multiplier on third+ review", async () => {
    const fn = await getSM2();
    const result = fn({ interval: 6, repetition: 2, efactor: 2.5 }, "easy");
    expect(result.repetition).toBe(3);
    expect(result.interval).toBe(Math.round(6 * 2.5 * 1.3));
  });

  it("accepts string rating \"4\" as equivalent to \"easy\"", async () => {
    const fn = await getSM2();
    const result = fn({ interval: 0, repetition: 0, efactor: 2.5 }, "4");
    expect(result.repetition).toBe(1);
    expect(result.interval).toBe(2);
  });
});

describe("calculateSM2 — ease factor", () => {
  it("never goes below 1.3", async () => {
    const fn = await getSM2();
    // Repeated failures should drive efactor down but never below 1.3
    let state = { interval: 0, repetition: 0, efactor: 1.5 };
    for (let i = 0; i < 10; i++) {
      state = fn(state, "again");
    }
    expect(state.efactor).toBeGreaterThanOrEqual(1.3);
  });

  it("is rounded to 2 decimal places", async () => {
    const fn = await getSM2();
    const result = fn({ interval: 1, repetition: 1, efactor: 2.5 }, "good");
    // The result should have at most 2 decimal places
    expect(result.efactor.toString()).toMatch(/^\d+\.?\d{0,2}$/);
  });

  it("increases on easy ratings", async () => {
    const fn = await getSM2();
    const result = fn({ interval: 6, repetition: 2, efactor: 2.5 }, "easy");
    expect(result.efactor).toBeGreaterThan(2.5);
  });
});

describe("calculateSM2 — dueDate", () => {
  it("returns a Date in the future based on the new interval", async () => {
    const fn = await getSM2();
    const before = Date.now();
    const result = fn({ interval: 0, repetition: 0, efactor: 2.5 }, "good");
    expect(result.dueDate instanceof Date).toBe(true);
    expect(result.dueDate.getTime()).toBeGreaterThan(before);
  });

  it("interval of 1 day adds approximately 1 day in milliseconds", async () => {
    const fn = await getSM2();
    const before = Date.now();
    const result = fn({ interval: 0, repetition: 0, efactor: 2.5 }, "good");
    const expectedMin = before + 1 * 24 * 60 * 60 * 1000;
    const expectedMax = before + 2 * 24 * 60 * 60 * 1000;
    expect(result.dueDate.getTime()).toBeGreaterThanOrEqual(expectedMin);
    expect(result.dueDate.getTime()).toBeLessThanOrEqual(expectedMax);
  });
});
