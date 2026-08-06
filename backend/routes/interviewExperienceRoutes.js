const express = require("express");
const router = express.Router();
const {
  protect,
  optionalProtect,
  requireModerator,
} = require("../middlewares/authMiddleware");
const {
  validateCreateInterviewExperience,
  validateUpdateInterviewExperienceStatus,
} = require("../Input_validators/ValidateInterviewExperience");
const {
  createInterviewExperience,
  getApprovedInterviewExperiences,
  getMyInterviewExperiences,
  updateInterviewExperienceStatus,
} = require("../controllers/interviewExperienceController");

router.get("/approved", getApprovedInterviewExperiences);
router.get("/mine", optionalProtect, getMyInterviewExperiences);
router.post(
  "/",
  optionalProtect,
  validateCreateInterviewExperience,
  createInterviewExperience,
);
router.patch(
  "/:id/status",
  protect,
  requireModerator,
  validateUpdateInterviewExperienceStatus,
  updateInterviewExperienceStatus,
);

module.exports = router;
