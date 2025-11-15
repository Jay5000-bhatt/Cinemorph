import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
	tmdbId: {
		type: Number,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
