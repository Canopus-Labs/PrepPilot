import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../models/InterviewExperience.js");

const InterviewExperience = require("../models/InterviewExperience.js");
const {
  createInterviewExperience,
  getApprovedInterviewExperiences,
  getMyInterviewExperiences,
  updateInterviewExperienceStatus,
} = require("../controllers/interviewExperienceController.js");

function makeReq(body = {}, params = {}, query = {}, user = null) {
  return { body, params, query, user };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

const sampleDoc = {
  _id: "507f1f77bcf86cd799439011",
  company: "Google",
  role: "SDE-2",
  experience: "3 Years",
  difficulty: "Hard",
  offerReceived: true,
  date: "Aug 2026",
  rounds: [{ name: "Round 1", type: "Coding", description: "Arrays" }],
  summary: "Tough but fair process",
  tips: ["Practice graphs"],
  tags: ["Hard", "SDE-2"],
  color: "hsl(100, 55%, 50%)",
  status: "pending",
  createdAt: new Date("2026-08-06T00:00:00.000Z"),
  toObject() {
    return { ...this };
  },
};

describe("createInterviewExperience", () => {
  beforeEach(() => vi.clearAllMocks());

  it("persists a pending submission and returns the shaped experience", async () => {
    InterviewExperience.findOne = vi.fn().mockResolvedValue(null);
    InterviewExperience.create = vi.fn().mockResolvedValue(sampleDoc);

    const req = makeReq({
      company: "Google",
      role: "SDE-2",
      summary: "Tough but fair process",
      clientKey: "11111111-1111-4111-8111-111111111111",
      idempotencyKey: "submit-key-abc12345",
    });
    const res = makeRes();

    await createInterviewExperience(req, res);

    expect(InterviewExperience.create).toHaveBeenCalledWith(
      expect.objectContaining({
        company: "Google",
        status: "pending",
        clientKey: "11111111-1111-4111-8111-111111111111",
        idempotencyKey: "submit-key-abc12345",
      }),
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        experience: expect.objectContaining({
          id: "507f1f77bcf86cd799439011",
          status: "pending",
          company: "Google",
        }),
      }),
    );
  });

  it("rejects missing or blank idempotency keys before creating", async () => {
    InterviewExperience.create = vi.fn();

    const req = makeReq({
      company: "Google",
      role: "SDE-2",
      summary: "Summary",
      idempotencyKey: "   ",
    });
    const res = makeRes();

    await createInterviewExperience(req, res);

    expect(InterviewExperience.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "idempotencyKey is required",
      }),
    );
  });

  it("rejects anonymous creates without a clientKey", async () => {
    InterviewExperience.create = vi.fn();

    const req = makeReq({
      company: "Google",
      role: "SDE-2",
      summary: "Summary",
      idempotencyKey: "submit-key-abc12345",
    });
    const res = makeRes();

    await createInterviewExperience(req, res);

    expect(InterviewExperience.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: "clientKey is required for anonymous submissions",
      }),
    );
  });

  it("returns 500 when persistence fails so the client can retry", async () => {
    InterviewExperience.findOne = vi.fn().mockResolvedValue(null);
    InterviewExperience.create = vi.fn().mockRejectedValue(new Error("db down"));

    const req = makeReq({
      company: "Google",
      role: "SDE-2",
      summary: "Summary",
      clientKey: "11111111-1111-4111-8111-111111111111",
      idempotencyKey: "submit-key-abc12345",
    });
    const res = makeRes();

    await createInterviewExperience(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false }),
    );
  });

  it("returns the existing submission when the same idempotency key is retried", async () => {
    InterviewExperience.findOne = vi.fn().mockResolvedValue(sampleDoc);
    InterviewExperience.create = vi.fn();

    const req = makeReq({
      company: "Google",
      role: "SDE-2",
      summary: "Tough but fair process",
      clientKey: "11111111-1111-4111-8111-111111111111",
      idempotencyKey: "submit-key-abc12345",
    });
    const res = makeRes();

    await createInterviewExperience(req, res);

    expect(InterviewExperience.findOne).toHaveBeenCalledWith({
      idempotencyKey: "submit-key-abc12345",
    });
    expect(InterviewExperience.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        experience: expect.objectContaining({
          id: "507f1f77bcf86cd799439011",
        }),
      }),
    );
  });
});

describe("getMyInterviewExperiences", () => {
  beforeEach(() => vi.clearAllMocks());

  it("loads submissions for a clientKey so reloads keep pending cards", async () => {
    InterviewExperience.find = vi.fn().mockReturnValue({
      sort: vi.fn().mockReturnValue({
        lean: vi.fn().mockResolvedValue([{ ...sampleDoc, toObject: undefined }]),
      }),
    });

    const req = makeReq({}, {}, { clientKey: "11111111-1111-4111-8111-111111111111" });
    const res = makeRes();

    await getMyInterviewExperiences(req, res);

    expect(InterviewExperience.find).toHaveBeenCalledWith({
      $or: [{ clientKey: "11111111-1111-4111-8111-111111111111" }],
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls[0][0].experiences[0].status).toBe("pending");
  });

  it("rejects requests without clientKey or auth", async () => {
    const req = makeReq();
    const res = makeRes();

    await getMyInterviewExperiences(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("ignores legacy weak clientKeys so /mine cannot be enumerated", async () => {
    InterviewExperience.find = vi.fn();

    const req = makeReq({}, {}, { clientKey: "anon-1234567890" });
    const res = makeRes();

    await getMyInterviewExperiences(req, res);

    expect(InterviewExperience.find).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("getApprovedInterviewExperiences", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns only approved experiences", async () => {
    InterviewExperience.find = vi.fn().mockReturnValue({
      sort: vi.fn().mockReturnValue({
        lean: vi.fn().mockResolvedValue([
          { ...sampleDoc, status: "approved", toObject: undefined },
        ]),
      }),
    });

    const req = makeReq();
    const res = makeRes();

    await getApprovedInterviewExperiences(req, res);

    expect(InterviewExperience.find).toHaveBeenCalledWith({ status: "approved" });
    expect(res.json.mock.calls[0][0].experiences[0].status).toBe("approved");
  });
});

describe("updateInterviewExperienceStatus", () => {
  beforeEach(() => vi.clearAllMocks());

  it("approves a pending submission", async () => {
    InterviewExperience.findByIdAndUpdate = vi.fn().mockResolvedValue({
      ...sampleDoc,
      status: "approved",
    });

    const req = makeReq(
      { status: "approved" },
      { id: "507f1f77bcf86cd799439011" },
    );
    const res = makeRes();

    await updateInterviewExperienceStatus(req, res);

    expect(InterviewExperience.findByIdAndUpdate).toHaveBeenCalledWith(
      "507f1f77bcf86cd799439011",
      { status: "approved" },
      { new: true },
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls[0][0].experience.status).toBe("approved");
  });

  it("rejects an invalid status before querying", async () => {
    InterviewExperience.findByIdAndUpdate = vi.fn();

    const req = makeReq(
      { status: { $ne: null } },
      { id: "507f1f77bcf86cd799439011" },
    );
    const res = makeRes();

    await updateInterviewExperienceStatus(req, res);

    expect(InterviewExperience.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("rejects an invalid ObjectId before querying", async () => {
    InterviewExperience.findByIdAndUpdate = vi.fn();

    const req = makeReq({ status: "rejected" }, { id: "missing" });
    const res = makeRes();

    await updateInterviewExperienceStatus(req, res);

    expect(InterviewExperience.findByIdAndUpdate).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("rejects an unknown id", async () => {
    InterviewExperience.findByIdAndUpdate = vi.fn().mockResolvedValue(null);

    const req = makeReq(
      { status: "rejected" },
      { id: "507f1f77bcf86cd799439012" },
    );
    const res = makeRes();

    await updateInterviewExperienceStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
