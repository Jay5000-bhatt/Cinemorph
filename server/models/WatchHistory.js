import mongoose from "mongoose";

const watchHistorySchema = new mongoose.Schema({
	contentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Content",
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	playedDuration: {
		type: Number,
		required: true,
		default: 0,
	},
	movieDuration: {
		type: Number,
		required: true,
		default: 0,
	},
	lastPlayed: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

const WatchHistory = mongoose.model("WatchHistory", watchHistorySchema);

export default WatchHistory;