import express from "express";
const router = express.Router();

import * as commentController from "../controllers/CommentController.js";

router.get("/:contentId", commentController.getCommentsByContentId);

export default router;
