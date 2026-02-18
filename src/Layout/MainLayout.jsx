import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div
      style={{
        background: "#0c0c0c",
        color: "#d1d1d1",
        fontFamily: "'Josefin Sans', sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      {/* Page Content */}
      <div style={{ flex: 1, paddingTop: 60 }}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
