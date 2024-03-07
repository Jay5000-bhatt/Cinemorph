const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  tmdbId: {
    type: Number, // Assuming TMDB ID is a number
    required: true
  },

  userId: {
    type: String, // Assuming user ID is a string
    required: true
  },

  rating: {
    type: Number,
    required: true,
  },
  
  comment: {
    type: String,
    required: true, // Set to false if comment is optional
  }
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
