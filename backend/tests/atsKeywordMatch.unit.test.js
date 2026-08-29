import { describe, it, expect } from "vitest";
import {
  extractKeywords,
  matchResumeKeywords,
} from "../utils/atsKeywordMatch.js";

// ---------------------------------------------------------------------------
// atsKeywordMatch unit tests.
// Covers extractKeywords tokenization and matchResumeKeywords scoring.
// ---------------------------------------------------------------------------

describe("extractKeywords", () => {
  it("lowercases and dedupes", () => {
    expect(extractKeywords("React react REACT")).toEqual(["react"]);
  });

  it("removes stopwords", () => {
    expect(extractKeywords("the and or with")).toEqual([]);
  });

  it("drops tokens shorter than 2 chars", () => {
    expect(extractKeywords("a x go")).toEqual(["go"]);
  });

  it("preserves c++, c#, node.js as single tokens", () => {
    expect(extractKeywords("C++ C# Node.js")).toEqual(["c++", "c#", "node.js"]);
  });

  it("strips surrounding punctuation but keeps first-seen order", () => {
    expect(extractKeywords("React, Node; MongoDB.")).toEqual([
      "react",
      "node",
      "mongodb",
    ]);
  });

  it("returns [] for non-string or empty input", () => {
    expect(extractKeywords(null)).toEqual([]);
    expect(extractKeywords(123)).toEqual([]);
    expect(extractKeywords("")).toEqual([]);
  });
});

describe("matchResumeKeywords", () => {
  it("scores 100 with full overlap and no missing keywords", () => {
    const r = matchResumeKeywords("React Node MongoDB", "React Node MongoDB");
    expect(r.score).toBe(100);
    expect(r.missing).toEqual([]);
    expect(r.totalKeywords).toBe(3);
  });

  it("scores partial overlap and lists matched + missing", () => {
    const r = matchResumeKeywords("React Node", "React Node GraphQL AWS");
    expect(r.score).toBe(50);
    expect(r.matched).toEqual(["react", "node"]);
    expect(r.missing).toEqual(["graphql", "aws"]);
    expect(r.totalKeywords).toBe(4);
  });

  it("scores 0 with no overlap", () => {
    const r = matchResumeKeywords("Python Django", "React Node");
    expect(r.score).toBe(0);
    expect(r.matched).toEqual([]);
  });

  it("returns a zeroed result for an empty job description", () => {
    expect(matchResumeKeywords("React Node", "")).toEqual({
      score: 0,
      matched: [],
      missing: [],
      totalKeywords: 0,
    });
  });

  it("handles non-string inputs gracefully", () => {
    const zero = { score: 0, matched: [], missing: [], totalKeywords: 0 };
    expect(matchResumeKeywords(null, undefined)).toEqual(zero);
    expect(matchResumeKeywords(123, 456)).toEqual(zero);
  });

  it("does not let stopwords inflate totalKeywords", () => {
    const r = matchResumeKeywords("React", "the React and Node");
    expect(r.totalKeywords).toBe(2);
  });
});
