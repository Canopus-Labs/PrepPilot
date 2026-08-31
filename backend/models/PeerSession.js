const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true,
    maxlength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const peerSessionSchema = new mongoose.Schema({
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  topic: {
    type: String,
    required: [true, 'Topic is required'],
    trim: true,
    maxlength: 100
  },
  status: {
    type: String,
    enum: ['open', 'matched', 'completed', 'cancelled'],
    default: 'open'
  },
  scheduledTime: {
    type: Date,
    required: true
  },
  reviews: [reviewSchema]
}, {
  timestamps: true
});

// Ensure a user cannot review the same session twice
peerSessionSchema.index({ 'reviews.reviewerId': 1 }, { unique: true, sparse: true });
peerSessionSchema.index({ status: 1, scheduledTime: 1 });

module.exports = mongoose.model('PeerSession', peerSessionSchema);
