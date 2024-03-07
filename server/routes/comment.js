const express = require("express");
const router = express.Router();
const commentController = require("../controllers/CommentController");

router.get("/:contentId", commentController.getCommentsByContentId);

module.exports = router;
