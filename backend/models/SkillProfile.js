const mongoose = require("mongoose");

const SkillEntrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 50 },
    proficiency: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    category: {
      type: String,
      enum: [
        "DSA",
        "System Design",
        "Languages",
        "Frameworks",
        "Databases",
        "DevOps",
        "Behavioral",
        "Aptitude",
        "Other",
      ],
      default: "Other",
    },
    targetProficiency: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    notes: { type: String, default: "", maxlength: 200 },
  },
  { _id: true }
);

const SkillSnapshotSchema = new mongoose.Schema(
  {
    skills: [SkillEntrySchema],
    recordedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const SkillProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    skills: [SkillEntrySchema],
    snapshots: [SkillSnapshotSchema],
  },
  { timestamps: true }
);

SkillProfileSchema.index({ user: 1 });

module.exports = mongoose.model("SkillProfile", SkillProfileSchema);
