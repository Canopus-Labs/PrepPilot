import { describe, it, expect } from "vitest";
import { formatRetryMessage } from "./repositoryHiveRateLimit";

describe("formatRetryMessage", () => {
  it("prefers retry-after seconds when present", () => {
    expect(formatRetryMessage(45, null)).toBe("Try again in about 45s.");
  });

  it("falls back to resetAt timing", () => {
    const resetAt = new Date(Date.now() + 15000).toISOString();
    expect(formatRetryMessage(null, resetAt)).toMatch(/Try again in about \d+s\./);
  });

  it("uses a generic hint when no timing is available", () => {
    expect(formatRetryMessage(null, null)).toBe("Try again shortly.");
  });
});
