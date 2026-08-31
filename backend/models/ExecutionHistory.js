const mongoose = require('mongoose');

const executionHistorySchema = new mongoose.Schema({
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
  language: {
    type: String,
    required: true,
    enum: ['javascript', 'python', 'java', 'cpp', 'csharp']
  },
  code: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Runtime Error', 'Time Limit Exceeded', 'Compilation Error'],
    required: true
  },
  runtime: {
    type: Number,
    default: 0
  },
  memory: {
    type: Number,
    default: 0
  },
  testCasesPassed: {
    type: Number,
    default: 0
  },
  totalTestCases: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

executionHistorySchema.index({ userId: 1, createdAt: -1 });
executionHistorySchema.index({ userId: 1, questionId: 1 });

module.exports = mongoose.model('ExecutionHistory', executionHistorySchema);
