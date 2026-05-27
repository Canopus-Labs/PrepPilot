const express = require('express')
const {togglePinQuestion, updateQuestionNote,addQuestionToSession} = require("../controllers/questionController");
const {protect} = require("../middlewares/authMiddleware");

const { generalLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

// Apply rate limiter to all question routes
router.use(generalLimiter);

router.post('/add',protect,addQuestionToSession);
router.post('/:id/pin',protect,togglePinQuestion);
router.post('/:id/note', protect, updateQuestionNote);

module.exports = router;