import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { postApi } from "../api/postApi";
import { userApi } from "../api/userApi";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchProfile();
  }, [id]);

  const fetchPosts = async () => {
    try {
      const response = await postApi.getUserPosts(id);

      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchProfile = async () => {
    try {
      const response = await userApi.getProfile(id);

      setProfile(response.data);
      setIsFollowing(response.data.followers?.includes(user._id));
    } catch (error) {
      console.error(error);
    }
  };
  const handleFollow = async () => {
    try {
      await userApi.toggleFollow(profile._id);

      fetchProfile();
    } catch (error) {
      console.error(error);
    }
  };

  if (!profile) {
    return (
      <div className="app-container">
        <div className="empty-state">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="profile-header-card">
        <div className="profile-header">
          <img
            src={
              profile.profilePic ||
              `https://ui-avatars.com/api/?name=${profile.username}`
            }
            alt="Profile"
            className="profile-avatar"
          />

          <div className="profile-info">
            <h2 className="profile-username">@{profile.username}</h2>

            <div className="profile-stats">
              <div className="profile-stat">
                <strong>{posts.length}</strong>
                <span>Posts</span>
              </div>

              <div className="profile-stat">
                <strong>{profile.followers?.length || 0}</strong>
                <span>Followers</span>
              </div>

              <div className="profile-stat">
                <strong>{profile.following?.length || 0}</strong>
                <span>Following</span>
              </div>
            </div>

            <p className="profile-email">{profile.email}</p>
            {profile.bio && <p className="profile-bio">{profile.bio}</p>}
          </div>
        </div>
      </div>
      {user._id === profile._id && (
        <button
          className="button-secondary profile-edit-btn"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </button>
      )}
      {user._id !== profile._id && (
        <button className="button-primary" onClick={() => handleFollow()}>
          {isFollowing ? "Following" : "Follow"}
        </button>
      )}
      <div className="profile-divider">
        <span>POSTS</span>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">No posts yet.</div>
      ) : (
        <div className="profile-grid">
          {posts.map((post) => (
            <div
              key={post._id}
              className="profile-grid-item"
              onClick={() => navigate(`/post/${post._id}`)}
            >
              <img
                src={post.image}
                alt={post.caption}
                className="profile-grid-image"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
