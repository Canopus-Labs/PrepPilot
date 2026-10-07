const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const { generalLimiter, aiLimiter } = require("../middlewares/rateLimiter");
const {
  getAnalysis,
  getRevisionQueue,
  getAiRecommendations,
} = require("../controllers/weaknessController");

// All weakness routes require authentication
router.use(protect);

router.get("/analysis", generalLimiter, getAnalysis);
router.get("/revision-queue", generalLimiter, getRevisionQueue);
router.post("/ai-recommendations", aiLimiter, getAiRecommendations);

module.exports = router;
