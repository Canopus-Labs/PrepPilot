import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../models/Session.js");
vi.mock("../models/Question.js");

const Session = require("../models/Session.js");
const Question = require("../models/Question.js");
const {
  getMyQuestions,
} = require("../controllers/questionController.js");

const OWN_SESSION = "507f1f77bcf86cd799439011";
const FOREIGN_SESSION = "507f1f77bcf86cd799439022";

function makeReq(query = {}, userId = "u1") {
  return { user: { _id: userId }, query };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

function leanChain(rows) {
  return {
    sort: () => ({
      skip: () => ({
        limit: () => ({
          populate: () => ({
            lean: () => Promise.resolve(rows),
          }),
        }),
      }),
    }),
  };
}

function sessionChain(rows) {
  return {
    select: () => ({
      lean: () => Promise.resolve(rows),
    }),
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  Session.find = vi.fn();
  Question.find = vi.fn();
  Question.countDocuments = vi.fn();
});

describe("getMyQuestions", () => {
  it("returns an empty list when the user has no sessions", async () => {
    Session.find.mockReturnValue(sessionChain([]));
    const res = makeRes();

    await getMyQuestions(makeReq(), res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, questions: [] })
    );
  });

  it("returns questions joined with session metadata and pagination", async () => {
    Session.find.mockReturnValue(sessionChain([{ _id: OWN_SESSION }]));
    const row = {
      _id: "q1",
      question: "What is polymorphism?",
      answer: "Many forms",
      isPinned: false,
      session: { _id: OWN_SESSION, role: "SDE", topicsToFocus: ["oop"] },
    };
    Question.find.mockReturnValue(leanChain([row]));
    Question.countDocuments.mockResolvedValue(1);

    const res = makeRes();
    await getMyQuestions(makeReq({ page: "1", limit: "20" }), res);

    expect(Question.find).toHaveBeenCalledWith({
      session: { $in: [OWN_SESSION] },
    });
    const body = res.json.mock.calls[0][0];
    expect(body.success).toBe(true);
    expect(body.questions[0].session.role).toBe("SDE");
    expect(body.pagination).toEqual({
      totalItems: 1,
      totalPages: 1,
      page: 1,
      pageSize: 20,
      hasNextPage: false,
    });
  });

  it("applies pinned, session and text-search filters", async () => {
    Session.find.mockReturnValue(sessionChain([{ _id: OWN_SESSION }]));
    Question.find.mockReturnValue(leanChain([]));
    Question.countDocuments.mockResolvedValue(0);

    const res = makeRes();
    await getMyQuestions(
      makeReq({ pinned: "true", sessionId: OWN_SESSION, q: "polymorphism" }),
      res
    );

    const filter = Question.find.mock.calls[0][0];
    expect(filter.isPinned).toBe(true);
    expect(filter.session).toBe(OWN_SESSION);
    expect(filter.$or).toHaveLength(3);
    expect(filter.$or[0].question).toEqual(new RegExp("polymorphism", "i"));
  });

  it("rejects an invalid sessionId format with 400", async () => {
    Session.find.mockReturnValue(sessionChain([{ _id: OWN_SESSION }]));
    const res = makeRes();

    await getMyQuestions(makeReq({ sessionId: "not-an-objectid" }), res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(Question.find).not.toHaveBeenCalled();
  });

  it("rejects a session that does not belong to the user with 403", async () => {
    Session.find.mockReturnValue(sessionChain([{ _id: OWN_SESSION }]));
    const res = makeRes();

    await getMyQuestions(makeReq({ sessionId: FOREIGN_SESSION }), res);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  it("returns 500 when the query fails", async () => {
    Session.find.mockReturnValue({ select: () => ({ lean: () => Promise.reject(new Error("boom")) }) });
    const res = makeRes();

    await getMyQuestions(makeReq(), res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal server error occurred",
    });
  });
});
