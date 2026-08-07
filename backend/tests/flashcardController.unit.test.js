import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../models/Flashcard.js");

const Flashcard = require("../models/Flashcard.js");
const {
  calculateSM2,
  createFlashcard,
  getUserFlashcards,
  reviewFlashcard,
  deleteFlashcard,
} = require("../controllers/flashcardController.js");

function makeReq(body = {}, params = {}, query = {}, userId = "507f1f77bcf86cd799439011") {
  return { body, params, query, user: { _id: userId } };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("calculateSM2 Algorithm", () => {
  it("resets interval and repetition on rating 'again'", () => {
    const state = { interval: 10, repetition: 3, efactor: 2.5 };
    const result = calculateSM2(state, "again");
    expect(result.interval).toBe(1);
    expect(result.repetition).toBe(0);
    expect(result.efactor).toBe(1.96);
    expect(result.dueDate.getTime()).toBeGreaterThan(Date.now());
  });

  it("increases repetition and interval correctly on rating 'good' (3)", () => {
    const state = { interval: 6, repetition: 2, efactor: 2.5 };
    const result = calculateSM2(state, "good");
    expect(result.repetition).toBe(3);
    expect(result.interval).toBe(15);
    expect(result.efactor).toBe(2.5);
  });

  it("accelerates interval on rating 'easy' (4)", () => {
    const state = { interval: 6, repetition: 2, efactor: 2.5 };
    const result = calculateSM2(state, "easy");
    expect(result.repetition).toBe(3);
    expect(result.interval).toBe(20);
    expect(result.efactor).toBe(2.6);
  });
});

describe("createFlashcard controller", () => {
  beforeEach(() => vi.clearAllMocks());

  it("creates new flashcard successfully", async () => {
    const newCard = { _id: "card-1", question: "Q", answer: "A", category: "DSA" };
    Flashcard.findOne = vi.fn().mockResolvedValue(null);
    Flashcard.create = vi.fn().mockResolvedValue(newCard);

    const req = makeReq({ question: "Q", answer: "A", category: "DSA" });
    const res = makeRes();

    await createFlashcard(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Flashcard added to SRS deck",
      flashcard: newCard,
    });
  });

  it("returns existing card if sourceId matches", async () => {
    const existingCard = { _id: "card-existing", sourceId: "src-1" };
    Flashcard.findOne = vi.fn().mockResolvedValue(existingCard);

    const req = makeReq({ question: "Q", answer: "A", sourceId: "src-1" });
    const res = makeRes();

    await createFlashcard(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Flashcard already exists in your SRS deck",
      flashcard: existingCard,
    });
  });
});

describe("getUserFlashcards controller", () => {
  beforeEach(() => vi.clearAllMocks());

  it("fetches flashcards for user", async () => {
    const cards = [{ _id: "c1" }, { _id: "c2" }];
    const mockFind = {
      sort: vi.fn().mockReturnValue({
        skip: vi.fn().mockReturnValue({ limit: vi.fn().mockReturnValue({ lean: vi.fn().mockResolvedValue(cards) }) }),
      }),
    };
    Flashcard.find = vi.fn().mockReturnValue(mockFind);
    Flashcard.countDocuments = vi.fn().mockResolvedValue(2);

    const req = makeReq({}, {}, {});
    const res = makeRes();

    await getUserFlashcards(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        count: 2,
        flashcards: cards,
        pagination: expect.objectContaining({
          totalItems: 2,
          totalPages: 1,
          page: 1,
          hasNextPage: false,
        }),
      })
    );
  });
});

describe("reviewFlashcard controller", () => {
  beforeEach(() => vi.clearAllMocks());

  it("updates flashcard with SM-2 metrics", async () => {
    const mockCard = {
      _id: "507f1f77bcf86cd799439022",
      interval: 1,
      repetition: 1,
      efactor: 2.5,
      save: vi.fn().mockResolvedValue(true),
    };
    Flashcard.findOne = vi.fn().mockResolvedValue(mockCard);

    const req = makeReq({ rating: "good" }, { id: "507f1f77bcf86cd799439022" });
    const res = makeRes();

    await reviewFlashcard(req, res);

    expect(mockCard.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: "Flashcard review recorded successfully",
      })
    );
  });

  it("returns 404 if flashcard not found", async () => {
    Flashcard.findOne = vi.fn().mockResolvedValue(null);

    const req = makeReq({ rating: "good" }, { id: "507f1f77bcf86cd799439033" });
    const res = makeRes();

    await reviewFlashcard(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
