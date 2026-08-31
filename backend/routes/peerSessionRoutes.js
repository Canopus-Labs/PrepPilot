const express = require('express');
const router = express.Router();
const {
  createPeerSession,
  getOpenSessions,
  joinPeerSession,
  submitReview
} = require('../controllers/peerSessionController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.route('/').post(createPeerSession);
router.get('/open', getOpenSessions);
router.put('/:id/join', joinPeerSession);
router.post('/:id/review', submitReview);

module.exports = router;
