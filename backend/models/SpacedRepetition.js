const mongoose = require("mongoose");

const SpacedRepetitionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "General",
    },
    // SuperMemo-2 Parameters
    interval: {
      type: Number,
      default: 1, // in days
    },
    repetition: {
      type: Number,
      default: 0,
    },
    easeFactor: {
      type: Number,
      default: 2.5,
    },
    nextReviewDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SpacedRepetition", SpacedRepetitionSchema);
