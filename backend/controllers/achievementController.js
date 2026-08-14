const User = require('../models/User');
const { VALID_ACHIEVEMENTS } = require('../constants/achievements');
const { resetStreakIfMissed } = require('../utils/streakTracker');

exports.getAchievements = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('unlockedAchievements lastPracticeDate currentStreak');
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });

        if (resetStreakIfMissed(user)) {
            await user.save();
        }

        res.json({ success: true, unlockedAchievements: user.unlockedAchievements });
    } catch (err) {
        res.status(500).json({ success: false, error: "A server error occurred" });
    }
};

exports.saveAchievements = async (req, res) => {
    const { unlockedAchievements } = req.body;

        if (!unlockedAchievements || !Array.isArray(unlockedAchievements)) {
        return res.status(400).json({
            success: false,
            error: "unlockedAchievements must be a valid array"
        });
    }

    const unknown = unlockedAchievements.filter((id) => !VALID_ACHIEVEMENTS.has(id));

    if (unknown.length > 0) {
        return res.status(400).json({
            success: false,
            error: `Unknown achievement ID(s): ${unknown.join(', ')}`,
        });
    }

    try {
        await User.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { unlockedAchievements: { $each: unlockedAchievements } } },
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: "A server error occurred" });
    }
};