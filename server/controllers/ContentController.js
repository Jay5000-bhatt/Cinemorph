import Content from "../models/Content.js";
import Ratings from "../models/Rating.js";
import WatchHistory from "../models/WatchHistory.js";

import { failureResponse, successResponse } from "./utils.js";

export const createContent = async (req, res) => {
	try {
		const {
			name,
			description,
			genre,
			duration,
			language,
			coverPhoto,
			contentUrl,
		} = req.body;

		const content = new Content({
			name,
			description,
			genre,
			duration,
			language,
			coverPhoto,
			contentUrl,
		});
		await content.save();
		successResponse(res, "Content Created Successfully", 201);
	} catch (error) {
		failureResponse(res, error);
	}
};

export const getContentById = async (req, res) => {
	try {
		const content = await Content.findById(req.params.id);
		if (!content) {
			failureResponse(res, "Content not found");
		} else successResponse(res, content);
	} catch (error) {
		failureResponse(res, error);
	}
};

export const getAllContent = async (req, res) => {
	try {
		const content = await Content.find();
		successResponse(res, content);
	} catch (error) {
		failureResponse(res, error);
	}
};

export const updateContent = async (req, res) => {
	try {
		let contentId = req.params.id;
		if (contentId) {

			let content = await Content.findById(contentId);
			if (!content) {
				throw new Error("Content not found");
			} else {
				const {
					name,
					description,
					genre,
					duration,
					language,
					coverPhoto,
					contentUrl,
				} = req.body;
				content.name = name ? name : content.name;
				content.description = description ? description : content.description;
				content.genre = genre ? genre : content.genre;
				content.duration = duration ? duration : content.duration;
				content.language = language ? language : content.language;
				content.coverPhoto = coverPhoto ? coverPhoto : content.coverPhoto;
				content.contentUrl = contentUrl ? contentUrl : content.contentUrl;

				await content.save();
				successResponse(res, "Content updated successfully");
			}
		} else {
			failureResponse(res, "Content not found");
		}
	} catch (error) {
		failureResponse(res, error);
	}
};

export const deleteContent = async (req, res) => {
	try {
		let contentId = req.params.id;
		let content = await Content.findById(contentId);
		if (!content) {
			throw new Error("Content not found");
		} else {
			await content.deleteOne({ id: contentId });

			successResponse(res, "Content deleted successfully");
		}
	} catch (error) {
		failureResponse(res, error);
	}
};

export const uploadFile = async (req, res) => {
	try {
		const { contentId } = req.body;
		const content = await Content.findById(contentId);

		if (!content) {
			return failureResponse(res, "Content not found");
		}

		if (!req.file) {
			return failureResponse(res, "No file uploaded");
		}

		const uploadedFile = req.file;
		const uploadPath = uploadedFile.path;


		content.contentUrl = uploadPath;
		await content.save();

		successResponse(res, "Content uploaded successfully");
	} catch (error) {
		failureResponse(res, error.message || "An error occurred");
	}
};

export const getRecommendedMovies = async (req, res) => {
	try {
		const userId = req.user.id;
		const movies = await Content.find().lean();
		const ratings = await Ratings.find({ userId }).lean();
		const watchHistory = await WatchHistory.find({ userId }).lean();

		let genres = movies.map((movie) => movie.genre);

		genres = [...new Set(genres)];
		let scores = [];
		genres.forEach((ele) => {
			scores.push({
				genre: ele,
				score: 0,
			});
		});

		ratings.forEach((rating) => {
			let movie = movies.find(
				(movie) => movie._id.toString() == rating.contentId
			);
			let genre = movie.genre;
			let score = scores.find((score) => score.genre === genre);
			if (rating.isLiked) {
				score.score += 1;
			} else {
				score.score -= 1;
			}
		});

		watchHistory.forEach((history) => {
			let movie = movies.find(
				(movie) => movie._id.toString() == history.contentId
			);
			let genre = movie.genre;
			let score = scores.find((score) => score.genre === genre);
			let playedDuration = history.playedDuration;
			let totalDuration = movie.duration;
			let percentage = playedDuration / totalDuration;
			if (percentage > 0.75) {
				score.score += 2;
			} else if (percentage > 0.5) {
				score.score += 1;
			} else {
				score.score -= 1;
			}
		});

		scores.sort((a, b) => b.score - a.score);
		let recommendedMovies = [];
		scores.forEach((score) => {
			let genre = score.genre;
			movies.forEach((movie) => {
				if (movie.genre === genre) {
					recommendedMovies.push(movie);
				}
			});
		});

		successResponse(res, recommendedMovies);
	} catch (error) {
		failureResponse(res, error);
	}
};