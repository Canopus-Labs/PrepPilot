const express = require("express");
const router  = express.Router();
const { protect }  = require("../middlewares/authMiddleware");
const { getInternships }  = require("../controllers/internshipController");

router.get("/", protect, getInternships);

module.exports = router;
