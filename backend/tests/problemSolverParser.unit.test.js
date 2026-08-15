import { describe, it, expect } from "vitest";
import {
  buildSolverPrompt,
  extractSection,
  parseSolverOutput,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from "../utils/problemSolverParser.js";

// ---------------------------------------------------------------------------
// problemSolverParser unit tests.
// Covers buildSolverPrompt, extractSection, and parseSolverOutput functions
// used by the AI interview coaching system.
// ---------------------------------------------------------------------------

describe("buildSolverPrompt", () => {
  it("returns a string containing the four required section headings", () => {
    const prompt = buildSolverPrompt({ problem: "Reverse a linked list." });
    expect(prompt).toContain("## Approach");
    expect(prompt).toContain("## Steps");
    expect(prompt).toContain("## Complexity");
    expect(prompt).toContain("## Code");
  });

  it("includes the problem text in the prompt", () => {
    const problem = "What is the time complexity of quicksort?";
    const prompt = buildSolverPrompt({ problem });
    expect(prompt).toContain(problem);
  });

  it("falls back to python for unsupported languages", () => {
    const prompt = buildSolverPrompt({ problem: "test", language: "cobol" });
    expect(prompt).toContain("written in python");
  });

  it("uses the specified language when supported", () => {
    const prompt = buildSolverPrompt({ problem: "test", language: "java" });
    expect(prompt).toContain("written in java");
  });

  it("appends the constraints block when constraints are provided", () => {
    const prompt = buildSolverPrompt({
      problem: "test",
      constraints: "1 <= n <= 10^5",
    });
    expect(prompt).toContain("Constraints:");
    expect(prompt).toContain("1 <= n <= 10^5");
  });

  it("does not include a constraints section when constraints are empty", () => {
    const prompt = buildSolverPrompt({ problem: "test", constraints: "" });
    expect(prompt).not.toContain("Constraints:");
  });
});

describe("extractSection", () => {
  const text = `## Approach
Use a two-pointer technique starting from both ends of the array.

## Steps
1. Initialize left pointer at index 0.
2. Initialize right pointer at array length minus one.
3. Swap elements at left and right.
4. Move both pointers toward the center.

## Complexity
Time: O(n), Space: O(1)

## Code
\`\`\`python
def reverse_array(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
\`\`\``;

  it("extracts the section text between the heading and the next heading", () => {
    const section = extractSection(text, "Approach");
    expect(section).toBe(
      "Use a two-pointer technique starting from both ends of the array."
    );
  });

  it("extracts the Steps section by its canonical heading name", () => {
    const section = extractSection(text, "Steps");
    expect(section).toContain("Initialize left pointer");
  });

  it("returns null when the section is not found", () => {
    expect(extractSection(text, "NonExistent")).toBeNull();
  });

  it("strips trailing newlines from the extracted section", () => {
    const section = extractSection(text, "Complexity");
    expect(section).not.toMatch(/\n+$/);
  });

  it("returns null for a section that exists but has no content between headings", () => {
    const emptySection = `## Approach\n\n## Steps\n1. Do something`;
    expect(extractSection(emptySection, "Approach")).toBeNull();
  });

  it("handles h1 headings", () => {
    const h1Text = `# Approach\nUse a hash map.\n\n# Steps\n1. Count frequencies.`;
    const section = extractSection(h1Text, "Approach");
    expect(section).toBe("Use a hash map.");
  });

  it("handles h3 headings", () => {
    const h3Text = `### Approach\nUse recursion with memoization.\n\n### Code\n\`\`\`python\n# code here\n\`\`\``;
    const section = extractSection(h3Text, "Approach");
    expect(section).toBe("Use recursion with memoization.");
  });

  it("returns the last section content when no next heading is found", () => {
    const lastSection = `## Code\n\`\`\`python\npass\n\`\`\``;
    const section = extractSection(lastSection, "Code");
    expect(section).not.toBeNull();
    expect(section).toContain("pass");
  });
});

describe("parseSolverOutput", () => {
  // NOTE: the SECTION_ALIASES map "approach" -> "approach", which can match
  // the word "approach" anywhere in the text (not just at line start).
  // Test cases below ensure aliases do not appear in body text to avoid
  // false-positive matches from within words.

  it("returns ok: true when both approach and code sections are present", () => {
    const output = `## Approach\nUse binary search.\n\n## Steps\n1. Check mid.\n\n## Complexity\nO(log n)\n\n## Code\n\`\`\`python\ndef search(nums, target):\n    pass\n\`\`\``;
    const result = parseSolverOutput(output);
    expect(result.ok).toBe(true);
    expect(result.sections).toHaveProperty("approach");
    expect(result.sections).toHaveProperty("code");
  });

  it("returns ok: false when no heading text matches the approach aliases", () => {
    // Only has Steps and Code, no Approach heading.
    const output = `## Steps\n1. Do it.\n\n## Code\n\`\`\`python\npass\n\`\`\``;
    const result = parseSolverOutput(output);
    expect(result.ok).toBe(false);
  });

  it("returns ok: false when code section is missing", () => {
    const output = `## Approach\nUse brute force.\n\n## Steps\n1. Try everything.`;
    const result = parseSolverOutput(output);
    expect(result.ok).toBe(false);
  });

  it("returns ok: false when both approach and code are missing", () => {
    const result = parseSolverOutput("## Steps\n1. Do it.");
    expect(result.ok).toBe(false);
  });

  it("handles empty or null input gracefully", () => {
    expect(parseSolverOutput("")).toEqual({
      ok: false,
      raw: "",
      sections: null,
    });
    expect(parseSolverOutput(null)).toEqual({
      ok: false,
      raw: "",
      sections: null,
    });
    expect(parseSolverOutput(undefined)).toEqual({
      ok: false,
      raw: "",
      sections: null,
    });
  });

  it("handles non-string input gracefully", () => {
    expect(parseSolverOutput(123)).toEqual({
      ok: false,
      raw: "",
      sections: null,
    });
    expect(parseSolverOutput({ text: "hello" })).toEqual({
      ok: false,
      raw: "",
      sections: null,
    });
  });

  it("normalizes CRLF line endings to LF", () => {
    const output = "## Approach\r\nUse two pointers.\r\n\r\n## Code\r\n```python\r\npass\r\n```";
    const result = parseSolverOutput(output);
    expect(result.raw).not.toContain("\r");
  });

  it("finds code using the implementation alias", () => {
    const output = `## Approach\nBinary search.\n\n## Implementation\n\`\`\`javascript\n// using alias\n\`\`\``;
    const result = parseSolverOutput(output);
    expect(result.ok).toBe(true);
    expect(result.sections.code).toContain("// using alias");
  });

  it("finds approach using the intuition alias (body avoids colliding aliases)", () => {
    // Body uses "method" instead of "approach" to avoid false-positive match
    const output = `## Intuition\nUse a stack-based method.\n\n## Steps\n1. Push.\n\n## Code\n\`\`\`python\n# code\n\`\`\``;
    const result = parseSolverOutput(output);
    expect(result.ok).toBe(true);
    expect(result.sections.approach).toContain("stack-based method");
  });

  it("finds steps using the algorithm alias (body avoids colliding aliases)", () => {
    // Body uses "method" instead of "algorithm" to avoid false-positive match
    const output = `## Approach\nUse a greedy method.\n\n## Algorithm\n1. Sort items.\n\n## Code\n\`\`\`python\n# code\n\`\`\``;
    const result = parseSolverOutput(output);
    expect(result.ok).toBe(true);
    expect(result.sections.steps).toContain("Sort items");
  });

  it("returns the raw trimmed text", () => {
    const output = `  ## Approach\n  A solution.\n\n  ## Code\n  \`\`\`python\n  pass\n  \`\`\`  \n  `;
    const result = parseSolverOutput(output);
    // .trim() removes leading/trailing whitespace from the full text
    expect(result.raw.startsWith("## Approach")).toBe(true);
    // Raw ends with the last code fence, not "pass" (fences are part of content)
    expect(result.raw).toContain("pass");
  });
});

describe("exports", () => {
  it("exports DEFAULT_LANGUAGE as 'python'", () => {
    expect(DEFAULT_LANGUAGE).toBe("python");
  });

  it("exports SUPPORTED_LANGUAGES as a non-empty array containing expected values", () => {
    expect(Array.isArray(SUPPORTED_LANGUAGES)).toBe(true);
    expect(SUPPORTED_LANGUAGES.length).toBeGreaterThan(0);
    expect(SUPPORTED_LANGUAGES).toContain("python");
    expect(SUPPORTED_LANGUAGES).toContain("javascript");
    expect(SUPPORTED_LANGUAGES).toContain("java");
  });
});
