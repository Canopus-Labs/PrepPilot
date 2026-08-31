const express = require('express');
const router = express.Router();
const {
  createJobApplication,
  getJobApplications,
  updateJobApplication,
  deleteJobApplication
} = require('../controllers/jobApplicationController');
const { protect } = require('../middlewares/authMiddleware');

// Protect all routes in this file
router.use(protect);

router.route('/')
  .post(createJobApplication)
  .get(getJobApplications);

router.route('/:id')
  .put(updateJobApplication)
  .delete(deleteJobApplication);

module.exports = router;
