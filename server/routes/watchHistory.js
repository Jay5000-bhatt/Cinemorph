import express from "express";
const router = express.Router();

import {
	createHistory,
	getWatchHistory,
	updateHistory,
	deleteHistory,
	deleteAllHistory,
} from "../controllers/WatchHistoryController.js";

import { authenticate } from "../middleware/auth.js";

router.post("/", authenticate, createHistory);
router.put("/:id", authenticate, updateHistory);
router.delete("/:id", authenticate, deleteHistory);
router.delete("/user/:id", authenticate, deleteAllHistory);
router.get("/", authenticate, getWatchHistory);

export default router;
