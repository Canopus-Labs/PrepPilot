const User = require('../models/User');
const Session = require('../models/Session');
const Resume = require('../models/Resume');
const UserSheetProgress = require('../models/UserSheetProgress');
const { VALID_ACHIEVEMENTS, ACHIEVEMENT_THRESHOLDS } = require('../constants/achievements');

// Counts the user's real engagement per category, derived from actual
// records rather than anything the client claims.
const COUNT_QUERIES = {
    sessions: (userId) => Session.countDocuments({ user: userId }),
    resumes: (userId) => Resume.countDocuments({ user: userId }),
    sheets: (userId) => UserSheetProgress.countDocuments({ userId, followed: true }),
};

// Computes the set of achievements the user has actually earned.
async function computeEarnedAchievements(userId) {
    const categories = new Set(
        Object.values(ACHIEVEMENT_THRESHOLDS).map((spec) => spec.category),
    );
    const counts = {};
    for (const category of categories) {
        counts[category] = await COUNT_QUERIES[category](userId);
    }

    const earned = new Set();
    for (const [id, spec] of Object.entries(ACHIEVEMENT_THRESHOLDS)) {
        if (counts[spec.category] >= spec.min) earned.add(id);
    }
    return earned;
}

exports.getAchievements = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('unlockedAchievements');
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });
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
        // Server-side verification: only achievements whose earn condition is
        // met by real user data are persisted. The allowlist above is
        // defense-in-depth, never the sole authority.
        const earned = await computeEarnedAchievements(req.user._id);
        const granted = unlockedAchievements.filter((id) => earned.has(id));
        const rejected = unlockedAchievements.filter((id) => !earned.has(id));

        if (granted.length > 0) {
            // $addToSet is idempotent and additive-only — it never removes
            // achievements the user already earned, and never duplicates.
            await User.findByIdAndUpdate(
                req.user._id,
                { $addToSet: { unlockedAchievements: { $each: granted } } },
            );
        }
        res.json({ success: true, granted, rejected });
    } catch (err) {
        res.status(500).json({ success: false, error: "A server error occurred" });
    }
};