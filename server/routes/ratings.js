import express from "express";
const router = express.Router();

import {
	addNewRating,
	getCommentsByContentId,
} from "../controllers/ratingsController.js";

router.options("/", (req, res) => {
	res.sendStatus(200);
});

router.post("/", addNewRating);
router.get("/posts/:tmdbId/comments", getCommentsByContentId);

export default router;