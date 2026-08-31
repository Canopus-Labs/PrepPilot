const PeerSession = require('../models/PeerSession');

/**
 * @desc    Create a new peer session
 * @route   POST /api/peer-sessions
 * @access  Private
 */
const createPeerSession = async (req, res) => {
  try {
    const { topic, scheduledTime } = req.body;
    const hostId = req.user.id;

    const newSession = new PeerSession({
      hostId,
      topic,
      scheduledTime: new Date(scheduledTime)
    });

    const savedSession = await newSession.save();
    res.status(201).json({ success: true, data: savedSession });
  } catch (error) {
    console.error('Error creating peer session:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get all open peer sessions
 * @route   GET /api/peer-sessions/open
 * @access  Private
 */
const getOpenSessions = async (req, res) => {
  try {
    const sessions = await PeerSession.find({ status: 'open', scheduledTime: { $gte: new Date() } })
      .populate('hostId', 'name email')
      .sort({ scheduledTime: 1 });
    
    res.status(200).json({ success: true, count: sessions.length, data: sessions });
  } catch (error) {
    console.error('Error fetching open sessions:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Join an open peer session
 * @route   PUT /api/peer-sessions/:id/join
 * @access  Private
 */
const joinPeerSession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const session = await PeerSession.findById(id);

    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found' });
    }

    if (session.status !== 'open') {
      return res.status(400).json({ success: false, message: 'Session is no longer open' });
    }

    if (session.hostId.toString() === userId) {
      return res.status(400).json({ success: false, message: 'You cannot join your own session' });
    }

    session.participantId = userId;
    session.status = 'matched';
    
    const updatedSession = await session.save();
    res.status(200).json({ success: true, data: updatedSession });
  } catch (error) {
    console.error('Error joining peer session:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Submit a review for a completed session
 * @route   POST /api/peer-sessions/:id/review
 * @access  Private
 */
const submitReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    const session = await PeerSession.findById(id);

    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found' });
    }

    if (session.status !== 'completed' && session.status !== 'matched') {
      return res.status(400).json({ success: false, message: 'Can only review matched or completed sessions' });
    }

    if (session.hostId.toString() !== userId && session.participantId?.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to review this session' });
    }

    const hasReviewed = session.reviews.some(r => r.reviewerId.toString() === userId);
    if (hasReviewed) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this session' });
    }

    session.reviews.push({ reviewerId: userId, rating, comment });
    session.status = 'completed';
    
    const updatedSession = await session.save();
    res.status(200).json({ success: true, data: updatedSession });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  createPeerSession,
  getOpenSessions,
  joinPeerSession,
  submitReview
};
