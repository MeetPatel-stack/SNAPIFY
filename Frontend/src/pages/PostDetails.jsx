import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postApi } from "../api/postApi";
import { AuthContext } from "../context/AuthContext";
import BottomNav from "../components/BottomNav";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await postApi.getPostById(id);
      setPost(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    try {
      await postApi.addComment(id, commentText);

      setCommentText("");

      fetchPost();
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Snapify Post",
          text: post.caption,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);

        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?",
      );

      if (!confirmDelete) return;

      await postApi.deletePost(postId);

      navigate(`/profile/${user._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    console.log("Edit post");
    // We'll implement Edit Post page next
  };

  if (!post) {
    return (
      <div className="app-container">
        <div className="empty-state">Loading post details...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <article className="detail-card">
        <div className="detail-card-media">
          {post.mediaType === "image" ? (
            <img src={post.media} alt={post.caption} className="detail-image" />
          ) : (
            <video src={post.media} className="detail-image" controls />
          )}
        </div>

        <div className="detail-card-body">
          <div className="detail-header">
            <div>
              <p className="eyebrow">By @{post.user.username}</p>
              <h1 className="detail-title">{post.caption}</h1>
            </div>

            <div className="post-options-wrapper">
              <button
                className="post-options-btn"
                onClick={() => setOpenMenu(!openMenu)}
              >
                ⋮
              </button>

              {openMenu && (
                <div className="post-options-menu">
                  <button onClick={handleShare}>Share</button>

                  {user._id === post.user._id && (
                    <button
                      className="delete-option"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <section className="comment-section">
            <h2>Comments</h2>

            <form className="comment-form" onSubmit={handleComment}>
              <input
                type="text"
                required
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="input-field"
              />

              <button type="submit" className="button-primary">
                Comment
              </button>
            </form>

            <div className="comment-list">
              {post.comments.length === 0 ? (
                <p className="muted-text">
                  No comments yet. Be the first to say something nice.
                </p>
              ) : (
                post.comments.map((comment) => (
                  <div key={comment._id} className="comment-card">
                    <div className="comment-author">
                      @{comment.user.username}
                    </div>

                    <p>{comment.text}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </article>

      <BottomNav />
    </div>
  );
}
