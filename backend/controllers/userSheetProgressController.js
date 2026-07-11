const UserSheetProgress = require("../models/UserSheetProgress");

/**
 * Get all sheet progress entries for the authenticated user.
 * @route GET /api/user/sheet-progress
 */
exports.getAllProgress = async (req, res) => {
  const userId = req.user._id;

  try {
    const progressList = await UserSheetProgress.find({ userId });

    res.json({
      success: true,
      progressList,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * Save or update user progress for a sheet.
 * @route POST /api/user/sheet-progress
 */
exports.saveProgress = async (req, res) => {
  const {
    sheetId,
    followed,
    completedTopics,
    percentage,
  } = req.body;

  const userId = req.user._id;

  // Validate sheetId before using it in a Mongo query
  if (
    typeof sheetId !== "string" ||
    sheetId.trim().length === 0 ||
    sheetId.length > 100
  ) {
    return res.status(400).json({
      success: false,
      error: "Invalid sheetId",
    });
  }

  const validatedSheetId = sheetId.trim();

  try {
    const progress = await UserSheetProgress.findOneAndUpdate(
      {
        userId,
        sheetId: validatedSheetId,
      },
      {
        $set: {
          followed,
          completedTopics,
          percentage,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.json({
      success: true,
      progress,
    });
  } catch (err) {
    // Rare duplicate-key race during concurrent upserts.
    if (err.code === 11000) {
      try {
        const progress = await UserSheetProgress.findOne({
          userId,
          sheetId: validatedSheetId,
        });

        return res.json({
          success: true,
          progress,
        });
      } catch (retryErr) {
        return res.status(500).json({
          success: false,
          error: retryErr.message,
        });
      }
    }

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * Get progress for a specific sheet for the authenticated user.
 * @route GET /api/user/sheet-progress/:sheetId
 */
exports.getProgress = async (req, res) => {
  const { sheetId } = req.params;
  const userId = req.user._id;

  // Validate sheetId before using it in a Mongo query
  if (
    typeof sheetId !== "string" ||
    sheetId.trim().length === 0 ||
    sheetId.length > 100
  ) {
    return res.status(400).json({
      success: false,
      error: "Invalid sheetId",
    });
  }

  const validatedSheetId = sheetId.trim();

  try {
    const progress = await UserSheetProgress.findOne({
      userId,
      sheetId: validatedSheetId,
    });

    res.json({
      success: true,
      progress,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};