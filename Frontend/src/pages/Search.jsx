import { useState } from "react";
import { userApi } from "../api/userApi";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;

    setKeyword(value);

    if (!value.trim()) {
      setUsers([]);
      return;
    }

    try {
      const response = await userApi.searchUsers(value);

      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="section-title">Search Users</h1>

      <input
        type="text"
        placeholder="Search by username..."
        value={keyword}
        onChange={handleSearch}
        className="input-field"
      />

      <div className="search-results">
        {users.map((user) => (
          <div
            key={user._id}
            className="search-user-card"
            onClick={() => navigate(`/profile/${user._id}`)}
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