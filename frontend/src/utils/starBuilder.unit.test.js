import { describe, it, expect } from "vitest";
import {
  countWords,
  countCharacters,
  getFieldTotals,
  buildStarMarkdown,
  makeAnswer,
  sortAnswersByUpdated,
  estimateReadTimeMinutes,
  starCompleteness,
} from "./starBuilder";

describe("countWords", () => {
  it("returns 0 for empty and whitespace-only strings", () => {
    expect(countWords("")).toBe(0);
    expect(countWords("   ")).toBe(0);
  });

  it("counts words split by whitespace", () => {
    expect(countWords("I led the design review")).toBe(5);
    expect(countWords("multi\nline   text")).toBe(3);
  });
});

describe("countCharacters", () => {
  it("returns the raw character length", () => {
    expect(countCharacters("hello")).toBe(5);
    expect(countCharacters("")).toBe(0);
  });
});

describe("getFieldTotals", () => {
  it("sums words and characters across all fields", () => {
    const totals = getFieldTotals({
      situation: "a b c",
      task: "d e",
      action: "f",
      result: "",
    });
    expect(totals.words).toBe(6);
    expect(totals.characters).toBe(8);
  });
});

describe("buildStarMarkdown", () => {
  it("emits a heading followed by filled sections only", () => {
    const md = buildStarMarkdown({
      question: "Tell me about a conflict",
      situation: "Two teams disagreed on scope.",
      task: "",
      action: "I scheduled a joint call.",
      result: "We shipped on time.",
    });
    expect(md).toContain("# Tell me about a conflict");
    expect(md).toContain("## Situation");
    expect(md).not.toContain("## Task");
    expect(md).toContain("## Result");
  });
});

describe("makeAnswer", () => {
  it("assigns an id, timestamps and computed word count", () => {
    const answer = makeAnswer({
      question: "Describe a failure",
      fields: { situation: "Missed a deadline.", task: "", action: "", result: "" },
    });
    expect(answer.id).toMatch(/^star-/);
    expect(answer.wordCount).toBe(3);
    expect(Number.isNaN(Date.parse(answer.createdAt))).toBe(false);
    expect(Number.isNaN(Date.parse(answer.updatedAt))).toBe(false);
  });
});

describe("sortAnswersByUpdated", () => {
  it("sorts answers newest-first without mutating the input", () => {
    const older = { updatedAt: "2024-01-01T00:00:00.000Z" };
    const newer = { updatedAt: "2025-01-01T00:00:00.000Z" };
    const input = [older, newer];
    const sorted = sortAnswersByUpdated(input);
    expect(sorted[0]).toBe(newer);
    expect(input).toEqual([older, newer]);
  });
});

describe("estimateReadTimeMinutes", () => {
  it("never returns less than 1 minute", () => {
    expect(estimateReadTimeMinutes(0)).toBe(1);
    expect(estimateReadTimeMinutes(300)).toBe(2);
  });
});

describe("starCompleteness", () => {
  it("reports how many of the four sections are filled", () => {
    const empty = starCompleteness({});
    expect(empty.filled).toBe(0);
    expect(empty.percent).toBe(0);

    const half = starCompleteness({
      situation: "x",
      task: "y",
      action: "",
      result: "",
    });
    expect(half.filled).toBe(2);
    expect(half.percent).toBe(50);
  });
});
