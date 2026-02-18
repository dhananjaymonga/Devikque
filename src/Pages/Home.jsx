import React from "react";
import { Link } from "react-router-dom";
import courses from "../Data/data.json";
import CodeEditor from "../component/CodeEditor";
import "../component/src/home.css";
import { HowItWorks } from "../component/HowItWorks";
import { Testimonials } from "../component/Testimonials";
import { CTASection } from "../component/CTA";
// import { Testimonials} from "../component/Testimonials";
export default function Home() {
  return (
    <div className="home">

      {/* ================= HERO SECTION ================= */}
      <section className="hero">

        {/* LEFT SIDE */}
        <div className="hero-left">
          <h1>
            Master In-Demand Skills.
            <br />
            Build Your Tech Career.
          </h1>

          <p>
            Learn Python, advanced technologies, and industry-ready skills with
            structured modules, real projects, and career preparation.
          </p>

          <div className="hero-buttons">
            <Link to="/courses" className="btn-primary">
              Explore Courses
            </Link>

            <Link to="/pricing" className="btn-secondary">
              View Pricing
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hero-right">

          {/* Object 1 - Code Editor */}
          <div className="editor-card">
            <div className="editor-header">app.js</div>
            <pre>
{`function greet() {
  console.log("Hello Developer 🚀");
}

greet();`}
            </pre>
          </div>

          {/* Object 2 - Glowing Gradient Ball */}
          <div className="glow-ball"></div>

          {/* Object 3 - Mini Dashboard */}
          <div className="mini-dashboard">
            <div className="dash-bar"></div>
            <div className="dash-bar short"></div>
            <div className="dash-bar"></div>
          </div>

        </div>
      </section>

    

      <CodeEditor />
      <HowItWorks/>
      <Testimonials/>
      <CTASection/>
    </div>
  );
}
