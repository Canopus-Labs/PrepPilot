const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    mimeType: { type: String, default: "application/octet-stream" },
    size: { type: Number, default: 0 },
    fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Book", bookSchema);
