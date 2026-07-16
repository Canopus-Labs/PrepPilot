const mongoose = require('mongoose');

const UserSheetProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sheetId: { type: String, required: true },
  followed: { type: Boolean, default: false },
  completedTopics: { type: Object, default: {} },
  percentage: { type: Number, default: 0 },
}, { timestamps: true });

UserSheetProgressSchema.index({ userId: 1, sheetId: 1 }, { unique: true });

module.exports = mongoose.model('UserSheetProgress', UserSheetProgressSchema);
