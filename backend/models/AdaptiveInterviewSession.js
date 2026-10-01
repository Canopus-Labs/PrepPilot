const mongoose = require("mongoose");

const adaptiveQuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  userAnswer: { type: String, default: "" },
  feedback: {
    correctnessScore: { type: Number, min: 0, max: 100, default: null },
    explanationScore: { type: Number, min: 0, max: 100, default: null },
    approachFeedback: { type: String, default: "" },
    generalFeedback: { type: String, default: "" }
  },
  overallScore: { type: Number, min: 0, max: 100, default: null },
  isAnswered: { type: Boolean, default: false }
});

const adaptiveInterviewSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  role: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  topics: { type: [String], required: true },
  status: { type: String, enum: ["in-progress", "completed"], default: "in-progress" },
  currentDifficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Medium" },
  maxQuestions: { type: Number, default: 5 },
  questions: [adaptiveQuestionSchema],
  finalReport: {
    totalScore: { type: Number, default: null },
    improvementAreas: { type: [String], default: [] },
    topicPerformance: { type: mongoose.Schema.Types.Mixed, default: {} }
  }
}, { timestamps: true });

module.exports = mongoose.model("AdaptiveInterviewSession", adaptiveInterviewSessionSchema);
