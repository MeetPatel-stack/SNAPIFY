import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postApi } from "../api/postApi";
import BottomNav from '../components/BottomNav';
export default function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");

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

  if (!post) {
    return (
      <div className="app-container">
        <div className="empty-state">Loading post details…</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <article className="detail-card">
        <div className="detail-card-media">
          <img
            src={post.image}
            alt={post.caption}
            className="detail-image"
          />
        </div>

        <div className="detail-card-body">
          <div className="detail-header">
            <div>
              <p className="eyebrow">By @{post.user.username}</p>
              <h1 className="detail-title">{post.caption}</h1>
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
                <p className="muted-text">No comments yet. Be the first to say something nice.</p>
              ) : (
                post.comments.map((comment) => (
                  <div key={comment._id} className="comment-card">
                    <div className="comment-author">@{comment.user.username}</div>
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
