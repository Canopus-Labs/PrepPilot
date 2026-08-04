const mongoose = require('mongoose');

// Links Schema
const LinkSchema = new mongoose.Schema({
  gfg: String,
  leetcode: String,
  youtube: String
}, { _id: false });

// Subtopic Schema
const SubtopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, default: "Medium" },
  status: { 
    type: String, 
    enum: ['not-started', 'in-progress', 'completed'], 
    default: 'not-started' 
  },
  links: LinkSchema
}, { _id: false });

// Topic Schema
const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  subtopics: [SubtopicSchema]
}, { _id: false });

// Section Schema
const SectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  topics: [TopicSchema]
}, { _id: false });

// Sheet Schema
const SheetSchema = new mongoose.Schema({
  // Sheets are scoped to the user who uploaded them. The id field alone is no
  // longer unique so that different users may each have their own copy of a
  // shared sheet id; ownership is enforced via the compound index below.
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  followers: { type: Number, default: 0 },
  questions: { type: Number, default: 0 },
  category: { type: String, default: "general" },
  sections: [SectionSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  uploadedAt: { type: Date, default: Date.now }
});

// Each user may own at most one sheet per id; a user can never overwrite (or
// read) another user's sheet.
SheetSchema.index({ id: 1, owner: 1 }, { unique: true });

// Guard against recompiling when the same model is loaded through both CJS and
// ESM module graphs in the test runner.
module.exports = mongoose.models.Sheet || mongoose.model('Sheet', SheetSchema);
