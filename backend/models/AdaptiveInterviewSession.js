const mongoose = require("mongoose");

const adaptiveQuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
    trim: true,
  },

  topic: {
    type: String,
    required: true,
    trim: true,
  },

  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },

  userAnswer: {
    type: String,
    default: "",
  },

  feedback: {
    correctnessScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },

    explanationScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },

    approachScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },

    approachFeedback: {
      type: String,
      default: "",
    },

    generalFeedback: {
      type: String,
      default: "",
    },
  },

  overallScore: {
    type: Number,
    min: 0,
    max: 100,
    default: null,
  },

  isAnswered: {
    type: Boolean,
    default: false,
  },
});

const adaptiveInterviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    interviewType: {
      type: String,
      required: true,
      trim: true,
      default: "Technical",
    },

    experienceLevel: {
      type: String,
      required: true,
      trim: true,
    },

    topics: {
      type: [String],
      required: true,
      validate: {
        validator: (topics) => Array.isArray(topics) && topics.length > 0,
        message: "At least one topic is required",
      },
    },

    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
    },

    currentDifficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    maxQuestions: {
      type: Number,
      min: 1,
      max: 20,
      default: 5,
    },

    questions: {
      type: [adaptiveQuestionSchema],
      default: [],
    },

    finalReport: {
      totalScore: {
        type: Number,
        min: 0,
        max: 100,
        default: null,
      },

      improvementAreas: {
        type: [String],
        default: [],
      },

      topicPerformance: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AdaptiveInterviewSession",
  adaptiveInterviewSessionSchema
);
