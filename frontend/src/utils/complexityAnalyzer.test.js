import { describe, expect, it } from "vitest";
import { analyzeJavaScriptComplexity } from "./complexityAnalyzer";

describe("analyzeJavaScriptComplexity", () => {
  it("detects a single loop as O(n)", () => {
    const result = analyzeJavaScriptComplexity(`
      for (let i = 0; i < n; i += 1) {
        console.log(i);
      }
    `);

    expect(result.status).toBe("success");
    expect(result.timeComplexity).toBe("O(n)");
    expect(result.metrics.loopCount).toBe(1);
    expect(result.metrics.maxLoopDepth).toBe(1);
  });

  it("detects for...in and for...of as linear loops", () => {
    const forIn = analyzeJavaScriptComplexity(`
      for (const key in values) {
        console.log(key);
      }
    `);
    const forOf = analyzeJavaScriptComplexity(`
      for (const value of values) {
        console.log(value);
      }
    `);

    expect(forIn.timeComplexity).toBe("O(n)");
    expect(forIn.metrics.loopCount).toBe(1);
    expect(forOf.timeComplexity).toBe("O(n)");
    expect(forOf.metrics.loopCount).toBe(1);
  });

  it("detects nested loops as O(n²)", () => {
    const result = analyzeJavaScriptComplexity(`
      for (let i = 0; i < n; i += 1) {
        for (let j = 0; j < n; j += 1) {
          console.log(i, j);
        }
      }
    `);

    expect(result.status).toBe("success");
    expect(result.timeComplexity).toBe("O(n²)");
    expect(result.metrics.loopCount).toBe(2);
    expect(result.metrics.maxLoopDepth).toBe(2);
  });

  it("treats nested map callbacks as one linear traversal", () => {
    const result = analyzeJavaScriptComplexity(`
      rows.map((row) => row.map((value) => value * 2));
    `);

    expect(result.timeComplexity).toBe("O(n)");
    expect(result.metrics.loopCount).toBe(0);
  });

  it("treats a map inside a loop as linear under this heuristic", () => {
    const result = analyzeJavaScriptComplexity(`
      for (const row of rows) {
        row.map((value) => value * 2);
      }
    `);

    expect(result.timeComplexity).toBe("O(n)");
    expect(result.metrics.loopCount).toBe(1);
  });

  it("reports O(n) space for map and filter allocations", () => {
    const mapResult = analyzeJavaScriptComplexity("const doubled = values.map((value) => value * 2);");
    const filterResult = analyzeJavaScriptComplexity("const active = values.filter((value) => value.active);");

    expect(mapResult.spaceComplexity).toBe("O(n)");
    expect(filterResult.spaceComplexity).toBe("O(n)");
  });

  it("does not treat ordinary helper calls as recursion", () => {
    const result = analyzeJavaScriptComplexity(`
      function helper(value) {
        return value + 1;
      }
      function main(value) {
        return helper(value);
      }
    `);

    expect(result.metrics.recursiveCalls).toBe(0);
    expect(result.timeComplexity).toBe("O(1)");
    expect(result.spaceComplexity).toBe("O(1)");
  });

  it("detects recursive arrow functions", () => {
    const result = analyzeJavaScriptComplexity(`
      const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);
    `);

    expect(result.metrics.recursiveCalls).toBe(1);
    expect(result.timeComplexity).toBe("O(n) or O(branching^depth)");
    expect(result.spaceComplexity).toBe("O(n) or O(depth)");
  });

  it("handles code with no loops", () => {
    const result = analyzeJavaScriptComplexity("const answer = 42;");

    expect(result.status).toBe("success");
    expect(result.timeComplexity).toBe("O(1)");
    expect(result.spaceComplexity).toBe("O(1)");
  });

  it("returns a parse error for invalid JavaScript", () => {
    const result = analyzeJavaScriptComplexity("for (let i = 0; i < n; i++ {");

    expect(result.status).toBe("error");
    expect(result.timeComplexity).toBe("—");
  });
});
