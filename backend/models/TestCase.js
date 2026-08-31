const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    default: null
  },
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    default: null
  },
  input: {
    type: String,
    required: [true, 'Test case input is required'],
    trim: true,
    maxlength: [5000, 'Input cannot exceed 5000 characters']
  },
  expectedOutput: {
    type: String,
    required: [true, 'Expected output is required'],
    trim: true,
    maxlength: [5000, 'Expected output cannot exceed 5000 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

testCaseSchema.index({ userId: 1, questionId: 1 });
testCaseSchema.index({ userId: 1, sessionId: 1 });

module.exports = mongoose.model('TestCase', testCaseSchema);
