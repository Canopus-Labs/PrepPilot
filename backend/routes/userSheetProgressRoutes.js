const express = require('express');
const {
  saveProgress,
  getProgress,
  getAllProgress,
  exportProgress,
  importProgress,
} = require('../controllers/userSheetProgressController');
const { protect } = require('../middlewares/authMiddleware');
const { validateSaveProgress, validateGetProgress } = require('../Input_validators/ValidateUserSheetProgress');
const router = express.Router();

router.use(protect);

/**
 * Save or update progress for a user sheet.
 * @route POST /api/user/sheet-progress
 */
router.post('/sheet-progress', validateSaveProgress, saveProgress);

/**
 * Export all sheet progress for the authenticated user as a JSON file.
 * @route GET /api/user/sheet-progress/export
 */
router.get('/sheet-progress/export', exportProgress);

/**
 * Import sheet progress entries for the authenticated user.
 * @route POST /api/user/sheet-progress/import
 */
router.post('/sheet-progress/import', importProgress);

/**
 * Get progress for a specific user sheet.
 * @route GET /api/user/sheet-progress/:sheetId
 */
router.get('/sheet-progress/:sheetId', validateGetProgress, getProgress);

/**
 * Get all sheet progress records for the authenticated user.
 * @route GET /api/user/sheet-progress
 */
router.get('/sheet-progress', getAllProgress);

module.exports = router;
