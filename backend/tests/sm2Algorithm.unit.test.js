import { Module } from "node:module";
import { describe, it, expect } from "vitest";
import { calculateSM2 } from "../utils/sm2Algorithm.js";

const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  return originalLoad.call(this, request, parent, isMain);
};

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------
const msPerDay = (n) => n * 24 * 60 * 60 * 1000;

const dueToday = () => {
  const now = new Date();
  return new Date(now.getTime() + msPerDay(1)); // interval=1 => due tomorrow
};

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------
describe("SM-2 defaults", () => {
  it("returns sensible defaults when called with empty params", () => {
    const result = calculateSM2({}, "good");
    expect(result).toHaveProperty("interval");
    expect(result).toHaveProperty("repetition");
    expect(result).toHaveProperty("efactor");
    expect(result).toHaveProperty("dueDate");
    expect(typeof result.interval).toBe("number");
    expect(typeof result.repetition).toBe("number");
    expect(typeof result.efactor).toBe("number");
    expect(result.dueDate instanceof Date).toBe(true);
  });

  it("accepts 0 as initial values", () => {
    const result = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, "good");
    expect(result.interval).toBeGreaterThanOrEqual(1);
    expect(result.repetition).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// Rating: 'again' (score 1) — full reset
// ---------------------------------------------------------------------------
describe("SM-2 'again' rating", () => {
  it("resets repetition to 0 on 'again' regardless of prior repetition", () => {
    const result = calculateSM2({ interval: 10, repetition: 5, efactor: 2.5 }, "again");
    expect(result.repetition).toBe(0);
    expect(result.interval).toBe(1);
  });

  it("accepts numeric '1' as equivalent to 'again'", () => {
    const result = calculateSM2({ interval: 5, repetition: 3, efactor: 2.5 }, "1");
    expect(result.repetition).toBe(0);
    expect(result.interval).toBe(1);
  });

  it("sets efactor floor of 1.3 on repeated failures", () => {
    // After enough 'again' ratings, efactor should not drop below 1.3
    let state = { interval: 5, repetition: 3, efactor: 2.5 };
    for (let i = 0; i < 10; i++) {
      state = calculateSM2(state, "again");
    }
    expect(state.efactor).toBeGreaterThanOrEqual(1.3);
  });
});

// ---------------------------------------------------------------------------
// Rating: 'hard' (score 2) — partial reset
// ---------------------------------------------------------------------------
describe("SM-2 'hard' rating", () => {
  it("resets repetition to 1 when it was 0", () => {
    const result = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, "hard");
    expect(result.repetition).toBe(1);
    expect(result.interval).toBe(1);
  });

  it("keeps repetition but reduces interval when repetition > 1", () => {
    const result = calculateSM2({ interval: 10, repetition: 3, efactor: 2.5 }, "hard");
    expect(result.repetition).toBe(3);
    expect(result.interval).toBeLessThan(10);
    expect(result.interval).toBeGreaterThanOrEqual(1);
  });

  it("accepts numeric '2' as equivalent to 'hard'", () => {
    const result = calculateSM2({ interval: 5, repetition: 1, efactor: 2.5 }, "2");
    expect(result.repetition).toBe(1);
    expect(result.interval).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// Rating: 'good' / 'medium' (score 4) — standard progression
// ---------------------------------------------------------------------------
describe("SM-2 'good' / 'medium' rating", () => {
  it("sets interval=1 on first successful review (repetition=0)", () => {
    const result = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, "good");
    expect(result.interval).toBe(1);
    expect(result.repetition).toBe(1);
  });

  it("accepts 'medium' as equivalent to 'good'", () => {
    const result = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, "medium");
    expect(result.interval).toBe(1);
    expect(result.repetition).toBe(1);
  });

  it("sets interval=6 on second successful review", () => {
    const result = calculateSM2({ interval: 1, repetition: 1, efactor: 2.5 }, "good");
    expect(result.interval).toBe(6);
    expect(result.repetition).toBe(2);
  });

  it("grows interval multiplicatively on third+ review", () => {
    const result = calculateSM2({ interval: 6, repetition: 2, efactor: 2.5 }, "good");
    expect(result.interval).toBeGreaterThan(6);
    expect(result.repetition).toBe(3);
  });

  it("accepts numeric '3' as equivalent to 'good'", () => {
    const result = calculateSM2({ interval: 1, repetition: 1, efactor: 2.5 }, "3");
    expect(result.interval).toBe(6);
  });
});

// ---------------------------------------------------------------------------
// Rating: 'easy' (score 5) — accelerated progression
// ---------------------------------------------------------------------------
describe("SM-2 'easy' rating", () => {
  it("skips to interval=2 on first review", () => {
    const result = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, "easy");
    expect(result.interval).toBe(2);
    expect(result.repetition).toBe(1);
  });

  it("skips to interval=7 on second review", () => {
    const result = calculateSM2({ interval: 2, repetition: 1, efactor: 2.5 }, "easy");
    expect(result.interval).toBe(7);
    expect(result.repetition).toBe(2);
  });

  it("applies EF * 1.3 multiplier on third+ review", () => {
    const result = calculateSM2({ interval: 7, repetition: 2, efactor: 2.5 }, "easy");
    // multiplier = 2.5 * 1.3 = 3.25, interval = round(7 * 3.25) = 23
    expect(result.interval).toBe(23);
    expect(result.repetition).toBe(3);
  });

  it("accepts numeric '4' as equivalent to 'easy'", () => {
    const result = calculateSM2({ interval: 7, repetition: 2, efactor: 2.5 }, "4");
    expect(result.interval).toBe(23);
  });
});

// ---------------------------------------------------------------------------
// Easiness Factor updates
// ---------------------------------------------------------------------------
describe("SM-2 Easiness Factor (EF) updates", () => {
  it("increases EF on successful recall", () => {
    const result = calculateSM2({ interval: 1, repetition: 1, efactor: 2.5 }, "good");
    expect(result.efactor).toBeGreaterThan(2.5);
  });

  it("decreases EF on failed recall", () => {
    const result = calculateSM2({ interval: 5, repetition: 3, efactor: 2.5 }, "hard");
    expect(result.efactor).toBeLessThan(2.5);
  });

  it("enforces minimum EF of 1.3", () => {
    // Repeated failures should never drop EF below 1.3
    let state = { interval: 10, repetition: 5, efactor: 2.5 };
    for (let i = 0; i < 20; i++) {
      state = calculateSM2(state, "again");
    }
    expect(state.efactor).toBeGreaterThanOrEqual(1.3);
  });

  it("rounds EF to 2 decimal places", () => {
    const result = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, "good");
    const str = result.efactor.toString();
    const decimals = str.includes(".") ? str.split(".")[1].length : 0;
    expect(decimals).toBeLessThanOrEqual(2);
  });
});

// ---------------------------------------------------------------------------
// Due date
// ---------------------------------------------------------------------------
describe("SM-2 dueDate", () => {
  it("sets dueDate interval days in the future", () => {
    const before = new Date();
    const result = calculateSM2({ interval: 3, repetition: 1, efactor: 2.5 }, "good");
    const expectedMin = before.getTime() + msPerDay(3);
    const expectedMax = new Date().getTime() + msPerDay(4); // allow 1ms tolerance
    expect(result.dueDate.getTime()).toBeGreaterThanOrEqual(expectedMin);
    expect(result.dueDate.getTime()).toBeLessThanOrEqual(expectedMax);
  });

  it("dueDate is always a Date object", () => {
    const result = calculateSM2({ interval: 1, repetition: 0, efactor: 2.5 }, "easy");
    expect(result.dueDate instanceof Date).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------
describe("SM-2 edge cases", () => {
  it("handles negative initial efactor gracefully", () => {
    const result = calculateSM2({ interval: 1, repetition: 1, efactor: -0.5 }, "good");
    expect(result.efactor).toBeGreaterThanOrEqual(1.3);
  });

  it("handles string numeric ratings correctly", () => {
    const r1 = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, "1");
    const r2 = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, "2");
    const r3 = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, "3");
    const r4 = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, "4");
    expect(r1.interval).toBe(1); // again
    expect(r2.interval).toBe(1); // hard
    expect(r3.interval).toBe(1); // good/medium
    expect(r4.interval).toBe(2); // easy
  });

  it("unknown rating falls back to score=3 (good)", () => {
    const result = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, "unknown");
    expect(result.interval).toBe(1);
    expect(result.repetition).toBe(1);
  });
});
