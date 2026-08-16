const mongoose = require('mongoose');

const AiJobSchema = new mongoose.Schema({
  status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
  type: { type: String, required: true },
  result: { type: mongoose.Schema.Types.Mixed },
  error: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('AiJob', AiJobSchema);
