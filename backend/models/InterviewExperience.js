const mongoose = require("mongoose");

const roundSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: "Round" },
    type: { type: String, trim: true, default: "Coding" },
    description: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const interviewExperienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
      maxlength: 120,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
      maxlength: 120,
    },
    experience: {
      type: String,
      trim: true,
      default: "N/A",
      maxlength: 60,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    offerReceived: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      trim: true,
      default: "",
    },
    rounds: {
      type: [roundSchema],
      default: [],
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
      maxlength: 5000,
    },
    tips: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    color: {
      type: String,
      default: "hsl(260, 55%, 50%)",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    clientKey: {
      type: String,
      trim: true,
      default: null,
      index: true,
      maxlength: 64,
    },
    // One key per modal submission so lost-response retries do not duplicate.
    idempotencyKey: {
      type: String,
      trim: true,
      default: null,
      maxlength: 64,
    },
  },
  { timestamps: true },
);

// Idempotency is scoped to the author so a re-used key can never collide
// with another submitter's document: authenticated submissions dedupe by
// userId, anonymous submissions by clientKey.
interviewExperienceSchema.index(
  { userId: 1, idempotencyKey: 1 },
  {
    unique: true,
    partialFilterExpression: {
      userId: { $type: "objectId" },
      idempotencyKey: { $type: "string", $gt: "" },
    },
  },
);

interviewExperienceSchema.index(
  { clientKey: 1, idempotencyKey: 1 },
  {
    unique: true,
    partialFilterExpression: {
      clientKey: { $type: "string", $gt: "" },
      idempotencyKey: { $type: "string", $gt: "" },
    },
  },
);

module.exports = mongoose.model("InterviewExperience", interviewExperienceSchema);
