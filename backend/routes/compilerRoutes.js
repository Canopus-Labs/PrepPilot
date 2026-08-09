const express = require("express");
const router = express.Router();
const { runCode } = require("../controllers/compilerController");
const { protect } = require("../middlewares/authMiddleware");
const { aiLimiter } = require("../middlewares/rateLimiter");
const { validateCompileCode } = require("../Input_validators/ValidateCompiler");

router.post("/run", aiLimiter, protect, validateCompileCode, runCode);

module.exports = router;
