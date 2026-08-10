import { describe, expect, it } from "vitest";
import { getInitials, validateEmail } from "./helper";

describe("validateEmail", () => {
    it("returns true for valid email addresses", () => {
        expect(validateEmail("user@example.com")).toBe(true);
        expect(validateEmail("john.doe@company.org")).toBe(true);
        expect(validateEmail("student123@university.edu")).toBe(true);
    });

    it("returns false for invalid email addresses", () => {
        expect(validateEmail("user")).toBe(false);
        expect(validateEmail("user@")).toBe(false);
        expect(validateEmail("@example.com")).toBe(false);
        expect(validateEmail("user@example")).toBe(false);
        expect(validateEmail("user @example.com")).toBe(false);
    });

    it("returns false for empty or non-string values", () => {
        expect(validateEmail("")).toBe(false);
        expect(validateEmail(null)).toBe(false);
        expect(validateEmail(undefined)).toBe(false);
        expect(validateEmail(123)).toBe(false);
        expect(validateEmail({})).toBe(false);
    });
});

describe("getInitials", () => {
    it("returns the initial for a single-word title", () => {
        expect(getInitials("PrepPilot")).toBe("P");
    });

    it("returns the first two initials for a multi-word title", () => {
        expect(getInitials("Prep Pilot")).toBe("PP");
        expect(getInitials("Career Preparation Platform")).toBe("CP");
    });

    it("trims leading and trailing whitespace", () => {
        expect(getInitials("  Prep Pilot  ")).toBe("PP");
    });

    it("handles multiple spaces between words", () => {
        expect(getInitials("Prep    Pilot")).toBe("PP");
    });

    it("returns uppercase initials", () => {
        expect(getInitials("prep pilot")).toBe("PP");
    });

    it("returns an empty string for an empty title", () => {
        expect(getInitials("")).toBe("");
    });

    it("returns an empty string for a missing title", () => {
        expect(getInitials(null)).toBe("");
        expect(getInitials(undefined)).toBe("");
    });

    it("uses only the first two words", () => {
        expect(getInitials("Prep Pilot Interview Platform")).toBe("PP");
    });
});