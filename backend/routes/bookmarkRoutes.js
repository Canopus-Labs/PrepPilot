const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  validateCreateBookmark,
  validateUpdateBookmark,
} = require("../Input_validators/ValidateBookmark");
const {
  createBookmark,
  getBookmarks,
  getBookmarkById,
  updateBookmark,
  toggleStar,
  deleteBookmark,
  getTags,
  getStats,
} = require("../controllers/bookmarkController");

router.use(protect);

router.post("/", validateCreateBookmark, createBookmark);
router.get("/", getBookmarks);
router.get("/tags", getTags);
router.get("/stats", getStats);
router.get("/:id", getBookmarkById);
router.put("/:id", validateUpdateBookmark, updateBookmark);
router.patch("/:id/star", toggleStar);
router.delete("/:id", deleteBookmark);

module.exports = router;
