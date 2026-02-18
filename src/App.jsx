import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import CourseDetails from "./Pages/CoursesDetails";
import AboutPage from "./Pages/About";
import CodeEditor from "./component/CodeEditor";
// import Features from "./component/Features";
// import Pricing from "./component/CodeEditor";
// import Docs from "./Pages/Docs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetails />} />
          <Route path="about" element={<AboutPage />} />
          {/* <Route path="features" element={<Features />} /> */}
          {/* <Route path="pricing" element={<Pricing />} /> */}
          {/* <Route path="docs" element={<Docs />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
