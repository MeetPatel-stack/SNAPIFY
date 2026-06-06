import { useEffect, useState, useContext } from "react";
import { postApi } from "../api/postApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BottomNav from "./BottomNav";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postApi.getPosts();
      console.log("Posts:", response.data);

      setPosts(response.data);
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

        <button
          type="button"
          className="button-primary"
          onClick={() => navigate("/create-post")}
        >
          Create Post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          No posts yet. Create your first visual story and share it with the
          world.
        </div>
      ) : (
        posts.map((post) => (
          <article key={post._id} className="post-card">
            <div className="post-card-media">
              <img
                src={post.image}
                alt={post.caption}
                className="post-image"
                onClick={() => navigate(`/post/${post._id}`)}
              />
            </div>

            <div className="post-card-body">
              <div className="post-card-header">
                <span className="post-author">@{post.user.username}</span>
              </div>
              <p className="post-caption"># {post.caption}</p>
              <div className="post-actions">
                <button
                  type="button"
                  className="button-heart"
                  onClick={() => handleLike(post._id)}
                >
                  ❤️ {post.likes.length}
                </button>
                {post.user._id === user._id && (
                  <button
                    type="button"
                    className="button-danger"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </article>
        ))
      )}
      <BottomNav />
    </div>
  );
}
