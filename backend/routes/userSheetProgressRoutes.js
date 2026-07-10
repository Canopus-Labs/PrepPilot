const express = require('express');
const { saveProgress, getProgress } = require('../controllers/userSheetProgressController');
const { protect } = require('../middlewares/authMiddleware');
const { validateSaveProgress, validateGetProgress } = require('../Input_validators/ValidateUserSheetProgress');
const router = express.Router();


/**
 * Save or update progress for a user sheet.
 * @route POST /api/user/sheet-progress
 */

router.use(protect);
router.post('/sheet-progress', validateSaveProgress, saveProgress);

/**
 * Get progress for a specific user sheet.
 * @route GET /api/user/sheet-progress/:sheetId
 */
router.get('/sheet-progress/:sheetId', validateGetProgress, getProgress);

/**
 * Get all sheet progress records for the authenticated user.
 * @route GET /api/user/sheet-progress
 */
router.get('/sheet-progress', require('../controllers/userSheetProgressController').getAllProgress);

module.exports = router;
