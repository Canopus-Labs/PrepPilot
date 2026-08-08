import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { calculateSM2, getMidnightInTimezone } from "../utils/srsAlgorithm";

describe("SRS Algorithm (SM-2)", () => {
  beforeEach(() => {
    // Mock system time to a fixed date for reliable testing
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-07T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("getMidnightInTimezone", () => {
    it("should correctly calculate midnight UTC for a future date", () => {
      // 1 day from 2026-08-07 12:00 UTC is 2026-08-08 00:00 UTC
      const result = getMidnightInTimezone(new Date(), 1, "UTC");
      expect(result.toISOString()).toBe("2026-08-08T00:00:00.000Z");
    });

    it("should correctly calculate midnight in America/New_York (UTC-4 summer)", () => {
      // Current: 2026-08-07 12:00 UTC = 08:00 EDT
      // Add 1 day -> target local is 2026-08-08 00:00 EDT
      // 00:00 EDT is 04:00 UTC
      const result = getMidnightInTimezone(new Date(), 1, "America/New_York");
      expect(result.toISOString()).toBe("2026-08-08T04:00:00.000Z");
    });

    it("should correctly calculate midnight in Australia/Sydney (UTC+10 winter)", () => {
      // Current: 2026-08-07 12:00 UTC = 22:00 AEST
      // Add 1 day -> target local is 2026-08-08 00:00 AEST
      // 00:00 AEST is 14:00 UTC on 2026-08-07
      const result = getMidnightInTimezone(new Date(), 1, "Australia/Sydney");
      expect(result.toISOString()).toBe("2026-08-07T14:00:00.000Z");
    });
  });

  describe("calculateSM2 Ratings", () => {
    it('should handle "again" rating (score 1)', () => {
      const result = calculateSM2({ interval: 5, repetition: 3, efactor: 2.5 }, "again");
      expect(result.repetition).toBe(0);
      expect(result.interval).toBe(1);
      expect(result.efactor).toBe(1.96);
    });

    it('should handle "hard" rating (score 2)', () => {
      const result = calculateSM2({ interval: 5, repetition: 3, efactor: 2.5 }, "hard");
      // Repetition remains if > 0
      expect(result.repetition).toBe(3);
      // Interval = Math.max(1, Math.round(5 * 1.2)) = 6
      expect(result.interval).toBe(6);
      expect(result.efactor).toBe(2.18);
    });

    it('should handle "good" / "medium" rating (score 4) for first time', () => {
      const result = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, "good");
      expect(result.repetition).toBe(1);
      expect(result.interval).toBe(1);
      expect(result.efactor).toBe(2.5); // EF unchanged for score 4
    });

    it('should handle "easy" rating (score 5) for first time', () => {
      const result = calculateSM2({ interval: 0, repetition: 0, efactor: 2.5 }, "easy");
      expect(result.repetition).toBe(1);
      expect(result.interval).toBe(2);
      expect(result.efactor).toBe(2.6); // EF increases
    });

    it("should multiply interval by EFactor for successive good ratings", () => {
      const result = calculateSM2({ interval: 6, repetition: 2, efactor: 2.5 }, "good");
      expect(result.repetition).toBe(3);
      expect(result.interval).toBe(15); // Math.round(6 * 2.5)
    });
  });

  describe("calculateSM2 Bounds and Fallbacks", () => {
    it("should not let EFactor drop below 1.3", () => {
      const result = calculateSM2({ interval: 1, repetition: 1, efactor: 1.3 }, "again");
      expect(result.efactor).toBe(1.3);
    });

    it("should safely fallback when given invalid timezone", () => {
      // With invalid timezone, it catches the error and just adds 24 hours
      // newInterval for "good" first time is 1. 24 hours later.
      const result = calculateSM2({ interval: 1, repetition: 0, efactor: 2.5 }, "good", "Invalid/Timezone");
      expect(result.dueDate.toISOString()).toBe("2026-08-08T12:00:00.000Z");
    });
  });
});
