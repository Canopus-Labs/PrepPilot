const UserSheetProgress = require("../models/UserSheetProgress");

/**
 * Get all sheet progress entries for the authenticated user.
 * @route GET /api/user/sheet-progress
 */
exports.getAllProgress = async (req, res, next) => {
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
      error: "Internal server error occurred",
    });
  }
        next(err);
    }
};

/**
 * Save or update user progress for a sheet.
 * @route POST /api/user/sheet-progress
 */
exports.saveProgress = async (req, res, next) => {
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

  // Build update fields only for fields that are explicitly defined in the request.
  // This prevents $set from clearing fields when a client sends a partial payload.
  const updateFields = {};
  if (followed !== undefined) updateFields.followed = followed;
  if (completedTopics !== undefined) updateFields.completedTopics = completedTopics;
  if (percentage !== undefined) updateFields.percentage = percentage;

  try {
    const progress = await UserSheetProgress.findOneAndUpdate(
      {
        userId,
        sheetId: validatedSheetId,
      },
      {
        $set: updateFields,
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
        next(err);
    }

    return res.status(500).json({
      success: false,
      error: "Internal server error occurred",
    });
  }
};

/**
 * Get progress for a specific sheet for the authenticated user.
 * @route GET /api/user/sheet-progress/:sheetId
 */
exports.getProgress = async (req, res, next) => {
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
      error: "Internal server error occurred",
    });
  }
        next(err);
    }
};