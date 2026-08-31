const mongoose = require('mongoose');

/**
 * JobApplication Schema
 * Tracks a user's job application pipeline stages.
 */
const jobApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    default: null
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    maxlength: [100, 'Role cannot exceed 100 characters']
  },
  stage: {
    type: String,
    enum: {
      values: ['Wishlist', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected'],
      message: '{VALUE} is not a valid application stage'
    },
    default: 'Wishlist',
    index: true
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  jobUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  }
}, {
  timestamps: true
});

// Compound index for efficient querying by user and stage
jobApplicationSchema.index({ userId: 1, stage: 1 });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
