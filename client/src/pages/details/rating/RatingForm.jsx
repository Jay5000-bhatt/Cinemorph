import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";

import avtarimg from "../../../assets/pic-1.jpg";
import { getDatabase, ref, child, get } from "firebase/database";
import { firebaseAuth } from "../../../utils/firebase-config";

const RatingForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState("Admin");
  const [submitted, setSubmitted] = useState(false); // Add submitted state

  // useEffect(() => {
  //   const fetchUserName = async () => {
  //     try {
  //       const user = firebaseAuth.currentUser;

  //       if (!user) {
  //         console.log("User not found");
  //         return;
  //       }

  //       const db = getDatabase();
  //       const usersRef = ref(db, "users");
  //       const userSnapshot = await get(child(usersRef, user.uid));

  //       if (userSnapshot.exists()) {
  //         const userData = userSnapshot.val();
  //         const { Name } = userData;
  //         console.log("Current user name:", Name);
  //         setUserName(Name);
  //       } else {
  //         console.log("User data not found in database");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserName();
  // }, [firebaseAuth]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = firebaseAuth.currentUser;
        if (!user) {
          return;
        }

        const db = getDatabase();
        const usersRef = ref(db, "users");
        const userSnapshot = await get(child(usersRef, user.uid));

        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          const { Name } = userData;
          setUserName(Name);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [firebaseAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting with user name:", userName);
    try {
      // Extract contentId from the URL
      const path = window.location.pathname;
      const contentId = path.substring(path.lastIndexOf("/") + 1);

      // Create a new rating document in the database
      const response = await axios.post("https://cinemorph-api.vercel.app/api/ratings", {
        contentId,
        userId: userName,
        rating,
        comment,
      });
      console.log("Rating submitted successfully", response.data);
      await fetchComments();
      setSubmitted(true); // Set submitted to true after successful submission
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  useEffect(() => {
    // Fetch comments when the component mounts
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const tmdbId = window.location.pathname.split("/").pop();
      const response = await axios.get(
        `https://cinemorph-api.vercel.app/api/ratings/posts/${tmdbId}/comments`
      );

      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
   // Reset form fields if submission was successful
   useEffect(() => {
    if (submitted) {
      setRating(0);
      setComment("");
      setSubmitted(false); // Reset submitted state
    }
  }, [submitted]);

  const renderComments = () => {
    if (comments.length === 0) {
      return <p>No comments yet.</p>;
    } else {
      return comments.map((comment, index) => (
        <div key={index} className="card">
          <img src={avtarimg} alt="user" />
          <div className="card__content">
            <span>
              <i className="ri-double-quotes-l"></i>
            </span>
            <div className="card__details">
              <p>{comment.comment}</p>
              <h4>{comment.userId}</h4>
            </div>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="containerdiv">
      <div className="post1">
        <div className="text1">Thanks for rating us!</div>
        <div className="edit1" onClick={() => setRating(0)}>
          EDIT
        </div>
      </div>
      <div className="star-widget1">
        {[...Array(5)].map((_, index) => (
          <React.Fragment key={index}>
            <input
              type="radio"
              name="rate"
              id={`rate-${index + 1}`}
              checked={rating === index + 1}
              onChange={() => handleRatingChange(index + 1)}
            />
            <label
              htmlFor={`rate-${index + 1}`}
              className="fas fa-star label"
            ></label>
          </React.Fragment>
        ))}
        <form onSubmit={handleSubmit}>
          <div className="textarea">
            <textarea
              cols="30"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Describe your experience.."
            ></textarea>
          </div>
          <div className="btn10">
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
      <div className="separation"></div>
      <div className="comments">
        <h2>Comments</h2>
        {renderComments()}
      </div>
    </div>
  );
};

export default RatingForm;
