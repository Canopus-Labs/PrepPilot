const mongoose = require("mongoose");

// A single checklist-style item (used for subtasks and testing checklist items)
const ChecklistItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
    notes: { type: String, default: "", trim: true },
  },
  { _id: false }
);

const MilestoneSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    // Drives the Kanban board column. Auto-derived from subtasks when present,
    // otherwise toggled manually by the user.
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    notes: { type: String, default: "", trim: true },
    subtasks: { type: [ChecklistItemSchema], default: [] },
  },
  { _id: false }
);

const roadmapProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    projectIdea: {
      type: String,
      required: [true, "Project idea is required"],
      trim: true,
    },

    // Answers collected from the follow-up questionnaire
    answers: {
      targetAudience: { type: String, default: "", trim: true },
      problemSolved: { type: String, default: "", trim: true },
      appType: { type: String, default: "", trim: true },
      mvpFeatures: { type: String, default: "", trim: true },
      techPreferences: { type: String, default: "", trim: true },
      designStyle: { type: String, default: "", trim: true },
      accessibilityBranding: { type: String, default: "", trim: true },
      timeline: { type: String, default: "", trim: true },
    },

    // AI-generated roadmap content
    overview: { type: String, default: "", trim: true },
    techStack: {
      frontend: { type: [String], default: [] },
      backend: { type: [String], default: [] },
      database: { type: [String], default: [] },
      other: { type: [String], default: [] },
    },
    uiUxRecommendations: { type: [String], default: [] },
    milestones: { type: [MilestoneSchema], default: [] },
    featurePrioritization: {
      mvp: { type: [String], default: [] },
      future: { type: [String], default: [] },
    },
    databaseApiSuggestions: { type: [String], default: [] },
    deploymentRecommendations: { type: [String], default: [] },
    testingChecklist: { type: [ChecklistItemSchema], default: [] },

    // Progress + workflow metadata
    progressPercent: { type: Number, default: 0, min: 0, max: 100 },
    status: {
      type: String,
      enum: ["planning", "in-progress", "completed"],
      default: "planning",
    },
    lastStep: { type: Number, default: 0 }, // resume-from-where-you-left-off pointer for the questionnaire
  },
  { timestamps: true }
);

/**
 * Recompute progressPercent from milestone subtask + testing checklist completion.
 * Called before saving whenever tasks are toggled.
 */
roadmapProjectSchema.methods.recomputeProgress = function () {
  let total = 0;
  let done = 0;

  this.milestones.forEach((m) => {
    if (m.subtasks && m.subtasks.length > 0) {
      m.subtasks.forEach((s) => {
        total += 1;
        if (s.completed) done += 1;
      });
    } else {
      total += 1;
      if (m.completed) done += 1;
    }
  });

  this.testingChecklist.forEach((t) => {
    total += 1;
    if (t.completed) done += 1;
  });

  this.progressPercent = total === 0 ? 0 : Math.round((done / total) * 100);

  // Keep milestone.completed / status in sync with its subtasks
  this.milestones.forEach((m) => {
    if (m.subtasks && m.subtasks.length > 0) {
      const doneCount = m.subtasks.filter((s) => s.completed).length;
      m.completed = doneCount === m.subtasks.length;
      if (m.completed) m.status = "done";
      else if (doneCount > 0) m.status = "in-progress";
      else if (m.status === "done") m.status = "todo";
    } else {
      m.completed = m.status === "done";
    }
  });

  if (this.progressPercent === 100 && total > 0) {
    this.status = "completed";
  } else if (this.progressPercent > 0) {
    this.status = "in-progress";
  } else {
    this.status = "planning";
  }

  return this.progressPercent;
};

roadmapProjectSchema.index({ userId: 1, updatedAt: -1 });

module.exports = mongoose.model("RoadmapProject", roadmapProjectSchema);