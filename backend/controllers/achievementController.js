const User = require('../models/User');

exports.getAchievements = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({ success: true, unlockedAchievements: user.unlockedAchievements });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.saveAchievements = async (req, res) => {
    const { unlockedAchievements } = req.body;
    try {
        await User.findByIdAndUpdate(req.user._id, { unlockedAchievements });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};