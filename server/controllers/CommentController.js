import Comment from "../models/Rating.js";

export const getCommentsByContentId = async (req, res) => {
	try {
		const contentId = req.params.contentId;
		const comments = await Comment.find({ tmdbId: contentId });
		res.status(200).json(comments);
	} catch (error) {
		console.error("Error getting comments:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};