const mongoose = require("mongoose");

const StudyGoalSchema = new mongoose.Schema(
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
      trim: true,
      maxlength: 120,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "DSA",
        "System Design",
        "Behavioral",
        "Aptitude",
        "Coding Practice",
        "Mock Interview",
        "Resume Review",
        "Other",
      ],
      default: "DSA",
    },
    // Weekly target in minutes
    weeklyTargetMinutes: {
      type: Number,
      required: true,
      min: 15,
      max: 300,
    },
    // Current week progress (resets every Monday)
    currentWeekMinutes: {
      type: Number,
      default: 0,
    },
    weekStartDate: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    completedWeeks: {
      type: Number,
      default: 0,
    },
    totalWeeksTracked: {
      type: Number,
      default: 0,
    },
    // Weekly history for analytics (last 12 weeks)
    weeklyHistory: [
      {
        weekStart: Date,
        weekEnd: Date,
        targetMinutes: Number,
        actualMinutes: Number,
        sessionsLogged: Number,
        completed: Boolean,
      },
    ],
    // Daily log for current week
    dailyLog: [
      {
        date: { type: Date, required: true },
        minutes: { type: Number, default: 0 },
        notes: { type: String, default: "", maxlength: 300 },
      },
    ],
    // Color theme for UI
    color: {
      type: String,
      default: "blue",
      enum: ["blue", "green", "purple", "orange", "red", "teal", "pink"],
    },
  },
  { timestamps: true }
);

// Index for efficient queries
StudyGoalSchema.index({ user: 1, isActive: 1 });

// Virtual for completion percentage
StudyGoalSchema.virtual("completionPercentage").get(function () {
  if (this.weeklyTargetMinutes === 0) return 0;
  return Math.min(
    100,
    Math.round((this.currentWeekMinutes / this.weeklyTargetMinutes) * 100)
  );
});

// Ensure virtuals are included in JSON
StudyGoalSchema.set("toJSON", { virtuals: true });
StudyGoalSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("StudyGoal", StudyGoalSchema);
