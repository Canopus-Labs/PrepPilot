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
  { timestamps: true },
);

// Index for frequently queried fields
bookSchema.index({ name: "text" });

module.exports = mongoose.model("Book", bookSchema);