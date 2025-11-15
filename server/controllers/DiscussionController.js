import Comment from "../models/Discussion.js";

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
			const parentCommentId = req.params.commentId;
			const newReply = await Comment.create(req.body);
			if (parentCommentId) {
				const parentComment = await Comment.findById(parentCommentId);
				if (!parentComment) {
					return res.status(404).json({ message: "Parent comment not found" });
				}
				parentComment.replies.push(newReply);
				await parentComment.save();
			}
			res.status(201).json(newReply);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	getAllCommentsForPost: async (req, res) => {
		try {
			const postId = req.params.postId;
			const comments = await Comment.find({ tmdbId: postId });
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

export default commentController;
