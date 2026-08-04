const express = require("express");

const router = express.Router();

const {
  analyzeBehavioralAnswer,
} = require("../controllers/behavioralController");

const { protect } = require("../middlewares/authMiddleware");
const { aiLimiter } = require("../middlewares/rateLimiter");

router.use(protect);

router.post(
  "/analyze",
  aiLimiter,
  analyzeBehavioralAnswer
);

module.exports = router;