// Get all sheet progress for a user
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

// Save or update user sheet progress
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

// Get user sheet progress
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
