import { describe, expect, it } from "vitest";
import { calculateWpm, calculateAccuracy } from "./typingSpeedHelpers";

describe("TypingSpeedGame helpers", () => {
  it("calculates WPM correctly for positive correct chars and seconds", () => {
    expect(calculateWpm(25, 60)).toBe(5);
    expect(calculateWpm(50, 30)).toBe(20);
    expect(calculateWpm(0, 10)).toBe(0);
  });

  it("returns 0 WPM when time is zero or negative", () => {
    expect(calculateWpm(10, 0)).toBe(0);
    expect(calculateWpm(10, -5)).toBe(0);
  });

  it("calculates accuracy correctly", () => {
    expect(calculateAccuracy(45, 50)).toBe(90);
    expect(calculateAccuracy(5, 10)).toBe(50);
    expect(calculateAccuracy(0, 10)).toBe(0);
  });

  it("returns 100% accuracy when nothing is typed", () => {
    expect(calculateAccuracy(0, 0)).toBe(100);
    expect(calculateAccuracy(0, -1)).toBe(100);
  });
});
