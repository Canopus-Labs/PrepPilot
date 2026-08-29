const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  validateCreateGoal,
  validateUpdateGoal,
  validateLogSession,
} = require("../Input_Validators/ValidateStudyGoal");
const {
  createGoal,
  getMyGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
  logSession,
  getAnalytics,
  getWeeklyHistory,
} = require("../controllers/studyGoalController");

// All routes are authenticated
router.use(protect);

// CRUD
router.post("/", validateCreateGoal, createGoal);
router.get("/", getMyGoals);
router.get("/analytics", getAnalytics);
router.get("/:id", getGoalById);
router.put("/:id", validateUpdateGoal, updateGoal);
router.delete("/:id", deleteGoal);

// Session logging
router.post("/:id/log", validateLogSession, logSession);
router.get("/:id/history", getWeeklyHistory);

module.exports = router;
