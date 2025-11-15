import express from "express";
const router = express.Router();

import {
	createContent,
	getAllContent,
	getContentById,
	updateContent,
	deleteContent,
	uploadFile,
	getRecommendedMovies,
} from "../controllers/ContentController.js";

import { authenticate } from "../middleware/auth.js";

import multer from "multer";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({ storage });

router.post("/", createContent);
router.put("/:id", authenticate, updateContent);
router.delete("/:id", authenticate, deleteContent);
router.get("/", authenticate, getAllContent);
router.get("/recommendation", authenticate, getRecommendedMovies);
router.get("/:id", authenticate, getContentById);
router.post("/upload", authenticate, upload.single("content"), uploadFile);

export default router;
