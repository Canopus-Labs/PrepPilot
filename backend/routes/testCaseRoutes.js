const express = require('express');
const router = express.Router();
const {
  createTestCase,
  getTestCases,
  saveExecutionHistory,
  getExecutionHistory,
  deleteTestCase
} = require('../controllers/testCaseController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.route('/').post(createTestCase).get(getTestCases);
router.post('/history', saveExecutionHistory);
router.get('/history', getExecutionHistory);
router.delete('/:id', deleteTestCase);

module.exports = router;
