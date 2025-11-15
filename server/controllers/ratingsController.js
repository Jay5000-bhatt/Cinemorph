import Rating from '../models/Rating.js';

export const addNewRating = async (req, res) => {
	try {
		const { contentId, userId, rating, comment } = req.body;
		const newRating = new Rating({ tmdbId: contentId, userId, rating, comment });
		await newRating.save();

		res.status(200).json({ message: "Rating added successfully" });
	} catch (error) {
		console.error("Error adding rating:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getCommentsByContentId = async (req, res) => {
	try {
		const tmdbId = req.params.tmdbId;
		const comments = await Rating.find({ tmdbId });
		res.status(200).json(comments);
	} catch (error) {
		console.error("Error getting comments:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};