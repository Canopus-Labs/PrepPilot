import { describe, it, expect, vi } from "vitest";
const {
  validateAddQuestionToSession,
} = require("../Input_validators/ValidateQuestions.js");

function makeReq(body = {}) {
  return { body };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("addQuestionToSession validator - max length guards", () => {
  it("accepts valid question and answer within limits", () => {
    const req = makeReq({
      sessionId: "507f1f77bcf86cd799439011",
      questions: [{ question: "What is closure?", answer: "A closure is..." }],
    });
    const res = makeRes();
    validateAddQuestionToSession(req, res, () => {});
    expect(res.status).not.toHaveBeenCalled();
  });

  it("rejects question exceeding 5000 characters", () => {
    const req = makeReq({
      sessionId: "507f1f77bcf86cd799439011",
      questions: [{ question: "Q".repeat(5001), answer: "A" }],
    });
    const res = makeRes();
    validateAddQuestionToSession(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: "Validation failed" })
    );
  });

  it("rejects answer exceeding 10000 characters", () => {
    const req = makeReq({
      sessionId: "507f1f77bcf86cd799439011",
      questions: [{ question: "Q", answer: "A".repeat(10001) }],
    });
    const res = makeRes();
    validateAddQuestionToSession(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("accepts question and answer at exact boundaries", () => {
    const req = makeReq({
      sessionId: "507f1f77bcf86cd799439011",
      questions: [
        { question: "Q".repeat(5000), answer: "A".repeat(10000) },
      ],
    });
    const res = makeRes();
    validateAddQuestionToSession(req, res, () => {});
    expect(res.status).not.toHaveBeenCalled();
  });

  it("rejects empty question", () => {
    const req = makeReq({
      sessionId: "507f1f77bcf86cd799439011",
      questions: [{ question: "", answer: "A" }],
    });
    const res = makeRes();
    validateAddQuestionToSession(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("rejects empty answer", () => {
    const req = makeReq({
      sessionId: "507f1f77bcf86cd799439011",
      questions: [{ question: "Q", answer: "" }],
    });
    const res = makeRes();
    validateAddQuestionToSession(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("rejects empty sessionId", () => {
    const req = makeReq({ sessionId: "", questions: [{ question: "Q", answer: "A" }] });
    const res = makeRes();
    validateAddQuestionToSession(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
