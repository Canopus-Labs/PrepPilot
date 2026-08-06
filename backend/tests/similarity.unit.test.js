import { describe, it, expect } from "vitest";
import { tokenize, termFreq, idf, tfidf, cosineSim, computeSimilarity } from "../utils/similarity.js";

// ---------------------------------------------------------------------------
// similarity utility unit tests (issue #1306)
// Pure functions — no mocking needed.
// ---------------------------------------------------------------------------

describe("tokenize", () => {
  it("converts text to lowercase tokens", () => {
    expect(tokenize("Hello WORLD")).toEqual(["hello", "world"]);
  });

  it("removes punctuation", () => {
    expect(tokenize("Hello, world!")).toEqual(["hello", "world"]);
  });

  it("filters out single-character tokens", () => {
    expect(tokenize("a b c")).toEqual([]);
  });

  it("handles null/undefined input", () => {
    expect(tokenize(null)).toEqual([]);
    expect(tokenize(undefined)).toEqual([]);
  });

  it("handles numeric strings", () => {
    expect(tokenize("123 456")).toEqual(["123", "456"]);
  });
});

describe("termFreq", () => {
  it("computes normalized term frequencies", () => {
    const tf = termFreq(["a", "b", "a", "c", "a"]);
    expect(tf.a).toBeCloseTo(0.6);
    expect(tf.b).toBeCloseTo(0.2);
    expect(tf.c).toBeCloseTo(0.2);
  });

  it("handles empty input", () => {
    expect(termFreq([])).toEqual({});
  });
});

describe("idf", () => {
  it("assigns higher IDF to rare terms", () => {
    const docs = [
      { hello: 1, world: 1 },
      { hello: 1, foo: 1 },
      { hello: 1, bar: 1 },
    ];
    const vals = idf(docs);
    // "hello" appears in all 3 docs -> lower IDF
    // "world"/"foo"/"bar" appear in 1 doc each -> higher IDF
    expect(vals.hello).toBeLessThan(vals.world);
  });

  it("handles empty corpus", () => {
    expect(idf([])).toEqual({});
  });
});

describe("tfidf", () => {
  it("scales term frequency by IDF", () => {
    const tf = { hello: 0.5, world: 0.5 };
    const idfVals = { hello: 2, world: 1 };
    const vec = tfidf(tf, idfVals);
    expect(vec.hello).toBeCloseTo(1.0);
    expect(vec.world).toBeCloseTo(0.5);
  });

  it("handles missing IDF values", () => {
    const tf = { hello: 0.5 };
    const vec = tfidf(tf, {});
    expect(vec.hello).toBeCloseTo(0.5); // IDF defaults to 1
  });
});

describe("cosineSim", () => {
  it("returns 1 for identical vectors", () => {
    const v = { a: 1, b: 2 };
    expect(cosineSim(v, v)).toBeCloseTo(1.0);
  });

  it("returns 0 for orthogonal vectors", () => {
    expect(cosineSim({ a: 1 }, { b: 1 })).toBeCloseTo(0.0);
  });

  it("returns value between 0 and 1 for similar vectors", () => {
    const sim = cosineSim({ a: 1, b: 1 }, { a: 1, b: 0.5 });
    expect(sim).toBeGreaterThan(0);
    expect(sim).toBeLessThan(1);
  });

  it("handles zero vectors", () => {
    expect(cosineSim({}, {})).toBeCloseTo(0.0);
  });
});

describe("computeSimilarity", () => {
  it("throws when inputText is missing", () => {
    expect(() => computeSimilarity(null, [{ id: "1", text: "hello" }])).toThrow("inputText is required");
    expect(() => computeSimilarity("  ", [{ id: "1", text: "hello" }])).toThrow("inputText is required");
  });

  it("throws when corpus is not an array", () => {
    expect(() => computeSimilarity("hello", null)).toThrow("corpus must be an array");
  });

  it("returns empty array for empty corpus", () => {
    expect(computeSimilarity("hello", [])).toEqual([]);
  });

  it("returns similar questions sorted by descending similarity score", () => {
    const corpus = [
      { id: "q1", text: "What is a closure in JavaScript?" },
      { id: "q2", text: "How does the event loop work?" },
      { id: "q3", text: "Explain JavaScript closures and scope" },
    ];
    const results = computeSimilarity("What is a JavaScript closure?", corpus);
    expect(results.length).toBeLessThanOrEqual(3);
    // q3 is the best match (shares "closures" + "JavaScript")
    const q3 = results.find((r) => r.id === "q3");
    expect(q3).toBeDefined();
    expect(q3.similarityScore).toBeGreaterThan(0);
    // Results should be in descending order
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].similarityScore).toBeGreaterThanOrEqual(results[i].similarityScore);
    }
  });

  it("filters out near-identical self-matches", () => {
    const corpus = [
      { id: "q1", text: "What is a closure?" },
    ];
    const results = computeSimilarity("What is a closure?", corpus, { limit: 5 });
    expect(results.some((r) => r.id === "q1")).toBe(false);
  });

  it("respects the limit option", () => {
    const corpus = [
      { id: "q1", text: "What is a closure?" },
      { id: "q2", text: "What is a closure in JavaScript?" },
      { id: "q3", text: "Explain closures" },
      { id: "q4", text: "How do closures work?" },
    ];
    const results = computeSimilarity("What is a closure?", corpus, { limit: 2 });
    expect(results.length).toBeLessThanOrEqual(2);
  });

  it("returns similarity score rounded to 3 decimal places", () => {
    const corpus = [{ id: "q1", text: "hello world test" }];
    const results = computeSimilarity("hello world example", corpus);
    const score = results[0]?.similarityScore;
    expect(score).toBeDefined();
    // Score should be a number with at most 3 decimal places
    expect(String(score).split(".")[1]?.length || 0).toBeLessThanOrEqual(3);
  });
});
