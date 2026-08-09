const express = require("express");
const router = express.Router();
const { runCode } = require("../controllers/compilerController");
const { protect } = require("../middlewares/authMiddleware");
const { aiLimiter } = require("../middlewares/rateLimiter");
const { validateCompileCode } = require("../Input_validators/ValidateCompiler");

router.use(protect);

router.post("/run", aiLimiter, validateCompileCode, runCode);

module.exports = router;
