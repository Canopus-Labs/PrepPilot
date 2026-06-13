const express = require('express');
const { saveProgress, getProgress } = require('../controllers/userSheetProgressController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();


/**
 * Save or update progress for a user sheet.
 * @route POST /api/user/sheet-progress
 */
router.post('/sheet-progress', protect, saveProgress);

/**
 * Get progress for a specific user sheet.
 * @route GET /api/user/sheet-progress/:sheetId
 */
router.get('/sheet-progress/:sheetId', protect, getProgress);

/**
 * Get all sheet progress records for the authenticated user.
 * @route GET /api/user/sheet-progress
 */
router.get('/sheet-progress', protect, require('../controllers/userSheetProgressController').getAllProgress);

module.exports = router;
