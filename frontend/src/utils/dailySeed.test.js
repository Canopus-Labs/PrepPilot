import { afterEach, describe, expect, it, vi } from "vitest";
import { getDailySeed } from "./dailySeed";

describe("getDailySeed", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("generates the expected YYYYMMDD seed", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2026, 7, 11));

        expect(getDailySeed()).toBe(20260811);
    });

    it("returns the same seed for the same date", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2026, 7, 11));

        const firstSeed = getDailySeed();
        const secondSeed = getDailySeed();

        expect(firstSeed).toBe(secondSeed);
    });

    it("returns different seeds for different dates", () => {
        vi.useFakeTimers();

        vi.setSystemTime(new Date(2026, 7, 11));
        const firstSeed = getDailySeed();

        vi.setSystemTime(new Date(2026, 7, 12));
        const secondSeed = getDailySeed();

        expect(firstSeed).not.toBe(secondSeed);
    });

    it("handles month boundaries correctly", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2026, 7, 31));

        expect(getDailySeed()).toBe(20260831);

        vi.setSystemTime(new Date(2026, 8, 1));

        expect(getDailySeed()).toBe(20260901);
    });

    it("handles year boundaries correctly", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2026, 11, 31));

        expect(getDailySeed()).toBe(20261231);

        vi.setSystemTime(new Date(2027, 0, 1));

        expect(getDailySeed()).toBe(20270101);
    });
});
