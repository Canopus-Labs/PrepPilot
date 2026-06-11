const express = require('express');
const { getAchievements, saveAchievements } = require('../controllers/achievementController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/achievements', protect, getAchievements);
router.post('/achievements', protect, saveAchievements);

module.exports = router;