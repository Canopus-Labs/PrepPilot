const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  validateCreateFlashcard,
  validateReviewFlashcard,
} = require("../Input_validators/ValidateFlashcard");
const {
  createFlashcard,
  getUserFlashcards,
  reviewFlashcard,
  deleteFlashcard,
  getFlashcardStats,
} = require("../controllers/flashcardController");

// Protected routes
router.use(protect);

router.post("/", validateCreateFlashcard, createFlashcard);
router.get("/", getUserFlashcards);
router.get("/stats", getFlashcardStats);
router.put("/:id/review", validateReviewFlashcard, reviewFlashcard);
router.delete("/:id", deleteFlashcard);

module.exports = router;
