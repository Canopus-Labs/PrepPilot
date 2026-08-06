import { describe, it, expect, vi } from "vitest";
const {
  validateGenerateInterviewQuestions,
  validateGenerateConceptExplanation,
  validateGenerateInterviewTips,
} = require("../Input_validators/ValidateAi.js");

function makeReq(body = {}) {
  return { body };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("AI validators - max length guards", () => {
  describe("validateGenerateInterviewQuestions", () => {
    it("accepts valid input within limits", () => {
      const req = makeReq({
        role: "Backend Engineer",
        experience: "3 years",
        topicsToFocus: ["Node.js", "Databases"],
        numberOfQuestions: 5,
      });
      const res = makeRes();
      validateGenerateInterviewQuestions(req, res, () => {});
      expect(res.status).not.toHaveBeenCalled();
    });

    it("rejects role exceeding 200 characters", () => {
      const req = makeReq({
        role: "R".repeat(201),
        experience: "3 years",
        topicsToFocus: ["Node.js"],
        numberOfQuestions: 5,
      });
      const res = makeRes();
      validateGenerateInterviewQuestions(req, res, () => {});
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("rejects experience exceeding 50 characters", () => {
      const req = makeReq({
        role: "Backend Engineer",
        experience: "E".repeat(51),
        topicsToFocus: ["Node.js"],
        numberOfQuestions: 5,
      });
      const res = makeRes();
      validateGenerateInterviewQuestions(req, res, () => {});
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("rejects topic exceeding 100 characters", () => {
      const req = makeReq({
        role: "Backend Engineer",
        experience: "3 years",
        topicsToFocus: ["T".repeat(101)],
        numberOfQuestions: 5,
      });
      const res = makeRes();
      validateGenerateInterviewQuestions(req, res, () => {});
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe("validateGenerateConceptExplanation", () => {
    it("accepts question within 10000 characters", () => {
      const req = makeReq({ question: "Q".repeat(10000) });
      const res = makeRes();
      validateGenerateConceptExplanation(req, res, () => {});
      expect(res.status).not.toHaveBeenCalled();
    });

    it("rejects question exceeding 10000 characters", () => {
      const req = makeReq({ question: "Q".repeat(10001) });
      const res = makeRes();
      validateGenerateConceptExplanation(req, res, () => {});
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ success: false, message: "Validation failed" })
      );
    });

    it("rejects empty question", () => {
      const req = makeReq({ question: "" });
      const res = makeRes();
      validateGenerateConceptExplanation(req, res, () => {});
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe("validateGenerateInterviewTips", () => {
    it("accepts valid role and experience", () => {
      const req = makeReq({ role: "Frontend Engineer", experience: "2 years" });
      const res = makeRes();
      validateGenerateInterviewTips(req, res, () => {});
      expect(res.status).not.toHaveBeenCalled();
    });

    it("rejects role exceeding 200 characters", () => {
      const req = makeReq({ role: "R".repeat(201), experience: "2 years" });
      const res = makeRes();
      validateGenerateInterviewTips(req, res, () => {});
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("rejects experience exceeding 50 characters", () => {
      const req = makeReq({ role: "Frontend Engineer", experience: "E".repeat(51) });
      const res = makeRes();
      validateGenerateInterviewTips(req, res, () => {});
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
