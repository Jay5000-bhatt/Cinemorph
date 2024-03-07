const Comment = require("../models/Rating");

const getCommentsByContentId = async (req, res) => {
    try {
    const contentId = req.params.contentId;
    const comments = await Comment.find({ tmdbId: contentId }); // Update to use tmdbId
      res.status(200).json(comments);
    } catch (error) {
      console.error("Error getting comments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

module.exports = {
  getCommentsByContentId,
};
