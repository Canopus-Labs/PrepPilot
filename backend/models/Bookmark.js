const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    answer: {
      type: String,
      default: "",
      maxlength: 2000,
    },
    category: {
      type: String,
      enum: [
        "DSA",
        "System Design",
        "Behavioral",
        "Aptitude",
        "Coding",
        "OS",
        "DBMS",
        "Networking",
        "Other",
      ],
      default: "DSA",
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    tags: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
      default: "",
      maxlength: 500,
    },
    source: {
      type: String,
      enum: ["manual", "session", "sheet", "imported"],
      default: "manual",
    },
    sourceRef: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    starred: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

BookmarkSchema.index({ user: 1, category: 1 });
BookmarkSchema.index({ user: 1, starred: 1 });
BookmarkSchema.index({ user: 1, tags: 1 });

module.exports = mongoose.model("Bookmark", BookmarkSchema);
