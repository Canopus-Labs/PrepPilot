
const mongoose = require("mongoose");

const adaptiveQuestionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
      trim: true
    },
    topic: {
      type: String,
      required: true,
      trim: true
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true
    },
    userAnswer: {
      type: String,
      default: "",
      trim: true
    },
    feedback: {
      correctnessScore: {
        type: Number,
        min: 0,
        max: 100,
        default: null
      },
      explanationScore: {
        type: Number,
        min: 0,
        max: 100,
        default: null
      },
      approachFeedback: {
        type: String,
        default: "",
        trim: true
      },
      generalFeedback: {
        type: String,
        default: "",
        trim: true
      }
    },
    overallScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null
    },
    isAnswered: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const adaptiveInterviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    experienceLevel: {
      type: String,
      required: true,
      trim: true
    },
    topics: {
      type: [{
        type: String,
        trim: true
      }],
      required: true,
      validate: {
        validator: value => value.length > 0,
        message: "At least one topic is required."
      }
    },
    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress"
    },
    currentDifficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium"
    },
    maxQuestions: {
      type: Number,
      min: 1,
      max: 50,
      default: 5,
      validate: {
        validator: Number.isInteger,
        message: "maxQuestions must be an integer."
      }
    },
    questions: {
      type: [adaptiveQuestionSchema],
      default: [],
      validate: {
        validator: function (value) {
          return value.length <= this.maxQuestions;
        },
        message: "Questions cannot exceed maxQuestions."
      }
    },
    finalReport: {
      totalScore: {
        type: Number,
        min: 0,
        max: 100,
        default: null
      },
      improvementAreas: {
        type: [String],
        default: []
      },
      topicPerformance: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
      }
    }
  },
  { timestamps: true }
);

adaptiveInterviewSessionSchema.index({
  user: 1,
  status: 1
});

module.exports = mongoose.model(
  "AdaptiveInterviewSession",
  adaptiveInterviewSessionSchema
);

