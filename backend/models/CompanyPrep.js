const mongoose = require("mongoose");

const CompanyPrepSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["researching", "preparing", "applied", "interviewing", "offer", "rejected", "withdrawn"],
      default: "researching",
    },
    applicationUrl: {
      type: String,
      default: "",
      maxlength: 500,
    },
    salaryRange: {
      type: String,
      default: "",
      maxlength: 80,
    },
    location: {
      type: String,
      default: "",
      maxlength: 100,
    },
    // Readiness 0-100 self-assessed
    readinessScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    // Topics to prepare for this company
    focusTopics: {
      type: [String],
      default: [],
      validate: [(v) => v.length <= 8, "Max 8 focus topics"],
    },
    // Questions encountered in interviews or from research
    encounteredQuestions: [
      {
        question: { type: String, required: true, maxlength: 500 },
        difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Medium" },
        solved: { type: Boolean, default: false },
        notes: { type: String, default: "", maxlength: 300 },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    // Personal notes about the company's process
    processNotes: {
      type: String,
      default: "",
      maxlength: 2000,
    },
    // Interview rounds info
    rounds: [
      {
        name: { type: String, required: true, maxlength: 80 },
        description: { type: String, default: "", maxlength: 300 },
        completed: { type: Boolean, default: false },
        scheduledAt: { type: Date },
      },
    ],
    // Priority for sorting
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    // Deadline for application or interview
    deadline: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

CompanyPrepSchema.index({ user: 1, status: 1 });
CompanyPrepSchema.index({ user: 1, priority: 1 });

module.exports = mongoose.model("CompanyPrep", CompanyPrepSchema);
