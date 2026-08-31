const express = require("express");
const router = express.Router();
const { executeCode } = require("../controllers/codeExecutionController");
const { protect } = require("../middlewares/authMiddleware");

// Route: POST /api/execute
// Protected route to execute code in the Docker sandbox
router.post("/", protect, executeCode);

module.exports = router;
