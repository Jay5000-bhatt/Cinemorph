const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  tmdbId: {
    type: Number, // Assuming TMDB ID is a number
    required: true
  },
  userId: {
    type: String, // Assuming user ID is a string
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  parentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment', // Reference to the parent comment
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
