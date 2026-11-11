import { describe, it, expect } from "vitest";
import { isContextualResponse } from "../utils/domainClassifier.js";

describe("isContextualResponse", () => {
  const firstExchange = [
    { role: "user", text: "Help me prepare for an interview" },
    { role: "model", text: "Would you like to practice a question?" },
  ];

  it("accepts a short reply when the previous assistant message ends the history", () => {
    expect(isContextualResponse("yes", firstExchange)).toBe(true);
    expect(isContextualResponse("yes", [{ role: "model", text: "Ready?" }])).toBe(true);
    expect(isContextualResponse("continue", [
      ...firstExchange,
      { role: "user", text: "Explain the answer" },
      { role: "model", text: "Should we try another?" },
    ])).toBe(true);
  });

  it("does not use an older assistant reply when history ends with a user message", () => {
    expect(isContextualResponse("yes", [
      ...firstExchange,
      { role: "user", text: "What is the weather?" },
    ])).toBe(false);
  });

  it("does not treat a reply as contextual with empty history", () => {
    expect(isContextualResponse("yes", [])).toBe(false);
  });
});
