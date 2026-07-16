const express = require('express');
const { getAchievements, saveAchievements } = require('../controllers/achievementController');
const { protect } = require('../middlewares/authMiddleware');
const { validateSavedAchievements } = require('../Input_validators/ValidateAchievement');
const router = express.Router();

router.use(protect);

router.get('/achievements',getAchievements);
router.post('/achievements', validateSavedAchievements, saveAchievements);

module.exports = router;