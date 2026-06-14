const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Book name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [200, "Name cannot exceed 200 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      minlength: [2, "Category must be at least 2 characters"],
      maxlength: [100, "Category cannot exceed 100 characters"],
      index: true,
    },
    mimeType: {
      type: String,
      default: "application/octet-stream",
      trim: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9]+\/[a-zA-Z0-9\-+.]+$/.test(v);
        },
        message: "Please provide a valid MIME type (e.g. application/pdf)",
      },
    },
    size: {
      type: Number,
      default: 0,
      min: [0, "File size cannot be negative"],
      max: [52428800, "File size cannot exceed 50MB"],
    },
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "File reference is required"],
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ── Indexes ───────────────────────────────────────────────
bookSchema.index({ name: "text" });

// ── Virtuals ──────────────────────────────────────────────

/** Human-readable file size (e.g. "2.50 MB") */
bookSchema.virtual("sizeInMB").get(function () {
  if (!this.size) return "0 MB";
  return (this.size / (1024 * 1024)).toFixed(2) + " MB";
});

/** True if file exceeds 10 MB */
bookSchema.virtual("isLargeFile").get(function () {
  return this.size > 10 * 1024 * 1024;
});

// ── Pre-save Middleware ───────────────────────────────────

/** Normalize category to lowercase before persisting */
bookSchema.pre("save", function (next) {
  if (this.isModified("category")) {
    this.category = this.category.trim().toLowerCase();
  }
  next();
});

// ── Static Methods ────────────────────────────────────────

/**
 * Find books by category (case-insensitive).
 * @param {string} category
 */
bookSchema.statics.findByCategory = function (category) {
  return this.find({ category: category.trim().toLowerCase() });
};

/**
 * Full-text search on book name.
 * @param {string} query
 */
bookSchema.statics.findByName = function (query) {
  return this.find(
    { $text: { $search: query } },
    { score: { $meta: "textScore" } },
  ).sort({ score: { $meta: "textScore" } });
};

// ── Instance Methods ──────────────────────────────────────

/**
 * Returns a lean object safe for API responses (strips __v).
 */
bookSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

// ─────────────────────────────────────────────────────────
module.exports = mongoose.model("Book", bookSchema);