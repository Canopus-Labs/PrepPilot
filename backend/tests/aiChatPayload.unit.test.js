import { describe, it, expect, beforeAll } from "vitest";

// ---------------------------------------------------------------------------
// AI chat payload hardening (issue #924):
// - systemInstruction must not be client-controlled (server owns it)
// - prompt + history must be sanitized and capped
// ---------------------------------------------------------------------------

let buildChatPayload;
let SYSTEM_INSTRUCTION;
let MAX_HISTORY_MESSAGES;
let MAX_COMBINED_CHARS;

beforeAll(async () => {
  const mod = await import("../routes/aiRoutes.js");
  buildChatPayload = mod.buildChatPayload;
  SYSTEM_INSTRUCTION = mod.SYSTEM_INSTRUCTION;
  MAX_HISTORY_MESSAGES = mod.MAX_HISTORY_MESSAGES;
  MAX_COMBINED_CHARS = mod.MAX_COMBINED_CHARS;
});

describe("buildChatPayload — caps and sanitization", () => {
  it("formats a valid history", () => {
    const built = buildChatPayload("Explain closures", [
      { role: "user", text: "Hi" },
      { role: "model", text: "Hello!" },
    ]);
    expect(built.ok).toBe(true);
    expect(built.formattedHistory).toEqual([
      { role: "user", parts: [{ text: "Hi" }] },
      { role: "model", parts: [{ text: "Hello!" }] },
    ]);
  });

  it("rejects a non-array history", () => {
    const built = buildChatPayload("Hello", { nope: true });
    expect(built.ok).toBe(false);
  });

  it("rejects more than 20 history messages", () => {
    const history = Array.from({ length: MAX_HISTORY_MESSAGES + 1 }, () => ({
      role: "user",
      text: "x",
    }));
    const built = buildChatPayload("Hello", history);
    expect(built.ok).toBe(false);
  });

  it("rejects a prompt + history payload over the combined character budget", () => {
    const big = "a".repeat(MAX_COMBINED_CHARS + 1);
    const built = buildChatPayload(big, []);
    expect(built.ok).toBe(false);
  });

  it("strips markup from history text", () => {
    const built = buildChatPayload("Hello", [{ role: "user", text: "<b>bold</b>" }]);
    expect(built.ok).toBe(true);
    expect(built.formattedHistory[0].parts[0].text).toBe("bold");
  });

  it("coerces non-string history text to empty instead of failing", () => {
    const built = buildChatPayload("Hello", [{ role: "user", text: 123 }]);
    expect(built.ok).toBe(true);
    expect(built.formattedHistory[0].parts[0].text).toBe("");
  });
});

describe("SYSTEM_INSTRUCTION is server-owned", () => {
  it("exists and is non-empty", () => {
    expect(SYSTEM_INSTRUCTION).toBeTruthy();
    expect(SYSTEM_INSTRUCTION).toContain("PrepPilot");
  });
});
