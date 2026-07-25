const SpacedRepetition = require("../models/SpacedRepetition");

// @desc    Get flashcards due for review today
// @route   GET /api/srs/due
// @access  Private
exports.getDueCards = async (req, res) => {
  try {
    const today = new Date();
    const cards = await SpacedRepetition.find({
      user: req.user.id,
      nextReviewDate: { $lte: today },
    }).sort({ nextReviewDate: 1 });

    return res.status(200).json({ success: true, count: cards.length, data: cards });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create a new flashcard
// @route   POST /api/srs/add
// @access  Private
exports.addCard = async (req, res) => {
  try {
    const { title, question, answer, category } = req.body;
    if (!title || !question || !answer) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const card = await SpacedRepetition.create({
      user: req.user.id,
      title,
      question,
      answer,
      category: category || "General",
      nextReviewDate: new Date(),
    });

    return res.status(201).json({ success: true, data: card });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Submit card review (SM-2 Interval update)
// @route   POST /api/srs/:id/review
// @access  Private
exports.reviewCard = async (req, res) => {
  try {
    const { rating } = req.body; // Rating: 1 (Again), 2 (Hard), 3 (Good), 4 (Easy)
    const card = await SpacedRepetition.findOne({ _id: req.params.id, user: req.user.id });

    if (!card) {
      return res.status(404).json({ success: false, message: "Card not found" });
    }

    let { interval, repetition, easeFactor } = card;
    const q = Math.max(1, Math.min(4, rating));

    if (q < 2) {
      repetition = 0;
      interval = 1;
    } else {
      if (repetition === 0) interval = 1;
      else if (repetition === 1) interval = 6;
      else interval = Math.round(interval * easeFactor);
      repetition += 1;
    }

    // Update Ease Factor formula
    easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + interval);

    card.interval = interval;
    card.repetition = repetition;
    card.easeFactor = easeFactor;
    card.nextReviewDate = nextDate;

    await card.save();

    return res.status(200).json({ success: true, data: card });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
