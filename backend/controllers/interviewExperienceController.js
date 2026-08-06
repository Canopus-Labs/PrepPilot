const InterviewExperience = require("../models/InterviewExperience");

const toClientShape = (doc) => {
  const obj = typeof doc.toObject === "function" ? doc.toObject() : doc;
  return {
    id: String(obj._id),
    company: obj.company,
    role: obj.role,
    experience: obj.experience,
    difficulty: obj.difficulty,
    offerReceived: obj.offerReceived,
    date: obj.date,
    rounds: obj.rounds || [],
    summary: obj.summary,
    tips: obj.tips || [],
    tags: obj.tags || [],
    color: obj.color,
    status: obj.status,
    createdAt: obj.createdAt,
  };
};

/**
 * @desc Submit an interview experience for moderation
 * @route POST /api/interview-experiences
 * @access Public (optional auth)
 */
const createInterviewExperience = async (req, res) => {
  try {
    const payload = { ...req.body, status: "pending" };
    if (req.user?._id) {
      payload.userId = req.user._id;
    }

    if (!payload.color && payload.company) {
      payload.color = `hsl(${(payload.company.charCodeAt(0) * 37) % 360}, 55%, 50%)`;
    }

    const experience = await InterviewExperience.create(payload);

    return res.status(201).json({
      success: true,
      message: "Interview experience submitted for review",
      experience: toClientShape(experience),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to submit interview experience",
      error: "A server error occurred",
    });
  }
};

/**
 * @desc List approved community experiences
 * @route GET /api/interview-experiences/approved
 * @access Public
 */
const getApprovedInterviewExperiences = async (req, res) => {
  try {
    const experiences = await InterviewExperience.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      experiences: experiences.map(toClientShape),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load approved experiences",
      error: "A server error occurred",
    });
  }
};

/**
 * @desc Load a visitor's own submissions by client key and/or auth
 * @route GET /api/interview-experiences/mine
 * @access Public (clientKey query) / Private
 */
const getMyInterviewExperiences = async (req, res) => {
  try {
    const clientKey =
      typeof req.query.clientKey === "string" ? req.query.clientKey.trim() : "";
    const filters = [];

    if (req.user?._id) {
      filters.push({ userId: req.user._id });
    }
    if (clientKey) {
      filters.push({ clientKey });
    }

    if (filters.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide clientKey or authenticate to load your submissions",
      });
    }

    const experiences = await InterviewExperience.find({ $or: filters })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      experiences: experiences.map(toClientShape),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load your submissions",
      error: "A server error occurred",
    });
  }
};

/**
 * @desc Update moderation status
 * @route PATCH /api/interview-experiences/:id/status
 * @access Private
 */
const updateInterviewExperienceStatus = async (req, res) => {
  try {
    const experience = await InterviewExperience.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Interview experience not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Experience marked as ${experience.status}`,
      experience: toClientShape(experience),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update experience status",
      error: "A server error occurred",
    });
  }
};

module.exports = {
  createInterviewExperience,
  getApprovedInterviewExperiences,
  getMyInterviewExperiences,
  updateInterviewExperienceStatus,
  toClientShape,
};
