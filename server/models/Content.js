import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	genre: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	language: {
		type: Array,
		required: true,
	},
	coverPhoto: {
		type: String,
		required: true,
	},
	contentUrl: {
		type: String,
		required: true,
	},
});

const Content = mongoose.model("Content", contentSchema);

export default Content;
