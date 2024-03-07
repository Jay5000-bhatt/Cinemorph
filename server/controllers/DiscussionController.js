const Comment = require("../models/Discussion");

// Controller methods for handling comments
const commentController = {
  createComment: async (req, res) => {
    try {
      const newComment = await Comment.create(req.body);
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createReply: async (req, res) => {
    try {
      const parentCommentId = req.params.commentId; // Get the ID of the parent comment
      const newReply = await Comment.create(req.body); // Create a new comment with the request body
      
      // Check if parentCommentId is provided and not null
      if (parentCommentId) {
        const parentComment = await Comment.findById(parentCommentId); // Find the parent comment by ID
        if (!parentComment) {
          return res.status(404).json({ message: "Parent comment not found" });
        }
        parentComment.replies.push(newReply); // Add the new reply to the parent comment's replies array
        await parentComment.save(); // Save the parent comment with the new reply
      }
      
      res.status(201).json(newReply); // Respond with the new reply
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  

  getAllCommentsForPost: async (req, res) => {
    try {
      const postId = req.params.postId;
      const comments = await Comment.find({ tmdbId: postId }); // Update to use tmdbId
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCommentById: async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateComment: async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        req.body,
        { new: true }
      );
      if (!updatedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const deletedComment = await Comment.findByIdAndDelete(commentId);
      if (!deletedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = commentController;
