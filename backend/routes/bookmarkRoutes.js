const express = require("express");
const {
  addBookmark,
  getBookmarks,
  removeBookmark,
} = require("../controllers/bookmarkController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * Create a new bookmark.
 * @route POST /api/bookmarks
 */
router.post("/", protect, addBookmark);

/**
 * Get all bookmarks for the authenticated user (with optional filters).
 * @route GET /api/bookmarks
 */
router.get("/", protect, getBookmarks);

/**
 * Remove a bookmark by ID.
 * @route DELETE /api/bookmarks/:id
 */
router.delete("/:id", protect, removeBookmark);

module.exports = router;
