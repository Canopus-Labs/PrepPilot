const User = require('../models/User');
const { VALID_ACHIEVEMENTS } = require('../constants/achievements');

exports.getAchievements = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('unlockedAchievements');
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });
        res.json({ success: true, unlockedAchievements: user.unlockedAchievements });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.saveAchievements = async (req, res) => {
    const { unlockedAchievements } = req.body;

    // Must be a non-empty array
    if (!Array.isArray(unlockedAchievements)) {
        return res.status(400).json({
            success: false,
            error: 'unlockedAchievements must be an array',
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
        res.status(500).json({ success: false, error: err.message });
    }
};