import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
	tmdbId: {
		type: Number,
		required: true
	},

	userId: {
		type: String,
		required: true
	},

	rating: {
		type: Number,
		required: true,
	},

	comment: {
		type: String,
		required: true,
	}
});

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
