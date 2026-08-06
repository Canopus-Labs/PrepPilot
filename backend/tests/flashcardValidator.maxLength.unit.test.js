import { describe, it, expect, vi } from "vitest";
const {
  validateCreateFlashcard,
} = require("../Input_validators/ValidateFlashcard.js");

function makeReq(body = {}) {
  return { body };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("createFlashcard validator - max length guards", () => {
  it("accepts question and answer within max length", () => {
    const req = makeReq({
      question: "What is polymorphism?",
      answer: "Polymorphism allows objects of different types to be treated as instances of the same type.",
      category: "OOP",
    });
    const res = makeRes();
    validateCreateFlashcard(req, res, () => {});
    // If validation passes, res.status is not called
    expect(res.status).not.toHaveBeenCalled();
  });

  it("rejects question exceeding 5000 characters", () => {
    const req = makeReq({
      question: "A".repeat(5001),
      answer: "Short answer",
    });
    const res = makeRes();
    validateCreateFlashcard(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: "Validation failed" })
    );
  });

  it("rejects answer exceeding 5000 characters", () => {
    const req = makeReq({
      question: "Short question",
      answer: "B".repeat(5001),
    });
    const res = makeRes();
    validateCreateFlashcard(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: "Validation failed" })
    );
  });

  it("rejects category exceeding 100 characters", () => {
    const req = makeReq({
      question: "Q",
      answer: "A",
      category: "C".repeat(101),
    });
    const res = makeRes();
    validateCreateFlashcard(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: "Validation failed" })
    );
  });

  it("accepts question and answer at exact boundary (5000 chars)", () => {
    const req = makeReq({
      question: "Q".repeat(5000),
      answer: "A".repeat(5000),
    });
    const res = makeRes();
    validateCreateFlashcard(req, res, () => {});
    expect(res.status).not.toHaveBeenCalled();
  });

  it("rejects empty question", () => {
    const req = makeReq({ question: "", answer: "A" });
    const res = makeRes();
    validateCreateFlashcard(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("rejects empty answer", () => {
    const req = makeReq({ question: "Q", answer: "" });
    const res = makeRes();
    validateCreateFlashcard(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("defaults category to 'General' when omitted", () => {
    const req = makeReq({ question: "Q", answer: "A" });
    const res = makeRes();
    validateCreateFlashcard(req, res, () => {});
    expect(res.status).not.toHaveBeenCalled();
    expect(req.body.category).toBe("General");
  });
});
