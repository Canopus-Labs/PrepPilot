const express = require('express');
const router = express.Router();
const { compileResume, analyzeResume, saveResume, getMyResumes } = require('../controllers/resumeController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// @route   POST /api/resume/compile
// @desc    Compile LaTeX code to PDF
router.post('/compile', compileResume);

// @route   POST /api/resume/analyze
// @desc    Analyze resume using Gemini API
router.post('/analyze', upload.single("resume"), analyzeResume);

// @route   POST /api/resume/save
// @desc    Save or update a resume
router.post('/save', protect, saveResume);

// @route   GET /api/resume/my-resumes
// @desc    Get all saved resumes for logged-in user
router.get('/my-resumes', protect, getMyResumes);

module.exports = router;
