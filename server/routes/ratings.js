const express = require("express");
const router = express.Router();
const { addNewRating, getCommentsByContentId } = require("../controllers/ratingsController");

router.options("/", (req, res) => {
  res.sendStatus(200);
});

router.post("/", addNewRating);
router.get("/posts/:tmdbId/comments", getCommentsByContentId);


module.exports = router;
