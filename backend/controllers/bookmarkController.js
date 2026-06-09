const Bookmark = require("../models/Bookmark");
const { RESOURCE_TYPE_VALUES } = require("../constants/resourceTypes");

/**
 * Create a new bookmark for the authenticated user.
 * @route POST /api/bookmarks
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When validation fails or duplicate bookmark exists.
 * @example
 * POST /api/bookmarks
 * Authorization: Bearer eyJhb...
 * {
 *   "resourceId": "exp-1",
 *   "resourceType": "INTERVIEW_EXPERIENCE",
 *   "title": "Google SWE Interview",
 *   "description": "5-round process",
 *   "metadata": { "company": "Google", "difficulty": "Hard" }
 * }
 * @example
 * 201 { "success": true, "bookmark": { "_id": "...", ... } }
 */
const addBookmark = async (req, res) => {
  try {
    const { resourceId, resourceType, title, description, metadata } = req.body;

    if (!resourceId || !resourceType || !title) {
      return res.status(400).json({
        success: false,
        message: "resourceId, resourceType, and title are required",
      });
    }

    if (!RESOURCE_TYPE_VALUES.includes(resourceType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid resourceType. Must be one of: ${RESOURCE_TYPE_VALUES.join(", ")}`,
      });
    }

    const bookmark = await Bookmark.create({
      user: req.user._id,
      resourceId,
      resourceType,
      title,
      description: description || "",
      metadata: metadata || {},
    });

    res.status(201).json({ success: true, bookmark });
  } catch (error) {
    // Handle duplicate bookmark (compound unique index violation)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This resource is already bookmarked",
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error occurred",
      error: error.message,
    });
  }
};

/**
 * Fetch bookmarks for the authenticated user with optional filtering, search, and pagination.
 * @route GET /api/bookmarks
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @example
 * GET /api/bookmarks?type=BOOK&search=algorithm&page=1&limit=20
 * Authorization: Bearer eyJhb...
 * @example
 * 200 { "success": true, "bookmarks": [...], "total": 42, "page": 1, "totalPages": 3 }
 */
const getBookmarks = async (req, res) => {
  try {
    const { type, search, page = 1, limit = 20 } = req.query;

    const filter = { user: req.user._id };

    if (type && RESOURCE_TYPE_VALUES.includes(type)) {
      filter.resourceType = type;
    }

    if (search) {
      const searchRegex = new RegExp(search, "i");
      filter.$or = [
        { title: searchRegex },
        { description: searchRegex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const [bookmarks, total] = await Promise.all([
      Bookmark.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Bookmark.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      bookmarks,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error occurred",
      error: error.message,
    });
  }
};

/**
 * Remove a bookmark by its ID. Only the owner can remove their bookmark.
 * @route DELETE /api/bookmarks/:id
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When bookmark is not found or user is not the owner.
 * @example
 * DELETE /api/bookmarks/6426c5a5...
 * Authorization: Bearer eyJhb...
 * @example
 * 200 { "success": true, "message": "Bookmark removed" }
 */
const removeBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: "Bookmark not found",
      });
    }

    if (bookmark.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    await Bookmark.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Bookmark removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error occurred",
      error: error.message,
    });
  }
};

module.exports = {
  addBookmark,
  getBookmarks,
  removeBookmark,
};
