import React from "react";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div
      style={{
        background: "#151515",
        padding: 30,
        borderRadius: 12,
        border: "1px solid #222"
      }}
    >
      <h2 style={{ color: "#fff" }}>{course.title}</h2>
      <p style={{ color: "#888" }}>{course.description}</p>

      <p style={{ color: "#aaa" }}>
        Duration: {course.duration}
      </p>

      <Link
        to={`/courses/${course.id}`}
        style={{
          display: "inline-block",
          marginTop: 15,
          padding: "10px 18px",
          background: "#fff",
          color: "#000",
          textDecoration: "none",
          borderRadius: 6
        }}
      >
        View Details
      </Link>
    </div>
  );
}
