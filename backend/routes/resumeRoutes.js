const express = require('express');
const router = express.Router();
const {
    compileResume,
    analyzeResume,
    saveResume,
    getMyResumes,
    getResumeById,
    updateResume,
    deleteResume
} = require('../controllers/resumeController');
const { protect } = require('../middlewares/authMiddleware');
<<<<<<< HEAD
const { uploadResume } = require('../middlewares/uploadMiddleware');
=======
const { upload, uploadResume } = require('../middlewares/uploadMiddleware');
const { aiLimiter } = require('../middlewares/rateLimiter');
>>>>>>> e3e9615988419aac90062a9c382f60ff9c5ef0b7

// @route   POST /api/resume/compile
// @desc    Compile LaTeX code to PDF
// @access  Private — requires auth; aiLimiter caps external texlive.net calls to 20/hr per IP
router.post('/compile', protect, aiLimiter, compileResume);

// @route   POST /api/resume/analyze
// @desc    Analyze resume using Gemini API
// @access  Private — requires auth; aiLimiter caps Gemini API calls to 20/hr per IP
router.post('/analyze', protect, aiLimiter, uploadResume.single("resume"), analyzeResume);

// @route   POST /api/resume/save
// @desc    Save or update a resume
// @access  Private
router.post('/save', protect, saveResume);

// @route   GET /api/resume/my-resumes
// @desc    Get all saved resumes for logged-in user
// @access  Private
router.get('/my-resumes', protect, getMyResumes);

<<<<<<< HEAD
// @route   GET /api/resume/:id
// @desc    Get a saved resume owned by the logged-in user
router.get('/:id', protect, getResumeById);

// @route   PUT /api/resume/:id
// @desc    Update a saved resume owned by the logged-in user
router.put('/:id', protect, updateResume);

// @route   DELETE /api/resume/:id
// @desc    Delete a saved resume owned by the logged-in user
router.delete('/:id', protect, deleteResume);

module.exports = router;
=======
module.exports = router;
>>>>>>> e3e9615988419aac90062a9c382f60ff9c5ef0b7
