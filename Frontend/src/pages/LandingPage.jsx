import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LandingPage() {
  const { user } = useContext(AuthContext);

  if (user) return <Navigate to="/feed" />;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-container app-header-inner">
          <div className="brand">
            <span className="brand-tag">SNAPIFY</span>
          </div>

          <div className="header-actions">
            <Link to="/login" className="button-secondary">
              Login
            </Link>
            <Link to="/register" className="button-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="app-container">
        <section className="page-intro">
          <div>
            <p className="eyebrow">Create · Share · Inspire</p>
            <h1 className="section-title">Capture your world with Snapify</h1>
            <p className="muted-text" style={{ maxWidth: 720 }}>
              Snapify helps you share beautiful moments, follow creators you
              love, and engage with a friendly community. Upload images, add
              captions, like and comment — all in a lightweight, delightful
              experience.
            </p>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <Link to="/register" className="button-primary">
              Get Started
            </Link>
            <Link to="/login" className="button-secondary">
              Login
            </Link>
          </div>
        </section>

        <section className="features" style={{ marginBottom: 36 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
            <div className="post-card">
              <div style={{ padding: 18 }}>
                <h3 style={{ margin: 0, color: "#4f46e5" }}>Beautiful Posts</h3>
                <p className="muted-text">Share full-width photos with elegant presentation.</p>
              </div>
            </div>

            <div className="post-card">
              <div style={{ padding: 18 }}>
                <h3 style={{ margin: 0, color: "#4f46e5" }}>Engage Easily</h3>
                <p className="muted-text">Like, comment and connect with a thoughtful community.</p>
              </div>
            </div>

            <div className="post-card">
              <div style={{ padding: 18 }}>
                <h3 style={{ margin: 0, color: "#4f46e5" }}>Fast & Lightweight</h3>
                <p className="muted-text">Designed to feel snappy on mobile and desktop.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="gallery" style={{ marginBottom: 40 }}>
          <h2 style={{ marginBottom: 16 }}>Sample Stories</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
            <div className="detail-card-media"><img src="https://picsum.photos/400/300?random=1" alt="sample" className="post-image"/></div>
            <div className="detail-card-media"><img src="https://picsum.photos/400/300?random=2" alt="sample" className="post-image"/></div>
            <div className="detail-card-media"><img src="https://picsum.photos/400/300?random=3" alt="sample" className="post-image"/></div>
            <div className="detail-card-media"><img src="https://picsum.photos/400/300?random=4" alt="sample" className="post-image"/></div>
          </div>
        </section>

        <footer style={{ padding: "30px 0", textAlign: "center" }}>
          <div style={{ color: "#64748b", marginBottom: 8 }}>Built with ❤️ — Snapify</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <Link to="/login" className="link-help">Login</Link>
            <Link to="/register" className="link-help">Sign Up</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
