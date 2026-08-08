import { describe, it, expect } from "vitest";
import { isPrepPilotDomain } from "../utils/domainClassifier.js";

// ---------------------------------------------------------------------------
// Domain classifier prefix-keyword fix (issue #1440): core prep topics that
// are prefixes of real words (probab -> probability, scal -> scaling, math ->
// mathematics, load balanc -> load balancing, negotiat -> negotiation) and
// keywords containing non-word characters (c++, c#) previously never matched
// because of the trailing \b in the keyword regex, so the AI mentor refused
// legitimate questions about them.
// ---------------------------------------------------------------------------

describe("isPrepPilotDomain — prefix and non-word-character keywords", () => {
  const cases = [
    "probability",
    "Explain probability.",
    "What is load balancing?",
    "How do I scale my database?",
    "scaling",
    "Explain C++ pointers.",
    "Explain C# async/await.",
    "C++",
    "C#",
    "negotiation",
    "mathematics",
    "quantitative reasoning"
  ];

  cases.forEach((query) => {
    it(`routes "${query}" to the AI mentor`, () => {
      expect(isPrepPilotDomain(query)).toBe(true);
    });
  });

  it("still rejects clearly off-topic prompts", () => {
    expect(isPrepPilotDomain("Who won the FIFA World Cup?")).toBe(false);
    expect(isPrepPilotDomain("Write a recipe for pasta.")).toBe(false);
  });
});
