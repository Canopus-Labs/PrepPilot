import { describe, it, expect } from "vitest";

const {
  buildSolverPrompt,
  parseSolverOutput,
  extractSection,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
} = require("../utils/problemSolverParser.js");
const problemSolverSchema = require("../validation/problemSolverSchema.js");

const SAMPLE_OUTPUT = [
  "## Approach",
  "Use a hash map to track seen numbers while iterating.",
  "## Steps",
  "1. Initialize an empty map.",
  "2. For each number, check if the complement exists.",
  "## Complexity",
  "Time: O(n), Space: O(n).",
  "## Code",
  "```python",
  "def two_sum(nums, target):",
  "    seen = {}",
  "    for i, n in enumerate(nums):",
  "        if target - n in seen:",
  "            return [seen[target - n], i]",
  "        seen[n] = i",
  "```",
].join("\n");

describe("buildSolverPrompt", () => {
  it("includes the problem and defaults language to python", () => {
    const prompt = buildSolverPrompt({ problem: "Two Sum" });
    expect(prompt).toContain("Two Sum");
    expect(prompt).toMatch(/written in python/);
    expect(prompt).toContain("## Approach");
    expect(prompt).toContain("## Code");
  });

  it("uses the requested language and includes constraints", () => {
    const prompt = buildSolverPrompt({
      problem: "Two Sum",
      language: "javascript",
      constraints: "n <= 10^4",
    });
    expect(prompt).toMatch(/written in javascript/);
    expect(prompt).toContain("n <= 10^4");
  });

  it("falls back to python for unknown languages", () => {
    const prompt = buildSolverPrompt({ problem: "Two Sum", language: "cobol" });
    expect(prompt).toMatch(/written in python/);
  });
});

describe("parseSolverOutput", () => {
  it("extracts all four sections", () => {
    const result = parseSolverOutput(SAMPLE_OUTPUT);
    expect(result.ok).toBe(true);
    expect(result.sections.approach).toContain("hash map");
    expect(result.sections.steps).toContain("Initialize an empty map");
    expect(result.sections.complexity).toContain("O(n)");
    expect(result.sections.code).toContain("def two_sum");
  });

  it("keeps the code fence intact", () => {
    const result = parseSolverOutput(SAMPLE_OUTPUT);
    expect(result.sections.code).toMatch(/```python/);
    expect(result.sections.code).toMatch(/```\s*$/);
  });

  it("handles ### and bold-style headings", () => {
    const text = [
      "### **Approach**",
      "Brute force then optimize.",
      "### **Code**",
      "```py",
      "print(1)",
      "```",
    ].join("\n");
    const result = parseSolverOutput(text);
    expect(result.ok).toBe(true);
    expect(result.sections.approach).toContain("Brute force");
    expect(result.sections.code).toContain("print(1)");
  });

  it("returns ok=false and raw text when sections are missing", () => {
    const result = parseSolverOutput("Just some text without sections.");
    expect(result.ok).toBe(false);
    expect(result.raw).toBe("Just some text without sections.");
    expect(result.sections.approach).toBeUndefined();
  });

  it("handles empty and non-string input", () => {
    expect(parseSolverOutput("").ok).toBe(false);
    expect(parseSolverOutput(null).ok).toBe(false);
    expect(parseSolverOutput(undefined).ok).toBe(false);
  });

  it("stops a section at the next heading", () => {
    const steps = extractSection(SAMPLE_OUTPUT, "steps");
    expect(steps).toContain("Initialize an empty map");
    expect(steps).not.toContain("complexity");
  });
});

describe("problemSolverSchema", () => {
  it("accepts a valid payload and defaults language", () => {
    const parsed = problemSolverSchema.parse({
      problem: "Reverse a linked list",
    });
    expect(parsed.problem).toBe("Reverse a linked list");
    expect(parsed.language).toBe(DEFAULT_LANGUAGE);
    expect(parsed.constraints).toBe("");
  });

  it("accepts an allowed language", () => {
    expect(SUPPORTED_LANGUAGES).toContain("go");
    const parsed = problemSolverSchema.parse({ problem: "xyz", language: "go" });
    expect(parsed.language).toBe("go");
  });

  it("rejects a missing problem", () => {
    expect(() => problemSolverSchema.parse({})).toThrow(/Problem is required/);
  });

  it("rejects an empty problem", () => {
    expect(() => problemSolverSchema.parse({ problem: "" })).toThrow(
      /Problem is required/
    );
  });

  it("rejects a too-short problem", () => {
    expect(() => problemSolverSchema.parse({ problem: "ab" })).toThrow(
      /at least 3 characters/
    );
  });

  it("rejects an unsupported language", () => {
    expect(() => problemSolverSchema.parse({ problem: "x", language: "cobol" })).toThrow(
      /language must be one of/
    );
  });
});
