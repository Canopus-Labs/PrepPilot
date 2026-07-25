const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  getDueCards,
  addCard,
  reviewCard,
} = require("../controllers/spacedRepetitionController");

router.get("/due", protect, getDueCards);
router.post("/add", protect, addCard);
router.post("/:id/review", protect, reviewCard);

module.exports = router;
