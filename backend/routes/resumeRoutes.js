const express = require('express');
const router = express.Router();
const { compileResume, analyzeResume, saveResume, getMyResumes, deleteResume } = require('../controllers/resumeController');
const { protect } = require('../middlewares/authMiddleware');
const { upload, uploadResume, validateResumeMagicBytes } = require('../middlewares/uploadMiddleware');
const { aiLimiter } = require('../middlewares/rateLimiter');
const { validateCompileResume, validateAnalyzeResume, validateSaveResume } = require('../Input_validators/ValidateResume');


// @route   POST /api/resume/compile
// @desc    Compile LaTeX code to PDF
// @access  Private — requires auth; aiLimiter caps external texlive.net calls to 20/hr per IP
router.post('/compile', protect, aiLimiter, validateCompileResume, compileResume);

// @route   POST /api/resume/analyze
// @desc    Analyze resume using Gemini API
// @access  Private — requires auth; aiLimiter caps Gemini API calls to 20/hr per IP
router.post('/analyze', protect, aiLimiter, uploadResume.single("resume"), validateResumeMagicBytes, validateAnalyzeResume, analyzeResume);

// @route   POST /api/resume/save
// @desc    Save or update a resume
// @access  Private
router.post('/save', protect, validateSaveResume, saveResume);

// @route   GET /api/resume/my-resumes
// @desc    Get all saved resumes for logged-in user
// @access  Private
router.get('/my-resumes', protect, getMyResumes);

// @route   DELETE /api/resume/:id
// @desc    Delete a saved resume by ID
// @access  Private
router.delete('/:id', protect, deleteResume);

module.exports = router;