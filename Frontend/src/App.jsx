import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import PostDetails from "./pages/PostDetails";
import Feed from "./components/Feed";
import CreatePost from "./components/createPost";
import Profile from "./pages/Profile";
import BottomNav from "./components/BottomNav";
import EditProfile from "./pages/EditProfile";
import Search from "./pages/Search";
import FollowList from "./pages/FollowList";

function AppShell() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  // 1
  const showFooterNav = user;

  return (
    <div className="app-shell">
      {user && (
        <header className="app-header">
          <div className="app-container app-header-inner">
            <div className="brand">
              <span className="brand-tag">SNAPIFY</span>
            </div>

            <div className="header-actions">
              <span className="user-chip">@{user.username}</span>
              <button onClick={logout} className="button-secondary">
                Logout
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="app-container pb-28 page-with-footer">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/feed" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/feed" />}
          />
          <Route
            path="/feed"
            element={user ? <Feed /> : <Navigate to="/login" />}
          />
          <Route
            path="/create-post"
            element={user ? <CreatePost /> : <Navigate to="/login" />}
          />
          <Route
            path="/post/:id"
            element={user ? <PostDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:id"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />

          <Route
            path="/edit-profile"
            element={user ? <EditProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/search"
            element={user ? <Search /> : <Navigate to="/login" />}
          />

          <Route
            path="/profile/:id/:type"
            element={user ? <FollowList /> : <Navigate to="/login" />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {showFooterNav && <div className="h-16" aria-hidden="true" />}
      {showFooterNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
