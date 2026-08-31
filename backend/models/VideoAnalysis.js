const mongoose = require('mongoose');

const videoAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  videoUrl: {
    type: String,
    required: [true, 'Video URL is required']
  },
  transcript: {
    type: String,
    default: ''
  },
  eyeContactScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  fillerWordCount: {
    type: Number,
    default: 0
  },
  speakingPace: {
    type: String,
    enum: ['Too Slow', 'Optimal', 'Too Fast'],
    default: 'Optimal'
  },
  overallFeedback: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  }
}, {
  timestamps: true
});

videoAnalysisSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('VideoAnalysis', videoAnalysisSchema);
