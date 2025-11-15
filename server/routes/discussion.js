import express from "express";
import commentController from "../controllers/DiscussionController.js";

const router = express.Router();

router.post('/comments', commentController.createComment);
router.post('/comments/reply', commentController.createReply);
router.get('/posts/:postId/comments', commentController.getAllCommentsForPost);
router.get('/comments/:commentId', commentController.getCommentById);
router.put('/comments/:commentId', commentController.updateComment);
router.delete('/comments/:commentId', commentController.deleteComment);

export default router;
