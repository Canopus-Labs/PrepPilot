const UserSheetProgress = require("../models/UserSheetProgress");
const {
  normalizeProgressItems,
  buildBulkOps,
} = require("../utils/sheetProgressImport");

/**
 * Get all sheet progress entries for the authenticated user.
 * @route GET /api/user/sheet-progress
 */
exports.getAllProgress = async (req, res) => {
  const userId = req.user._id;

  try {
    const progressList = await UserSheetProgress.find({ userId }).limit(50);

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

  // Validate optional update fields if provided
  if (followed !== undefined && typeof followed !== "boolean") {
    return res.status(400).json({
      success: false,
      error: "Invalid followed field, must be a boolean",
    });
  }

  if (completedTopics !== undefined && !Array.isArray(completedTopics)) {
    return res.status(400).json({
      success: false,
      error: "Invalid completedTopics field, must be an array",
    });
  }

  if (
    percentage !== undefined &&
    (typeof percentage !== "number" ||
      Number.isNaN(percentage) ||
      percentage < 0 ||
      percentage > 100)
  ) {
    return res.status(400).json({
      success: false,
      error: "Invalid percentage field, must be a number between 0 and 100",
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
    // Rare duplicate-key race during concurrent upserts.
    if (err.code === 11000) {
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
            new: true,
          }
        );

        return res.json({
          success: true,
          progress,
        });
      } catch (retryErr) {
        return res.status(500).json({
          success: false,
          error: "Internal server error occurred",
        });
      }
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
      error: "Internal server error occurred",
    });
  }
};

/**
 * Reset (clear) progress for a specific sheet for the authenticated user.
 * @route DELETE /api/user/sheet-progress/:sheetId
 */
exports.resetProgress = async (req, res) => {
  const { sheetId } = req.params;
  const userId = req.user._id;

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
      { userId, sheetId: validatedSheetId },
      { $set: { completedTopics: {}, percentage: 0 } },
      { new: true }
    );

    return res.json({
      success: true,
      progress: progress || null,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Internal server error occurred",
    });
  }
};

/**
 * Export all sheet progress for the authenticated user as a JSON file.
 * @route GET /api/user/sheet-progress/export
 */
exports.exportProgress = async (req, res) => {
  const userId = req.user._id;

  try {
    const progressList = await UserSheetProgress.find({ userId }).lean();
    const backup = {
      version: 1,
      exportedAt: new Date().toISOString(),
      count: progressList.length,
      items: progressList.map((p) => ({
        sheetId: p.sheetId,
        followed: p.followed,
        completedTopics: p.completedTopics,
        percentage: p.percentage,
        updatedAt: p.updatedAt,
      })),
    };

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="sheet-progress-backup.json"'
    );
    res.send(JSON.stringify(backup, null, 2));
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal server error occurred",
    });
  }
};

/**
 * Import sheet progress entries for the authenticated user.
 * Valid entries are bulk-upserted; invalid ones are skipped and reported.
 * @route POST /api/user/sheet-progress/import
 */
exports.importProgress = async (req, res) => {
  const userId = req.user._id;
  const { items } = req.body || {};

  const { items: normalized, errors } = normalizeProgressItems(items);
  if (errors.length > 0 && normalized.length === 0) {
    return res.status(400).json({
      success: false,
      error: errors[0],
    });
  }

  if (normalized.length === 0) {
    return res.status(400).json({
      success: false,
      error: "No valid entries to import",
    });
  }

  try {
    const result = await UserSheetProgress.bulkWrite(
      buildBulkOps(userId, normalized),
      { ordered: false }
    );

    res.json({
      success: true,
      imported: normalized.length,
      skipped: errors.length,
      updated: result.matchedCount || 0,
      created: result.upsertedCount || 0,
      warnings: errors.slice(0, 20),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal server error occurred",
    });
  }
};