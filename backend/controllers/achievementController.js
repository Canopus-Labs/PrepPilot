const User = require('../models/User');
const { VALID_ACHIEVEMENTS } = require('../constants/achievements');

/**
 * Server-side evaluation rules mapping verified user actions to achievement IDs.
 * The client NEVER specifies achievement IDs directly.
 */
const EVALUATE_ACHIEVEMENTS = (action, payload = {}) => {
    const unlocked = [];

    switch (action) {
        case 'GAME_COMPLETED':
            if (payload.win) {
                unlocked.push('FIRST_WIN');
            }
            if (payload.score && payload.score >= 1000) {
                unlocked.push('HIGH_SCORE_1000');
            }
            break;

        case 'PROFILE_COMPLETED':
            if (payload.isComplete) {
                unlocked.push('PROFILE_SETUP');
            }
            break;

        default:
            break;
    }

    // Ensure only valid, white-listed achievement IDs are returned
    return unlocked.filter((id) => VALID_ACHIEVEMENTS.has(id));
};

exports.getAchievements = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('unlockedAchievements');
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });
        res.json({ success: true, unlockedAchievements: user.unlockedAchievements });
    } catch (err) {
        res.status(500).json({ success: false, error: 'A server error occurred' });
    }
};

exports.saveAchievements = async (req, res) => {
    const { action, payload } = req.body;

    if (!action || typeof action !== 'string') {
    if (!unlockedAchievements || !Array.isArray(unlockedAchievements)) {
        return res.status(400).json({
            success: false,
            error: 'A valid action event string is required'
        });
    }

    // Evaluate server-side criteria based on the action event
    const earnedAchievements = EVALUATE_ACHIEVEMENTS(action, payload);

    // If no achievements were earned for this action, return early without DB update
    if (earnedAchievements.length === 0) {
        return res.json({
            success: true,
            message: 'Action recorded. No new achievements unlocked.',
            newlyUnlocked: []
    // Reject any item that is not strictly a non-empty string or not in the server-side allowlist
    const invalidItems = unlockedAchievements.filter(
        (id) => typeof id !== 'string' || id.trim() === '' || !VALID_ACHIEVEMENTS.has(id)
    );

    if (invalidItems.length > 0) {
        return res.status(400).json({
            success: false,
            error: "Invalid or unknown achievement ID(s) provided",
        });
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { unlockedAchievements: { $each: earnedAchievements } } },
        // $addToSet is idempotent and additive-only — it never removes
        // achievements the user already earned, and never duplicates.
        const user = await User.findByIdAndUpdate(
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { unlockedAchievements: { $each: unlockedAchievements } } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            newlyUnlocked: earnedAchievements
        });
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: 'A server error occurred' });
    }
};