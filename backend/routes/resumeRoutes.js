const express = require('express');
const router = express.Router();
const { compileResume, analyzeResume, saveResume, getMyResumes, deleteResume, getResumeAnalysisHistory, atsMatch } = require('../controllers/resumeController');
const { protect } = require('../middlewares/authMiddleware');
const { upload, uploadResume, validateResumeMagicBytes } = require('../middlewares/uploadMiddleware');
const { aiLimiter } = require('../middlewares/rateLimiter');
const { validateCompileResume, validateAnalyzeResume, validateSaveResume, validateDeleteResume } = require('../Input_validators/ValidateResume');


router.use(protect);
// @route   POST /api/resume/compile
// @desc    Compile LaTeX code to PDF
// @access  Private — requires auth; aiLimiter caps external texlive.net calls to 20/hr per IP
router.post('/compile', aiLimiter,validateCompileResume, compileResume);

// @route   POST /api/resume/analyze
// @desc    Analyze resume using Gemini API
// @access  Private — requires auth; aiLimiter caps Gemini API calls to 20/hr per IP
router.post('/analyze', aiLimiter, uploadResume.single("resume"), validateResumeMagicBytes, validateAnalyzeResume, analyzeResume);

// @route   POST /api/resume/save
// @desc    Save or update a resume
// @access  Private
router.post('/save', validateSaveResume, saveResume);

// @route   GET /api/resume/my-resumes
// @desc    Get all saved resumes for logged-in user
// @access  Private
router.get('/my-resumes', getMyResumes);

// @route   GET /api/resume/analysis-history
// @desc    Get all saved resume analyses for logged-in user
// @access  Private
router.get('/analysis-history', getResumeAnalysisHistory);

// @route   POST /api/resume/ats-match
// @desc    Deterministic keyword-overlap score between a resume and a JD
// @access  Private — pure keyword match, no AI/file, so no aiLimiter needed
router.post('/ats-match', atsMatch);

// @route   DELETE /api/resume/:id
// @desc    Delete a saved resume by ID
// @access  Private
router.delete('/:id', validateDeleteResume, deleteResume);

module.exports = router;