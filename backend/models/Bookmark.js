const mongoose = require("mongoose");
const { RESOURCE_TYPE_VALUES } = require("../constants/resourceTypes");

const BookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resourceId: { type: String, required: true },
    resourceType: {
      type: String,
      enum: RESOURCE_TYPE_VALUES,
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

// Compound unique — prevents duplicate bookmarks for the same resource
BookmarkSchema.index(
  { user: 1, resourceId: 1, resourceType: 1 },
  { unique: true }
);

// Query optimization: default listing sorted by newest
BookmarkSchema.index({ user: 1, createdAt: -1 });

// Query optimization: filtered listing by category
BookmarkSchema.index({ user: 1, resourceType: 1, createdAt: -1 });

module.exports = mongoose.model("Bookmark", BookmarkSchema);
