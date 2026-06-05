import React, { useState, useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { authApi } from "../api/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await authApi.login({ email, password });
      login(response.data);
      navigate('/feed');
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">Snapify</div>
        <p className="auth-tagline">
          Log in to discover beautiful photo stories from your friends.
        </p>

        {error && <div className="alert-error">{error}</div>}

        <form className="auth-grid" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            className="input-field"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="button-primary">
            Log In
          </button>
        </form>

        <Link to="/register" className="link-help">
          Don’t have an account? Create one now.
        </Link>
      </div>
    </div>
  );
}
