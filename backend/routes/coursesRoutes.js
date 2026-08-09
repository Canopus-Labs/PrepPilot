const express = require("express");
const path = require("path");
const router = express.Router();
const { setCacheControl } = require("../middlewares/cacheMiddleware");

/**
 * Serve all free courses data from the local JSON file.
 * @route GET /api/courses
 * @returns {Array} Array of course category objects with cards
 * @example
 * GET /api/courses
 * @example
 * 200 [{ "title": "AI Tools", "cards": [...] }, ...]
 */
router.get("/", setCacheControl(86400), (req, res) => {
  try {
    const data = require(path.join(__dirname, "../data/allcourses.json"));
    res.json(data);
  } catch (err) {
    console.error("[courses] Failed to load allcourses.json:", err.message);
    res.status(500).json({ error: "Failed to load courses data." });
  }
});

module.exports = router;
