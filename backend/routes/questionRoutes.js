const express = require('express')
const {
  togglePinQuestion,
  updateQuestionNote,
  addQuestionToSession,
  getMyQuestions,
} = require("../controllers/questionController");
const {protect} = require("../middlewares/authMiddleware");

const { generalLimiter } = require("../middlewares/rateLimiter");
const { validateAddQuestionToSession, validateTogglePinQuestion, validateUpdateQuestionNote, validateGetMyQuestions } = require('../Input_validators/ValidateQuestions');
const router = express.Router();

/**
 * Apply rate limiter to all question routes.
 */
router.use(generalLimiter, protect);

/**
 * Get all questions for the authenticated user across their sessions.
 * @route GET /api/questions/my-questions
 */
router.get('/my-questions', validateGetMyQuestions, getMyQuestions);

/**
 * Add new questions to an existing session.
 * @route POST /api/question/add
 */
router.post('/add',validateAddQuestionToSession, addQuestionToSession);

/**
 * Toggle pin state for a specific question.
 * @route POST /api/question/:id/pin
 */
router.post('/:id/pin',validateTogglePinQuestion,togglePinQuestion);

/**
 * Update the note field for a specific question.
 * @route POST /api/question/:id/note
 */
router.post('/:id/note', validateUpdateQuestionNote, updateQuestionNote);

module.exports = router;