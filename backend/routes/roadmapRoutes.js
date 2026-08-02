const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  validateCreateRoadmap,
  validateUpdateRoadmap,
  validateToggleTask,
} = require("../Input_validators/ValidateRoadmap");
const {
  createRoadmap,
  getUserRoadmaps,
  getRoadmapById,
  updateRoadmap,
  toggleTask,
  deleteRoadmap,
} = require("../controllers/roadmapController");

// All roadmap routes require authentication
router.use(protect);

router.post("/", validateCreateRoadmap, createRoadmap);
router.get("/", getUserRoadmaps);
router.get("/:id", getRoadmapById);
router.put("/:id", validateUpdateRoadmap, updateRoadmap);
router.patch("/:id/tasks", validateToggleTask, toggleTask);
router.delete("/:id", deleteRoadmap);

module.exports = router;