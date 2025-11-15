import WatchHistory from "../models/WatchHistory.js";
import Content from "../models/Content.js";

import { failureResponse, successResponse } from "./utils.js";

export const createHistory = async (req, res) => {
	try {
		let data = await createUpdateHistory(
			req.body.contentId,
			req.user.id,
			req.body.playedDuration
		);
		successResponse(res, data);
	} catch (error) {
		failureResponse(res, error);
	}
};

export const updateHistory = async (req, res) => {
	try {
		let data = await createUpdateHistory(
			req.body.contentId,
			req.user.id,
			req.body.playedDuration
		);
		successResponse(res, data);
	} catch (error) {
		failureResponse(res, error);
	}
};

export const deleteHistory = async (req, res) => {
	try {
		let userId = req.user.id;
		let contentId = req.params.id;
		await WatchHistory.deleteOne({ userId, contentId });
		successResponse(res, "Watch History deleted successfully.");
	} catch (error) {
		failureResponse(res, error);
	}
};

export const deleteAllHistory = async (req, res) => {
	try {
		let userId = req.params.id;
		console.log("Deleting history for user:", userId);

		await WatchHistory.deleteMany({ userId });

		console.log("Watch History deleted successfully.");

		successResponse(res, "Watch History deleted successfully.");
	} catch (error) {
		console.error("Error deleting watch history:", error);

		failureResponse(res, error);
	}
};

export const createUpdateHistory = (contentId, userId, playedDuration) => {
	return new Promise(async (resolve, reject) => {
		let content = await Content.findById(contentId);
		if (!content) {
			reject("Content not found");
		} else {
			let history = await WatchHistory.findOne({ contentId, userId });
			if (history) {
				history.playedDuration = playedDuration;
				history.lastPlayed = new Date();
				await history.save();
				resolve("Watch History updated successfully.");
			} else {
				const movieDuration = content.duration;
				const lastPlayed = new Date();
				const watchHistory = new WatchHistory({
					contentId,
					userId,
					playedDuration,
					movieDuration,
					lastPlayed,
				});
				await watchHistory.save();
				resolve("Watch History created successfully.");
			}
		}
	});
}

export const getWatchHistory = async (req, res) => {
	try {
		let userId = req.user.id;
		let watchHistory = await WatchHistory.find({ userId })
			.populate("userId", "email role")
			.populate("contentId", "name genre")
			.sort({ lastPlayed: -1 });

		successResponse(res, watchHistory);
	} catch (error) {
		failureResponse(res, error);
	}
};
