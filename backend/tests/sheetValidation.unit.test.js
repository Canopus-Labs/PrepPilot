import { describe, it, expect, vi, beforeAll } from "vitest";

const {
  normalizeSheet,
  normalizeSection,
  normalizeSubtopic,
  computeSheetStats,
} = require("../utils/sheetValidation.js");

function validSheet(overrides = {}) {
  return {
    id: "striver-sde",
    title: "Striver SDE Sheet",
    description: "The best sheet",
    category: "dsa",
    questions: 455,
    followers: 1200,
    sections: [
      {
        title: "Arrays",
        topics: [
          {
            title: "1D Arrays",
            subtopics: [
              { title: "Two Sum", difficulty: "Easy", status: "completed", links: { leetcode: "https://..." } },
              { title: "Max Subarray", difficulty: "Medium" },
            ],
          },
        ],
      },
    ],
    ...overrides,
  };
}

describe("normalizeSheet", () => {
  it("normalizes a valid sheet and drops unknown fields", () => {
    const { ok, errors, value } = normalizeSheet(
      validSheet({ junk: "field", questions: "455.7", followers: -5 })
    );
    expect(ok).toBe(true);
    expect(errors).toHaveLength(0);
    expect(value.id).toBe("striver-sde");
    expect(value.questions).toBe(456);
    expect(value.followers).toBe(0);
    expect(value.junk).toBeUndefined();
  });

  it("rejects a missing id", () => {
    const { ok, errors } = normalizeSheet(validSheet({ id: "" }));
    expect(ok).toBe(false);
    expect(errors.some((e) => e.includes("id is required"))).toBe(true);
  });

  it("rejects an id with invalid characters", () => {
    const { ok, errors } = normalizeSheet(validSheet({ id: "my sheet!" }));
    expect(ok).toBe(false);
    expect(errors.some((e) => e.includes("letters, digits"))).toBe(true);
  });

  it("rejects a missing title", () => {
    const { ok, errors } = normalizeSheet(validSheet({ title: "" }));
    expect(ok).toBe(false);
    expect(errors.some((e) => e.includes("title is required"))).toBe(true);
  });

  it("rejects an unknown category", () => {
    const { ok, errors } = normalizeSheet(validSheet({ category: "cat-herding" }));
    expect(ok).toBe(false);
    expect(errors.some((e) => e.includes("category"))).toBe(true);
  });

  it("falls back to 'general' for an empty category", () => {
    const { ok, value } = normalizeSheet(validSheet({ category: "" }));
    expect(ok).toBe(true);
    expect(value.category).toBe("general");
  });

  it("rejects non-object payloads", () => {
    expect(normalizeSheet(null).ok).toBe(false);
    expect(normalizeSheet("nope").ok).toBe(false);
    expect(normalizeSheet([1, 2]).ok).toBe(false);
  });
});

describe("nested normalization", () => {
  it("drops subtopics without a title", () => {
    const sub = normalizeSubtopic({ difficulty: "Easy" });
    expect(sub).toBeNull();
  });

  it("coerces difficulty and status to valid enums", () => {
    const sub = normalizeSubtopic({
      title: "Two Sum",
      difficulty: "Impossible",
      status: "maybe",
    });
    expect(sub.difficulty).toBe("Medium");
    expect(sub.status).toBe("not-started");
  });

  it("drops invalid sections and topics", () => {
    const section = normalizeSection({ title: "Arrays", completed: "bad", topics: [null, { title: "Valid" }] });
    expect(section.completed).toBe(0);
    expect(section.topics).toHaveLength(1);
    expect(section.topics[0].title).toBe("Valid");
  });
});

describe("computeSheetStats", () => {
  it("counts questions, sections and breaks down by difficulty/status", () => {
    const { ok, value } = normalizeSheet(validSheet());
    expect(ok).toBe(true);
    const stats = computeSheetStats(value);
    expect(stats.sections).toBe(1);
    expect(stats.questions).toBe(2);
    expect(stats.byDifficulty).toEqual({ Easy: 1, Medium: 1, Hard: 0 });
    expect(stats.byStatus).toEqual({ "not-started": 1, "in-progress": 0, completed: 1 });
  });
});

describe("sheet CRUD routes", () => {
  let router;

  beforeAll(async () => {
    const mod = await import("../routes/sheetJsonUpload.js");
    router = mod.default ?? mod;
  });

  function getLayerStack(method, path) {
    const layer = router.stack.find(
      (l) => l.route && l.route.path === path && l.route.methods[method.toLowerCase()]
    );
    if (!layer) return null;
    return layer.route.stack.map((s) => s.handle);
  }

  function isProtect(handler) {
    return typeof handler === "function" && handler.name === "protect";
  }

  it("registers POST /validate behind protect", () => {
    const stack = getLayerStack("POST", "/validate");
    expect(stack).toBeTruthy();
    expect(stack.some(isProtect)).toBe(true);
  });

  it("registers PUT /:id behind protect", () => {
    const stack = getLayerStack("PUT", "/:id");
    expect(stack).toBeTruthy();
    expect(stack.some(isProtect)).toBe(true);
  });

  it("registers DELETE /:id behind protect", () => {
    const stack = getLayerStack("DELETE", "/:id");
    expect(stack).toBeTruthy();
    expect(stack.some(isProtect)).toBe(true);
  });

  it("registers POST /upload behind protect", () => {
    const stack = getLayerStack("POST", "/upload");
    expect(stack).toBeTruthy();
    expect(stack.some(isProtect)).toBe(true);
  });

  it("keeps GET / and GET /:id public", () => {
    expect(getLayerStack("GET", "/").some(isProtect)).toBe(false);
    expect(getLayerStack("GET", "/:id").some(isProtect)).toBe(false);
  });

  it("places protect before the handler on PUT /:id", () => {
    const stack = getLayerStack("PUT", "/:id");
    const protectIndex = stack.findIndex(isProtect);
    expect(protectIndex).toBeGreaterThanOrEqual(0);
    expect(protectIndex).toBeLessThan(stack.length - 1);
  });
});
