import React from "react";

import { useParams } from "react-router-dom";
import courses from "../Data/data.json";

export default function CourseDetails() {
  const { id } = useParams();

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return <div style={{ padding: 120 }}>Course Not Found</div>;
  }

  return (
    <section style={{ padding: "120px 40px" }}>
      <h1 style={{ color: "#fff", fontSize: 42 }}>
        {course.title}
      </h1>

      <p style={{ color: "#aaa", marginBottom: 20 }}>
        Duration: {course.duration}
      </p>

      <p style={{ color: "#888", marginBottom: 40 }}>
        {course.description}
      </p>

      <h2 style={{ color: "#fff", marginBottom: 20 }}>
        Course Modules
      </h2>

      {course.modules.map((module, index) => (
        <div
          key={index}
          style={{
            marginBottom: 30,
            padding: 20,
            background: "#151515",
            borderRadius: 10,
            border: "1px solid #222"
          }}
        >
          <h3 style={{ color: "#fff" }}>{module.title}</h3>

          <ul style={{ color: "#aaa", marginTop: 10 }}>
            {module.topics.map((topic, i) => (
              <li key={i}>{topic}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
