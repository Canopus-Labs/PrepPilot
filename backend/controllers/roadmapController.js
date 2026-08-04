const mongoose = require("mongoose");
const RoadmapProject = require("../models/RoadmapProject");

const MAX_SAVED_ROADMAPS_PER_USER = 30;

/**
 * @desc Save a newly AI-generated project roadmap
 * @route POST /api/roadmaps
 * @access Private
 */
const createRoadmap = async (req, res) => {
  try {
    const userId = req.user._id;

    const existingCount = await RoadmapProject.countDocuments({ userId });
    if (existingCount >= MAX_SAVED_ROADMAPS_PER_USER) {
      return res.status(400).json({
        success: false,
        message: `You can save up to ${MAX_SAVED_ROADMAPS_PER_USER} roadmaps. Delete an existing one to add a new project.`,
      });
    }

    const roadmap = new RoadmapProject({
      ...req.body,
      userId,
    });
    roadmap.recomputeProgress();
    await roadmap.save();

    return res.status(201).json({
      success: true,
      message: "Roadmap saved to your account",
      roadmap,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to save roadmap",
      error: "A server error occurred",
    });
  }
};

/**
 * @desc Get all saved roadmaps for the authenticated user (dashboard summary)
 * @route GET /api/roadmaps
 * @access Private
 */
const getUserRoadmaps = async (req, res) => {
  try {
    const userId = req.user._id;
    const roadmaps = await RoadmapProject.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(50)
      .select(
        "projectIdea overview progressPercent status milestones testingChecklist createdAt updatedAt lastStep"
      );

    const summaries = roadmaps.map((r) => ({
      _id: r._id,
      projectIdea: r.projectIdea,
      overview: r.overview,
      progressPercent: r.progressPercent,
      status: r.status,
      milestoneCount: r.milestones.length,
      completedMilestoneCount: r.milestones.filter((m) => m.completed).length,
      lastStep: r.lastStep,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      count: summaries.length,
      roadmaps: summaries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch roadmaps",
      error: "A server error occurred",
    });
  }
};

/**
 * @desc Get a single roadmap in full detail
 * @route GET /api/roadmaps/:id
 * @access Private
 */
const getRoadmapById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid roadmap ID" });
    }

    const roadmap = await RoadmapProject.findOne({ _id: id, userId });
    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    return res.status(200).json({ success: true, roadmap });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch roadmap",
      error: "A server error occurred",
    });
  }
};

/**
 * @desc Update a roadmap - edit milestones, swap in a regenerated AI section,
 *       rename the project, or update the questionnaire answers.
 * @route PUT /api/roadmaps/:id
 * @access Private
 */
const updateRoadmap = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const roadmap = await RoadmapProject.findOne({ _id: id, userId });
    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    const editableFields = [
      "projectIdea",
      "answers",
      "overview",
      "techStack",
      "uiUxRecommendations",
      "milestones",
      "featurePrioritization",
      "databaseApiSuggestions",
      "deploymentRecommendations",
      "testingChecklist",
      "lastStep",
    ];

    editableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        roadmap[field] = req.body[field];
      }
    });

    roadmap.recomputeProgress();
    await roadmap.save();

    return res.status(200).json({
      success: true,
      message: "Roadmap updated",
      roadmap,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update roadmap",
      error: "A server error occurred",
    });
  }
};

/**
 * @desc Toggle completion (and/or update notes) of a milestone, subtask, or
 *       testing-checklist item, then recompute overall progress.
 * @route PATCH /api/roadmaps/:id/tasks
 * @access Private
 */
const toggleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { type, milestoneId, taskId, completed, status, notes } = req.body;

    const roadmap = await RoadmapProject.findOne({ _id: id, userId });
    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    if (type === "milestone") {
      const milestone = roadmap.milestones.find((m) => m.id === milestoneId);
      if (!milestone) {
        return res.status(404).json({ success: false, message: "Milestone not found" });
      }
      if (completed !== undefined) milestone.completed = completed;
      if (notes !== undefined) milestone.notes = notes;
      if (status !== undefined) {
        milestone.status = status;
        milestone.completed = status === "done";
      }
      // If a milestone with subtasks is toggled directly, cascade to subtasks
      if (
        (completed !== undefined || status !== undefined) &&
        milestone.subtasks?.length > 0
      ) {
        const nowCompleted = status !== undefined ? status === "done" : completed;
        milestone.subtasks.forEach((s) => (s.completed = nowCompleted));
      }
    } else if (type === "subtask") {
      const milestone = roadmap.milestones.find((m) => m.id === milestoneId);
      if (!milestone) {
        return res.status(404).json({ success: false, message: "Milestone not found" });
      }
      const subtask = milestone.subtasks.find((s) => s.id === taskId);
      if (!subtask) {
        return res.status(404).json({ success: false, message: "Subtask not found" });
      }
      if (completed !== undefined) subtask.completed = completed;
      if (notes !== undefined) subtask.notes = notes;
    } else if (type === "testing") {
      const item = roadmap.testingChecklist.find((t) => t.id === taskId);
      if (!item) {
        return res.status(404).json({ success: false, message: "Checklist item not found" });
      }
      if (completed !== undefined) item.completed = completed;
      if (notes !== undefined) item.notes = notes;
    }

    roadmap.markModified("milestones");
    roadmap.markModified("testingChecklist");
    roadmap.recomputeProgress();
    await roadmap.save();

    return res.status(200).json({
      success: true,
      message: "Progress updated",
      roadmap,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update task",
      error: "A server error occurred",
    });
  }
};

/**
 * @desc Delete a saved roadmap
 * @route DELETE /api/roadmaps/:id
 * @access Private
 */
const deleteRoadmap = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const roadmap = await RoadmapProject.findOneAndDelete({ _id: id, userId });
    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Roadmap deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete roadmap",
      error: "A server error occurred",
    });
  }
};

module.exports = {
  createRoadmap,
  getUserRoadmaps,
  getRoadmapById,
  updateRoadmap,
  toggleTask,
  deleteRoadmap,
};