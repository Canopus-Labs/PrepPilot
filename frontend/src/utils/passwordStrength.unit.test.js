import { describe, it, expect } from "vitest";
import { getPasswordStrength } from "./passwordStrength";

describe("getPasswordStrength", () => {
  it("should evaluate a weak password correctly", () => {
    const result = getPasswordStrength("abc");
    expect(result.strength).toBe("Weak");
    expect(result.score).toBeLessThan(4);
    expect(result.checks.lowercase).toBe(true);
    expect(result.checks.minLength).toBe(false);
  });

  it("should evaluate a medium password correctly", () => {
    // 4 conditions met: length, lowercase, uppercase, number
    const result = getPasswordStrength("Password123");
    expect(result.strength).toBe("Medium");
    expect(result.score).toBe(4);
    expect(result.checks.special).toBe(false);
  });

  it("should evaluate a strong password correctly", () => {
    // All 5 conditions met
    const result = getPasswordStrength("StrongP@ssw0rd");
    expect(result.strength).toBe("Strong");
    expect(result.score).toBe(5);
    expect(result.checks.special).toBe(true);
  });

  it("should handle empty strings correctly", () => {
    const result = getPasswordStrength("");
    expect(result.strength).toBe("Weak");
    expect(result.score).toBe(0);
  });
});
