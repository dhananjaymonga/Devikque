import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const linkStyle = {
    color: "#aaa",
    textDecoration: "none",
    fontSize: 15
  };

  return (
    <nav
      style={{
        position: "fixed",
        width: "100%",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        background: "#111",
        borderBottom: "1px solid #222",
        zIndex: 100
      }}
    >
      <h2 style={{ color: "#fff" }}>Devique</h2>

      <div style={{ display: "flex", gap: 25 }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/courses" style={linkStyle}>Courses</Link>
        <Link to="/features" style={linkStyle}>Features</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/docs" style={linkStyle}>Docs</Link>
      </div>
    </nav>
  );
}
