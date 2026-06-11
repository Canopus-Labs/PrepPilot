/**
 * Get all sheet progress entries for the authenticated user.
 * @route GET /api/user/sheet-progress
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When retrieval fails.
 * @example
 * GET /api/user/sheet-progress
 * Authorization: Bearer eyJhb...
 * @example
 * 200 {"success": true, "progressList": [{"sheetId":"...","percentage":80}]}
 */
exports.getAllProgress = async (req, res) => {
  const userId = req.user._id;
  try {
    const progressList = await UserSheetProgress.find({ userId });
    res.json({ success: true, progressList });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const UserSheetProgress = require('../models/UserSheetProgress');

/**
 * Save or update user progress for a sheet.
 * @route POST /api/user/sheet-progress
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When saving fails.
 * @example
 * POST /api/user/sheet-progress
 * Authorization: Bearer eyJhb...
 * {
 *   "sheetId": "arrays",
 *   "followed": true,
 *   "completedTopics": ["Two Pointers","Sliding Window"],
 *   "percentage": 60
 * }
 * @example
 * 200 {"success": true, "progress": {"sheetId":"arrays","percentage":60}}
 */
exports.saveProgress = async (req, res) => {
  const { sheetId, followed, completedTopics, percentage } = req.body;
  const userId = req.user._id;

  try {
    let progress = await UserSheetProgress.findOne({ userId, sheetId });
    if (progress) {
      progress.followed = followed;
      progress.completedTopics = completedTopics;
      progress.percentage = percentage;
      await progress.save();
    } else {
      progress = await UserSheetProgress.create({
        userId,
        sheetId,
        followed,
        completedTopics,
        percentage,
      });
    }
    res.json({ success: true, progress });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Get progress for a specific sheet for the authenticated user.
 * @route GET /api/user/sheet-progress/:sheetId
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When retrieval fails.
 * @example
 * GET /api/user/sheet-progress/arrays
 * Authorization: Bearer eyJhb...
 * @example
 * 200 {"success": true, "progress": {"sheetId":"arrays","percentage":60}}
 */
exports.getProgress = async (req, res) => {
  const { sheetId } = req.params;
  const userId = req.user._id;
  try {
    const progress = await UserSheetProgress.findOne({ userId, sheetId });
    res.json({ success: true, progress });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
