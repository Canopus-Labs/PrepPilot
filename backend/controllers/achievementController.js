const User = require('../models/User');
const { VALID_ACHIEVEMENTS } = require('../constants/achievements');

exports.getAchievements = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('unlockedAchievements lastPracticeDate currentStreak');
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });

        // Reset streak to 0 if one or more calendar days were missed
        if (user.lastPracticeDate && user.currentStreak > 0) {
            const now = new Date();
            const d1 = new Date(user.lastPracticeDate);
            const utc1 = Date.UTC(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate());
            const utc2 = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
            const diffDays = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
            if (diffDays > 1) {
                user.currentStreak = 0;
                await user.save();
            }
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

    // Reject any ID not in the server-side allowlist
    const unknown = unlockedAchievements.filter((id) => !VALID_ACHIEVEMENTS.has(id));

    if (unknown.length > 0) {
        return res.status(400).json({
            success: false,
            error: `Unknown achievement ID(s): ${unknown.join(', ')}`,
        });
    }

    try {
        // $addToSet is idempotent and additive-only — it never removes
        // achievements the user already earned, and never duplicates.
        await User.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { unlockedAchievements: { $each: unlockedAchievements } } },
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: "A server error occurred" });
    }
};