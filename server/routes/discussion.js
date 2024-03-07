const express = require('express');
const router = express.Router();
const commentController = require('../controllers/DiscussionController');

// Route to create a new comment
router.post('/comments', commentController.createComment);

// Route to post a reply to a comment
router.post('/comments/reply', commentController.createReply);

// Route to get all comments for a specific post
router.get('/posts/:postId/comments', commentController.getAllCommentsForPost);

// Route to get a specific comment by ID
router.get('/comments/:commentId', commentController.getCommentById);

// Route to update a comment by ID
router.put('/comments/:commentId', commentController.updateComment);

// Route to delete a comment by ID
router.delete('/comments/:commentId', commentController.deleteComment);

module.exports = router;
