import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function BottomNav() {
  const { user } = useContext(AuthContext);

  const location = useLocation();

  return (
    <>
      <div style={{ height: "72px" }} />

      <footer className="bottom-nav">
        <div className="bottom-nav-inner">
          <Link
            to="/feed"
            className={`bottom-nav-link ${
              location.pathname === "/feed" ? "active" : ""
            }`}
          >
            <span className="bottom-nav-icon">🏠</span>
            Home
          </Link>
          <Link
            to="/search"
            className={`bottom-nav-link ${
              location.pathname === "/search" ? "active" : ""
            }`}
          >
            <span className="bottom-nav-icon">🔍</span>
            Search
          </Link>
          <Link
            to="/create-post"
            className={`bottom-nav-link ${
              location.pathname === "/create-post" ? "active" : ""
            }`}
          >
            <span className="bottom-nav-icon">➕</span>
            Create
          </Link>

          <Link
            to={`/profile/${user._id}`}
            className={`bottom-nav-link ${
              location.pathname.includes("/profile") ? "active" : ""
            }`}
          >
            <span className="bottom-nav-icon">👤</span>
            Profile
          </Link>
        </div>
      </footer>
    </>
  );
}
