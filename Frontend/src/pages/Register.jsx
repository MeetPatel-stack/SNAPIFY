import React, { useState, useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { authApi } from "../api/authApi";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authApi.register({ username, email, password });
      login(response.data);
      navigate('/feed');
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">Snapify</div>
        <p className="auth-tagline">
          Create your account to capture and share the best moments.
        </p>

        {error && <div className="alert-error">{error}</div>}

        <form className="auth-grid" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            className="input-field"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
            Sign Up
          </button>
        </form>

        <Link to="/login" className="link-help">
          Already registered? Log in instead.
        </Link>
      </div>
    </div>
  );
}
