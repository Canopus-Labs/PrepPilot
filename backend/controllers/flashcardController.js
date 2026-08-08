const Flashcard = require("../models/Flashcard");

/**
 * SuperMemo SM-2 Algorithm helper
 * Returns updated { interval, repetition, efactor, dueDate }
 */
const calculateSM2 = ({ interval = 0, repetition = 0, efactor = 2.5 }, rating) => {
  let score = 3;
  if (rating === "again" || rating === "1") score = 1;
  else if (rating === "hard" || rating === "2") score = 2;
  else if (rating === "medium" || rating === "good" || rating === "3") score = 4;
  else if (rating === "easy" || rating === "4") score = 5;

  let newRepetition = repetition;
  let newInterval = interval;
  let newEFactor = efactor;

  if (score < 3) {
    // Failed recall (Again / Hard)
    if (score === 1) {
      newRepetition = 0;
      newInterval = 1;
    } else {
      // Hard: keep or slight progression
      newRepetition = repetition > 0 ? repetition : 1;
      newInterval = repetition <= 1 ? 1 : Math.max(1, Math.round(interval * 1.2));
    }
  } else {
    // Successful recall (Medium / Easy)
    if (repetition === 0) {
      newInterval = score === 5 ? 2 : 1;
    } else if (repetition === 1) {
      newInterval = score === 5 ? 7 : 6;
    } else {
      const multiplier = score === 5 ? newEFactor * 1.3 : newEFactor;
      newInterval = Math.max(1, Math.round(interval * multiplier));
    }
    newRepetition += 1;
  }

  // Update Ease Factor (EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))
  const q = score;
  newEFactor = newEFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (newEFactor < 1.3) newEFactor = 1.3;
  newEFactor = Math.round(newEFactor * 100 + Number.EPSILON) / 100;

  const now = new Date();
  const nextDueDate = new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000);

  return {
    interval: newInterval,
    repetition: newRepetition,
    efactor: newEFactor,
    dueDate: nextDueDate,
  };
};

/**
 * @desc Create a new flashcard or bookmark a question for SRS
 * @route POST /api/flashcards
 * @access Private
 */
const createFlashcard = async (req, res) => {
  try {
    const { question, answer, category, sourceId } = req.body;
    const userId = req.user._id;

    // Validate presence and type of mandatory fields
    if (
      !question ||
      typeof question !== "string" ||
      !question.trim() ||
      !answer ||
      typeof answer !== "string" ||
      !answer.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Question and answer are required non-empty string fields",
      });
    }

    // Check if card with exact sourceId already exists for this user
    if (sourceId) {
      const existingCard = await Flashcard.findOne({ userId, sourceId });
      if (existingCard) {
        return res.status(200).json({
          success: true,
          message: "Flashcard already exists in your SRS deck",
          flashcard: existingCard,
        });
      }
    }

    const flashcard = await Flashcard.create({
      userId,
      question: question.trim(),
      answer: answer.trim(),
      category: category || "General",
      sourceId: sourceId || null,
      dueDate: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Flashcard added to SRS deck",
      flashcard,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create flashcard",
      error: "A server error occurred",
    });
  }
};

/**
 * @desc Get all flashcards for authenticated user with optional due filtering
 * @route GET /api/flashcards
 * @access Private
 */
const getUserFlashcards = async (req, res) => {
  try {
    const userId = req.user._id;
    const { due, category } = req.query;

    const query = { userId };
    if (due === "true") {
      query.dueDate = { $lte: new Date() };
    }
    if (category && category !== "All") {
      query.category = category;
    }

    const flashcards = await Flashcard.find(query).sort({ dueDate: 1 });

    return res.status(200).json({
      success: true,
      count: flashcards.length,
      flashcards,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch flashcards",
      error: "A server error occurred",
    });
  }
};

/**
 * @desc Submit review for flashcard and update SM-2 metrics
 * @route PUT /api/flashcards/:id/review
 * @access Private
 */
const reviewFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const userId = req.user._id;

    if (!rating) {
      return res.status(400).json({
        success: false,
        message: "Rating is required. Supported values: 'again', 'hard', 'good', 'easy'.",
      });
    }

    const flashcard = await Flashcard.findOne({ _id: id, userId });
    if (!flashcard) {
      return res.status(404).json({
        success: false,
        message: "Flashcard not found",
      });
    }

    const sm2Result = calculateSM2(
      {
        interval: flashcard.interval,
        repetition: flashcard.repetition,
        efactor: flashcard.efactor,
      },
      rating
    );

    flashcard.interval = sm2Result.interval;
    flashcard.repetition = sm2Result.repetition;
    flashcard.efactor = sm2Result.efactor;
    flashcard.dueDate = sm2Result.dueDate;
    flashcard.lastReviewedAt = new Date();

    await flashcard.save();

    return res.status(200).json({
      success: true,
      message: "Flashcard review recorded successfully",
      flashcard,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to review flashcard",
      error: "A server error occurred",
    });
  }
};

/**
 * @desc Delete a flashcard from SRS deck
 * @route DELETE /api/flashcards/:id
 * @access Private
 */
const deleteFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const flashcard = await Flashcard.findOneAndDelete({ _id: id, userId });
    if (!flashcard) {
      return res.status(404).json({
        success: false,
        message: "Flashcard not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Flashcard deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete flashcard",
      error: "A server error occurred",
    });
  }
};

/**
 * @desc Get SRS deck stats for user
 * @route GET /api/flashcards/stats
 * @access Private
 */
const getFlashcardStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();

    const totalCards = await Flashcard.countDocuments({ userId });
    const dueCount = await Flashcard.countDocuments({
      userId,
      dueDate: { $lte: now },
    });
    const masteredCount = await Flashcard.countDocuments({
      userId,
      interval: { $gte: 21 },
    });

    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const reviewedToday = await Flashcard.countDocuments({
      userId,
      lastReviewedAt: { $gte: startOfDay },
    });

    return res.status(200).json({
      success: true,
      stats: {
        totalCards,
        dueCount,
        masteredCount,
        reviewedToday,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch SRS stats",
      error: "A server error occurred",
    });
  }
};

module.exports = {
  createFlashcard,
  getUserFlashcards,
  reviewFlashcard,
  deleteFlashcard,
  getFlashcardStats,
  calculateSM2,
};