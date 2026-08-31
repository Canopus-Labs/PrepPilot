const mongoose = require("mongoose");

const repetitionStateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    flashcardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flashcard",
      required: true,
    },
    easinessFactor: {
      type: Number,
      default: 2.5,
    },
    interval: {
      type: Number,
      default: 0,
    },
    repetitions: {
      type: Number,
      default: 0,
    },
    nextReviewDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RepetitionState", repetitionStateSchema);
