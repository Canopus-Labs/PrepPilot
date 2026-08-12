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
