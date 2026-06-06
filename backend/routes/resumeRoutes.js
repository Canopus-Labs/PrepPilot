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
const { uploadResume } = require('../middlewares/uploadMiddleware');

// @route   POST /api/resume/compile
// @desc    Compile LaTeX code to PDF
router.post('/compile', compileResume);

// @route   POST /api/resume/analyze
// @desc    Analyze resume using Gemini API
router.post('/analyze', uploadResume.single("resume"), analyzeResume);

// @route   POST /api/resume/save
// @desc    Save or update a resume
router.post('/save', protect, saveResume);

// @route   GET /api/resume/my-resumes
// @desc    Get all saved resumes for logged-in user
router.get('/my-resumes', protect, getMyResumes);

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
