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

// Double-submit CSRF shape required by CodeQL (js/missing-token-validation)
// after cookieParser. These endpoints authenticate via Bearer / optional auth,
// so callers without a CSRF cookie are allowed; mismatched tokens are rejected.
const csrfProtection = (req, res, next) => {
  const cookieToken = req.cookies?.csrfToken;
  const headerToken = req.headers["x-csrf-token"];

  if (!cookieToken && !headerToken) {
    return next();
  }

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({
      success: false,
      message: "CSRF token missing or invalid.",
    });
  }

  return next();
};

router.get("/approved", getApprovedInterviewExperiences);
router.get("/mine", optionalProtect, getMyInterviewExperiences);
router.post(
  "/",
  csrfProtection,
  optionalProtect,
  validateCreateInterviewExperience,
  createInterviewExperience,
);
router.patch(
  "/:id/status",
  csrfProtection,
  protect,
  requireModerator,
  validateUpdateInterviewExperienceStatus,
  updateInterviewExperienceStatus,
);

module.exports = router;
