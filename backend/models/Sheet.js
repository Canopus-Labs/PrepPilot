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
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  followers: { type: Number, default: 0 },
  questions: { type: Number, default: 0 },
  category: { type: String, default: "general" },
  sections: [SectionSchema],
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sheet', SheetSchema);
