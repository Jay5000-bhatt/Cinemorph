const Rating = require('../models/Rating');

// Controller methods for handling ratings
const addNewRating = async (req, res) => {
  try {
      // Extract rating, contentId, and comment data from the request body
      const { contentId, userId, rating, comment } = req.body;

      // Create a new rating document in the database
      const newRating = new Rating({ tmdbId: contentId, userId, rating, comment });
      await newRating.save();

      // Send a success response
      res.status(200).json({ message: "Rating added successfully" });
  } catch (error) {
      // Handle errors
      console.error("Error adding rating:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCommentsByContentId = async (req, res) => {
  try {
      const tmdbId = req.params.tmdbId; // Use 'tmdbId' instead of 'contentId'
      const comments = await Rating.find({ tmdbId }); // Use 'tmdbId' directly
      res.status(200).json(comments);
  } catch (error) {
      console.error("Error getting comments:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
    addNewRating,
    getCommentsByContentId,
  };