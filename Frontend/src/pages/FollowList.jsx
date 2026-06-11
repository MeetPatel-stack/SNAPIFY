import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userApi } from "../api/userApi";

export default function FollowList() {
  const { id, type } = useParams();

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [id, type]);

  const fetchUsers = async () => {
    try {
      const response =
        type === "followers"
          ? await userApi.getFollowers(id)
          : await userApi.getFollowing(id);

      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="section-title">
        {type === "followers"
          ? "Followers"
          : "Following"}
      </h1>

      <div className="search-results">
        {users.map((user) => (
          <div
            key={user._id}
            className="search-user-card"
            onClick={() =>
              navigate(`/profile/${user._id}`)
            }
          >
            <img
              src={
                user.profilePic ||
                `https://ui-avatars.com/api/?name=${user.username}`
              }
              alt={user.username}
              className="search-avatar"
            />

            <div>
              <strong>@{user.username}</strong>

              <p>{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}