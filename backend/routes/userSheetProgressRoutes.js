const express = require('express');
const { saveProgress, getProgress } = require('../controllers/userSheetProgressController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();


// Save or update user sheet progress
router.post('/sheet-progress', protect, saveProgress);

// Get user sheet progress for a specific sheet
router.get('/sheet-progress/:sheetId', protect, getProgress);

// Get all sheet progress for the logged-in user
router.get('/sheet-progress', protect, require('../controllers/userSheetProgressController').getAllProgress);

module.exports = router;
