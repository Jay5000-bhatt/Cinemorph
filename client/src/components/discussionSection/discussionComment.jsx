import React from "react";
import axios from "axios";
import dayjs from "dayjs";
import "./style.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDatabase, ref, child, get } from "firebase/database";
import { firebaseAuth } from "../../utils/firebase-config.js";
import { PlayIcon } from "../../pages/details/Playbtn.jsx";
import avtarimg from "../../assets/UserImg-logo.png";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating.jsx";
import Img from "../lazyLoadImage/Img.jsx";
import VideoPopup from "../videoPopup/VideoPopup.jsx";
import useFetch from "../../hooks/userFetch.jsx";
import Genres from "../genres/Genres.jsx";
import ContentWrapper from "../contentWrapper/ContentWrapper.jsx";

const DiscussionComment = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [userName, setUserName] = useState("Unknown");

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g.id);
  

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
    try {
      const path = window.location.pathname;
      const segments = path.split("/");
      const tmdbId = segments[segments.length - 2];

      const response = await axios.post(
        "http://localhost:5000/discuss/comments",
        {
          tmdbId,
          userId: userName,
          comment,
        }
      );
      console.log("Rating submitted successfully", response.data);

      setComment("");
      await fetchComments();
    } catch (error) {
      console.error("Error submitting Comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const path = window.location.pathname;
      const segments = path.split("/");
      const tmdbId = segments[segments.length - 2];
      const response = await axios.get(
        `http://localhost:5000/discuss/posts/${tmdbId}/comments`
      );

      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitReply = async (parentCommentId) => {
    try {
      const path = window.location.pathname;
      const segments = path.split("/");
      const tmdbId = segments[segments.length - 2];
      const response = await axios.post(
        "http://localhost:5000/discuss/comments/reply",
        {
          tmdbId,
          userId: userName,
          comment: replyText,
          parentCommentId,
        }
      );
      console.log("Reply submitted successfully", response.data);

      setReplyingTo(null); // Reset the replyingTo state

      setReplyText(""); // Clear the reply input field

      await fetchComments(); // Fetch updated comments
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const renderComments = () => {
    if (comments.length === 0) {
      return <p className="empty">No comments yet.</p>;
    } else {
      return comments.map((comment) => (
        <div key={comment._id} className="card">
          <img src={avtarimg} alt="user" />
          <div className="card__content">
            <div className="card__details">
              <strong>{comment.userId}</strong>
              <p>{comment.comment}</p>
              {!replyingTo && (
                <button
                  className="rplybtn"
                  onClick={() => setReplyingTo(comment._id)}
                >
                  Reply
                </button>
              )}
              {replyingTo === comment._id && (
                <div className="textarea2">
                  <textarea
                    rows="15"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button onClick={() => handleSubmitReply(comment._id)}>
                    Reply
                  </button>
                </div>
              )}
              {[
                ...comments.filter(
                  (reply) => reply.parentCommentId === comment._id
                ),
                ...(comment.replies && comment.replies.length > 0
                  ? comment.replies
                  : []),
              ].map((reply) => (
                <div key={comment._id} className="card">
                  <img src={avtarimg} alt="user" />
                  <div className="card__content">
                    <div key={reply._id} className=" card__details reply">
                      <strong>{reply.userId}</strong>
                      <p className="replycmt">{reply.comment}</p>{" "}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ));
    }
  };

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="comment">
      <div className="detailsBanner">
        {!loading ? (
          <>
            {!!data && (
              <React.Fragment>
                <div className="backdrop-img">
                  <Img src={url.backdrop + data.backdrop_path} />
                </div>
                <ContentWrapper>
                  <div className="content">
                    <div className="left">
                      {data.poster_path ? (
                        <Img
                          className="posterImg"
                          src={url.backdrop + data.poster_path}
                        />
                      ) : (
                        <Img className="posterImg" src={PosterFallback} />
                      )}
                    </div>
                    <div className="right">
                      <div className="title">
                        {`${data.name || data.title} (${dayjs(
                          data?.release_date
                        ).format("YYYY")})`}
                      </div>
                      <div className="subtitle">{data.tagline}</div>

                      <Genres data={_genres} />

                      <div className="row">
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <div
                          className="playbtn"
                          onClick={() => {
                            setShow(true);
                            setVideoId(video.key);
                          }}
                        >
                          <PlayIcon />
                          <span className="text">Watch Trailer</span>
                        </div>
                      </div>

                      <div className="overview">
                        <div className="heading">Overview</div>
                        <div className="description">{data.overview}</div>
                      </div>

                      <div className="info">
                        {data.status && (
                          <div className="infoItem">
                            <span className="text bold">Status: </span>
                            <span className="text">{data.status}</span>
                          </div>
                        )}
                        {data.release_date && (
                          <div className="infoItem">
                            <span className="text bold">Release Date: </span>
                            <span className="text">
                              {dayjs(data.release_date).format("MMM D, YYYY")}
                            </span>
                          </div>
                        )}
                        {data.runtime && (
                          <div className="infoItem">
                            <span className="text bold">Runtime: </span>
                            <span className="text">
                              {toHoursAndMinutes(data.runtime)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <VideoPopup
                    show={show}
                    setShow={setShow}
                    videoId={videoId}
                    setVideoId={setVideoId}
                  />
                </ContentWrapper>
              </React.Fragment>
            )}
          </>
        ) : (
          <div className="detailsBannerSkeleton">
            <ContentWrapper>
              <div className="left skeleton"></div>
              <div className="right">
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
              </div>
            </ContentWrapper>
          </div>
        )}
      </div>
      <div className="container">
        <div className="star-widget">
          <form onSubmit={handleSubmit}>
            <div className="textarea">
              <textarea
                rows="50"
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
        <div className="comments">
          <h2>Discussion</h2>
          {renderComments()}
        </div>
      </div>
    </div>
  );
};

export default DiscussionComment;
