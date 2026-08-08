const mongoose = require("mongoose");
const Flashcard = require("../models/Flashcard");
const { calculateSM2 } = require("../utils/sm2Algorithm");

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

    // Validate ObjectId format before querying database
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid flashcard ID format",
      });
    }

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

    // Validate ObjectId format before querying database
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid flashcard ID format",
      });
    }

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

    // Fix: Clone 'now' before setting hours to avoid in-place mutation of 'now'
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

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