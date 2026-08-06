import { describe, it, expect, vi } from "vitest";
const {
  validateCreateSession,
} = require("../Input_validators/ValidateSession.js");

function makeReq(body = {}) {
  return { body };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("createSession validator - max length guards", () => {
  it("accepts valid session data within limits", () => {
    const req = makeReq({
      role: "Backend Engineer",
      experience: "3 years",
      topicsToFocus: ["Node.js", "Databases"],
      description: "Preparing for backend interviews",
    });
    const res = makeRes();
    validateCreateSession(req, res, () => {});
    expect(res.status).not.toHaveBeenCalled();
  });

  it("rejects role exceeding 200 characters", () => {
    const req = makeReq({
      role: "A".repeat(201),
      experience: "3 years",
      topicsToFocus: ["Node.js"],
    });
    const res = makeRes();
    validateCreateSession(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: "Validation failed" })
    );
  });

  it("rejects experience exceeding 50 characters", () => {
    const req = makeReq({
      role: "Backend Engineer",
      experience: "E".repeat(51),
      topicsToFocus: ["Node.js"],
    });
    const res = makeRes();
    validateCreateSession(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("rejects description exceeding 2000 characters", () => {
    const req = makeReq({
      role: "Backend Engineer",
      experience: "3 years",
      topicsToFocus: ["Node.js"],
      description: "D".repeat(2001),
    });
    const res = makeRes();
    validateCreateSession(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("rejects question exceeding 5000 characters", () => {
    const req = makeReq({
      role: "Backend Engineer",
      experience: "3 years",
      topicsToFocus: ["Node.js"],
      question: [{ question: "Q".repeat(5001), answer: "A" }],
    });
    const res = makeRes();
    validateCreateSession(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("rejects answer exceeding 10000 characters", () => {
    const req = makeReq({
      role: "Backend Engineer",
      experience: "3 years",
      topicsToFocus: ["Node.js"],
      question: [{ question: "Q", answer: "A".repeat(10001) }],
    });
    const res = makeRes();
    validateCreateSession(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("accepts role and experience at exact boundaries", () => {
    const req = makeReq({
      role: "R".repeat(200),
      experience: "E".repeat(50),
      topicsToFocus: ["Node.js"],
    });
    const res = makeRes();
    validateCreateSession(req, res, () => {});
    expect(res.status).not.toHaveBeenCalled();
  });

  it("rejects empty role", () => {
    const req = makeReq({
      role: "",
      experience: "3 years",
      topicsToFocus: ["Node.js"],
    });
    const res = makeRes();
    validateCreateSession(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
