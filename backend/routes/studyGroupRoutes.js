const express = require('express');
const router = express.Router();
const {
  createStudyGroup,
  getStudyGroups,
  joinStudyGroup,
  getGroupThreads,
  createThread
} = require('../controllers/studyGroupController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.route('/').post(createStudyGroup).get(getStudyGroups);
router.post('/:id/join', joinStudyGroup);
router.route('/:id/threads').get(getGroupThreads).post(createThread);

module.exports = router;
