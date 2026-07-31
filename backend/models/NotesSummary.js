const mongoose = require("mongoose");

const topicsSchema = new mongoose.Schema(
  {
    chapters: { type: [String], default: [], validate: (v) => v.length <= 10 },
    subtopics: { type: [String], default: [], validate: (v) => v.length <= 10 },
    keywords: { type: [String], default: [], validate: (v) => v.length <= 15 },
  },
  { _id: false }
);

const difficultySchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    explanation: { type: String, required: true, maxlength: 600 },
  },
  { _id: false }
);

const readingTimeSchema = new mongoose.Schema(
  {
    minutes: { type: Number, required: true, min: 1 },
    label: { type: String, required: true, maxlength: 50 },
    pages: { type: Number, default: 0, min: 0 },
  },
  { _id: false }
);

const NotesSummarySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    fileName: { type: String, required: true, trim: true, maxlength: 200 },
    sourceType: { type: String, enum: ["upload", "platform"], required: true },
    sourceUrl: { type: String, default: null, maxlength: 1000 },
    pageCount: { type: Number, default: 0, min: 0 },
    wordCount: { type: Number, default: 0, min: 0 },
    contentHash: { type: String, default: null, index: true },
    summary: { type: String, required: true, maxlength: 3000 },
    topics: { type: topicsSchema, required: true },
    prerequisites: { type: [String], default: [], validate: (v) => v.length <= 10 },
    difficulty: { type: difficultySchema, required: true },
    readingTime: { type: readingTimeSchema, required: true },
    learningOutcomes: { type: [String], default: [], validate: (v) => v.length <= 10 },
  },
  { timestamps: true }
);

NotesSummarySchema.index({ user: 1, fileName: 1 });

NotesSummarySchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model("NotesSummary", NotesSummarySchema);