import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const sectionTitle = {
    color: "#fff",
    fontSize: 16,
    marginBottom: 15
  };

  const linkStyle = {
    color: "#888",
    textDecoration: "none",
    display: "block",
    marginBottom: 8,
    fontSize: 14
  };

  return (
    <footer
      style={{
        background: "#111",
        borderTop: "1px solid #222",
        padding: "60px 40px 30px 40px",
        marginTop: 80
      }}
    >
      {/* Top Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 40
        }}
      >
        {/* Brand Section */}
        <div>
          <h2 style={{ color: "#fff", marginBottom: 15 }}>
            integra
          </h2>
          <p style={{ color: "#888", maxWidth: 300 }}>
            Learn in-demand tech skills with structured modules,
            real-world projects, and company preparation guidance.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 style={sectionTitle}>Navigation</h3>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/courses" style={linkStyle}>Courses</Link>
          <Link to="/features" style={linkStyle}>Features</Link>
          <Link to="/pricing" style={linkStyle}>Pricing</Link>
        </div>

        {/* Courses */}
        <div>
          <h3 style={sectionTitle}>Popular Courses</h3>
          <Link to="/courses/python-mastery" style={linkStyle}>
            Python Mastery
          </Link>
        </div>

        {/* Social */}
        <div>
          <h3 style={sectionTitle}>Connect</h3>
          <a href="#" style={linkStyle}>LinkedIn</a>
          <a href="#" style={linkStyle}>Instagram</a>
          <a href="#" style={linkStyle}>YouTube</a>
        </div>
      </div>

      {/* Bottom Line */}
      <div
        style={{
          borderTop: "1px solid #222",
          marginTop: 40,
          paddingTop: 20,
          textAlign: "center",
          color: "#666",
          fontSize: 13
        }}
      >
        © {new Date().getFullYear()} integra. All rights reserved.
      </div>
    </footer>
  );
}
