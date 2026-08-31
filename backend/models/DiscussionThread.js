const mongoose = require('mongoose');

const discussionThreadSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudyGroup',
    required: true,
    index: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    maxlength: [2000, 'Content cannot exceed 2000 characters']
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DiscussionThread',
    default: null,
    index: true
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

discussionThreadSchema.index({ groupId: 1, parentId: 1, createdAt: -1 });

module.exports = mongoose.model('DiscussionThread', discussionThreadSchema);
