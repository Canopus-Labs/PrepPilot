const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    question: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "Answer text is required"],
      trim: true,
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
    sourceId: {
      type: String,
      default: null,
    },
    interval: {
      type: Number,
      default: 0, // Interval in days until next review
    },
    repetition: {
      type: Number,
      default: 0, // Number of consecutive successful reviews
    },
    efactor: {
      type: Number,
      default: 2.5, // SuperMemo SM-2 Ease Factor
    },
    dueDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    lastReviewedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flashcard", flashcardSchema);
