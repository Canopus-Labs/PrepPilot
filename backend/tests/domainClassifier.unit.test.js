const { isPrepPilotDomain, isContextualResponse } = require("../utils/domainClassifier");

describe("Domain Classifier", () => {
  describe("Allowed queries", () => {
    const allowed = [
      "Explain binary search.",
      "Review my resume.",
      "How do I prepare for Amazon interviews?",
      "Tell me about dynamic programming.",
      "How does the React virtual DOM work?",
      "Can you help me format my cv?",
      "hi",
      "ok",
      "yo",
      "?",
      "hello"
    ];

    allowed.forEach(query => {
      test(`Should allow: "${query}"`, () => {
        expect(isPrepPilotDomain(query)).toBe(true);
      });
    });
  });

  describe("Rejected queries", () => {
    const rejected = [
      "Who won the FIFA World Cup?",
      "Write a recipe for pasta.",
      "Tell me a joke.",
      "What is the capital of France?",
      "Explain World War II."
    ];

    rejected.forEach(query => {
      test(`Should reject: "${query}"`, () => {
        expect(isPrepPilotDomain(query)).toBe(false);
      });
    });
  });

  describe("Contextual Acknowledgements", () => {
    test("Should pass contextual 'yes' if history has assistant message", () => {
      const history = [{ role: "model", text: "Would you like a mock interview?" }];
      expect(isContextualResponse("yes", history)).toBe(true);
    });

    test("Should pass contextual 'sure' if history has assistant message", () => {
      const history = [{ role: "model", text: "Would you like resume feedback?" }];
      expect(isContextualResponse("sure", history)).toBe(true);
    });

    test("Should pass contextual 'ok' if history has assistant message", () => {
      const history = [{ role: "model", text: "Do you want coding practice?" }];
      expect(isContextualResponse("ok", history)).toBe(true);
    });

    test("Should fail contextual 'yes' if history is empty", () => {
      const history = [];
      expect(isContextualResponse("yes", history)).toBe(false);
    });

    test("Should fail contextual 'yes' if last message was from user", () => {
      const history = [{ role: "user", text: "hello" }];
      expect(isContextualResponse("yes", history)).toBe(false);
    });
  });
});
