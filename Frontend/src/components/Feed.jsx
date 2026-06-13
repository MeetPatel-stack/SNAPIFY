import { useEffect, useState, useContext } from "react";
import { postApi } from "../api/postApi";
import { userApi } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import { BsBookmarkFill } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [savedPosts, setSavedPosts] = useState([]);
  const handleDelete = async (postId) => {
    try {
      await postApi.deletePost(postId);
      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await postApi.toggleLike(postId);
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };
  const handleSave = async (postId) => {
    try {
      await postApi.toggleSave(postId);

      fetchSavedPosts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchSavedPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postApi.getPosts();

      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSavedPosts = async () => {
    try {
      const response = await userApi.getSavedPosts();

      setSavedPosts(response.data.map((post) => post._id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <div className="page-intro">
        <div>
          <p className="eyebrow">Your daily inspiration</p>
          <h1 className="section-title">Feed</h1>
        </div>

        {/* <button
          type="button"
          className="button-primary"
          onClick={() => navigate("/create-post")}
        >
          Create Post
        </button> */}
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          No posts yet. Create your first visual story and share it with the
          world.
        </div>
      ) : (
        posts.map((post) => (
          <article key={post._id} className="post-card">
            {/* HEADER */}
            <div className="feed-post-header">
              <div
                className="feed-user-info"
                onClick={() => navigate(`/profile/${post.user._id}`)}
              >
                <img
                  src={
                    post.user.profilePic ||
                    `https://ui-avatars.com/api/?name=${post.user.username}`
                  }
                  alt={post.user.username}
                  className="feed-user-avatar"
                />

                <span className="post-author">@{post.user.username}</span>
              </div>
            </div>

            {/* IMAGE */}
            <div className="post-card-media">
              {post.mediaType === "image" ? (
                <img
                  src={post.media}
                  alt={post.caption}
                  className="post-image"
                  onClick={() => navigate(`/post/${post._id}`)}
                />
              ) : (
                <video
                  src={post.media}
                  className="post-image"
                  controls
                  onClick={() => navigate(`/post/${post._id}`)}
                />
              )}
            </div>

            {/* ACTIONS */}
            <div className="feed-actions">
              <div className="feed-left-actions">
                <button
                  className="action-btn"
                  onClick={() => handleLike(post._id)}
                >
                  {post.likes.includes(user._id) ? (
                    <FaHeart className="liked-heart" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>

                <button
                  className="action-btn"
                  onClick={() => navigate(`/post/${post._id}`)}
                >
                  💬
                </button>
              </div>

              <button
                className="action-btn"
                onClick={() => handleSave(post._id)}
              >
                {savedPosts.includes(post._id) ? (
                  <BsBookmarkFill className="saved-bookmark" />
                ) : (
                  <BsBookmark />
                )}
              </button>
            </div>

            {/* COUNTS */}
            <div className="feed-stats">
              <span>{post.likes.length} likes</span>

              <span>{post.comments.length} comments</span>
            </div>

            {/* CAPTION */}
            <div className="feed-caption">
              <strong>@{post.user.username}</strong> {post.caption}
            </div>
          </article>
        ))
      )}
    </div>
  );
}
