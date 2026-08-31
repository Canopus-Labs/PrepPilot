const Bookmark = require("../models/Bookmark");

const MAX_BOOKMARKS = Number(process.env.MAX_BOOKMARKS) || 200;

exports.createBookmark = async (req, res) => {
  try {
    const userId = req.user._id;
    const count = await Bookmark.countDocuments({ user: userId });
    if (count >= MAX_BOOKMARKS) {
      return res.status(400).json({
        success: false,
        message: `Bookmark limit of ${MAX_BOOKMARKS} reached.`,
      });
    }

    const data = req.validatedBody;
    const payload = {
      user: userId,
      question: data.question,
      answer: data.answer || "",
      category: data.category,
      difficulty: data.difficulty,
      tags: data.tags || [],
      notes: data.notes || "",
      source: data.source || "manual",
      sourceRef: data.sourceRef || null,
    };

    const bookmark = await Bookmark.create(payload);
    res.status(201).json({ success: true, bookmark });
  } catch (error) {
    console.error("Create bookmark error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const userId = req.user._id;
    const { category, difficulty, starred, tag, search, page = 1, limit = 20 } = req.query;

    const filter = { user: userId };
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (starred === "true") filter.starred = true;
    if (tag) filter.tags = { $in: [tag.toLowerCase()] };
    if (search) {
      filter.$or = [
        { question: { $regex: search, $options: "i" } },
        { notes: { $regex: search, $options: "i" } },
        { answer: { $regex: search, $options: "i" } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [bookmarks, total] = await Promise.all([
      Bookmark.find(filter).sort({ starred: -1, createdAt: -1 }).skip(skip).limit(limitNum),
      Bookmark.countDocuments(filter),
    ]);

    res.json({
      success: true,
      bookmarks,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error("Get bookmarks error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getBookmarkById = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!bookmark) {
      return res.status(404).json({ success: false, message: "Bookmark not found" });
    }
    res.json({ success: true, bookmark });
  } catch (error) {
    console.error("Get bookmark error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!bookmark) {
      return res.status(404).json({ success: false, message: "Bookmark not found" });
    }
    Object.assign(bookmark, req.validatedBody);
    await bookmark.save();
    res.json({ success: true, bookmark });
  } catch (error) {
    console.error("Update bookmark error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.toggleStar = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!bookmark) {
      return res.status(404).json({ success: false, message: "Bookmark not found" });
    }
    bookmark.starred = !bookmark.starred;
    await bookmark.save();
    res.json({ success: true, bookmark });
  } catch (error) {
    console.error("Toggle star error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!bookmark) {
      return res.status(404).json({ success: false, message: "Bookmark not found" });
    }
    res.json({ success: true, message: "Bookmark deleted" });
  } catch (error) {
    console.error("Delete bookmark error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getTags = async (req, res) => {
  try {
    const tags = await Bookmark.distinct("tags", { user: req.user._id });
    res.json({ success: true, tags: tags.sort() });
  } catch (error) {
    console.error("Get tags error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const [total, byCategory, byDifficulty, starredCount] = await Promise.all([
      Bookmark.countDocuments({ user: userId }),
      Bookmark.aggregate([
        { $match: { user: userId } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Bookmark.aggregate([
        { $match: { user: userId } },
        { $group: { _id: "$difficulty", count: { $sum: 1 } } },
      ]),
      Bookmark.countDocuments({ user: userId, starred: true }),
    ]);

    const categoryBreakdown = {};
    for (const item of byCategory) {
      categoryBreakdown[item._id] = item.count;
    }
    const difficultyBreakdown = {};
    for (const item of byDifficulty) {
      difficultyBreakdown[item._id] = item.count;
    }

    res.json({
      success: true,
      stats: { total, starredCount, categoryBreakdown, difficultyBreakdown },
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
