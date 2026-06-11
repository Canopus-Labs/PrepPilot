const express = require('express')
const {togglePinQuestion, updateQuestionNote,addQuestionToSession} = require("../controllers/questionController");
const {protect} = require("../middlewares/authMiddleware");

const { generalLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

/**
 * Apply rate limiter to all question routes.
 */
router.use(generalLimiter);

/**
 * Add new questions to an existing session.
 * @route POST /api/question/add
 */
router.post('/add',protect,addQuestionToSession);

/**
 * Toggle pin state for a specific question.
 * @route POST /api/question/:id/pin
 */
router.post('/:id/pin',protect,togglePinQuestion);

/**
 * Update the note field for a specific question.
 * @route POST /api/question/:id/note
 */
router.post('/:id/note', protect, updateQuestionNote);

module.exports = router;