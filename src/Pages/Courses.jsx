import React, { useState, useRef, useEffect } from "react";

/* ============================================================
   GLOBAL CSS
   ============================================================ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,300;0,400;0,600;0,700;1,300&family=JetBrains+Mono:wght@300;400;500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:      #000000;
    --s1:      #080808;
    --s2:      #0f0f0f;
    --b1:      #1a1a1a;
    --b2:      #252525;
    --text:    #f0f0f0;
    --muted:   #3a3a3a;
    --muted2:  #606060;
    --green:   #00ff88;
    --cyan:    #00d4ff;
    --purple:  #a855f7;
    --yellow:  #fbbf24;
    --red:     #ff4560;
    --mono:    'JetBrains Mono', monospace;
    --sans:    'Josefin Sans', sans-serif;
  }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes glow {
    0%,100% { opacity:.5; }
    50%      { opacity:1; }
  }
  @keyframes blink {
    0%,100% { opacity:1; }
    50%      { opacity:0; }
  }
  @keyframes scanX {
    0%   { transform:translateX(-100%); opacity:0; }
    20%  { opacity:1; }
    80%  { opacity:1; }
    100% { transform:translateX(500%); opacity:0; }
  }
  @keyframes progressFill {
    from { width:0%; }
    to   { width:var(--target); }
  }
  @keyframes float {
    0%,100% { transform:translateY(0); }
    50%      { transform:translateY(-8px); }
  }
  @keyframes spin {
    to { transform:rotate(360deg); }
  }
  @keyframes slideInRight {
    from { opacity:0; transform:translateX(40px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes slideInLeft {
    from { opacity:0; transform:translateX(-40px); }
    to   { opacity:1; transform:translateX(0); }
  }
`;

/* ============================================================
   DATA
   ============================================================ */
const COURSES = [
  {
    id: 1,
    tag: "Python",
    tagColor: "#3b82f6",
    level: "Beginner",
    title: "Python Mastery",
    subtitle: "From zero to production-ready scripts",
    desc: "Master Python from fundamentals to advanced OOP, async programming, and building real-world CLI tools and APIs.",
    instructor: "Dr. Sarah Okonkwo",
    instructorRole: "ex-Google Engineer",
    rating: 4.9,
    students: "12.4K",
    duration: "6 Months",
    lessons: 96,
    badge: "BESTSELLER",
    badgeColor: "#00ff88",
    topics: ["Variables & Types","Control Flow","Functions","OOP","File I/O","APIs","Testing","Async"],
    icon: "🐍",
    progress: 0,
  },
  {
    id: 2,
    tag: "JavaScript",
    tagColor: "#f59e0b",
    level: "Intermediate",
    title: "JS Deep Dive",
    subtitle: "Closures, async, and the event loop",
    desc: "Understand JavaScript at the engine level. Closures, prototypes, event loop, promises, and modern ES2024+ features.",
    instructor: "Marcus Webb",
    instructorRole: "Staff Eng @ Vercel",
    rating: 4.8,
    students: "9.1K",
    duration: "4 Months",
    lessons: 72,
    badge: "HOT",
    badgeColor: "#f59e0b",
    topics: ["Closures","Prototypes","Event Loop","Promises","Generators","Proxies","Workers","V8 Internals"],
    icon: "⚡",
    progress: 0,
  },
  {
    id: 3,
    tag: "Rust",
    tagColor: "#f97316",
    level: "Advanced",
    title: "Systems with Rust",
    subtitle: "Memory safety without garbage collection",
    desc: "Build blazing-fast, memory-safe systems software. Ownership, borrowing, lifetimes, concurrency, and async Rust.",
    instructor: "Elena Torres",
    instructorRole: "Compiler Engineer",
    rating: 4.9,
    students: "4.2K",
    duration: "1 Year",
    lessons: 120,
    badge: "ADVANCED",
    badgeColor: "#f97316",
    topics: ["Ownership","Borrowing","Lifetimes","Traits","Concurrency","Async","Macros","FFI"],
    icon: "🦀",
    progress: 0,
  },
  {
    id: 4,
    tag: "React",
    tagColor: "#06b6d4",
    level: "Intermediate",
    title: "React Architecture",
    subtitle: "Patterns, performance, and production",
    desc: "Go beyond tutorials. Learn React patterns used at scale: compound components, render props, custom hooks, and performance.",
    instructor: "Priya Nair",
    instructorRole: "Frontend Lead @ Meta",
    rating: 4.7,
    students: "18.7K",
    duration: "5 Months",
    lessons: 80,
    badge: "POPULAR",
    badgeColor: "#06b6d4",
    topics: ["Hooks","Context","Performance","Patterns","Testing","SSR","State Mgmt","Animations"],
    icon: "⚛️",
    progress: 0,
  },
  {
    id: 5,
    tag: "Go",
    tagColor: "#00d4ff",
    level: "Intermediate",
    title: "Go for Backend",
    subtitle: "Concurrent servers at scale",
    desc: "Build production-grade REST APIs, gRPC services, and concurrent programs using Go's elegant simplicity.",
    instructor: "David Kim",
    instructorRole: "SRE @ Cloudflare",
    rating: 4.8,
    students: "6.3K",
    duration: "4 Months",
    lessons: 64,
    badge: "NEW",
    badgeColor: "#a855f7",
    topics: ["Goroutines","Channels","HTTP","gRPC","Testing","Modules","Docker","K8s"],
    icon: "🐹",
    progress: 0,
  },
  {
    id: 6,
    tag: "DevOps",
    tagColor: "#ff4560",
    level: "Advanced",
    title: "DevOps Bootcamp",
    subtitle: "CI/CD, containers, and cloud infra",
    desc: "Deploy and scale applications with confidence. Docker, Kubernetes, Terraform, GitHub Actions, and AWS/GCP.",
    instructor: "Alex Johnson",
    instructorRole: "DevOps Architect",
    rating: 4.6,
    students: "7.8K",
    duration: "8 Months",
    lessons: 104,
    badge: "COMPLETE",
    badgeColor: "#ff4560",
    topics: ["Docker","Kubernetes","Terraform","CI/CD","Monitoring","Security","AWS","GitOps"],
    icon: "🚀",
    progress: 0,
  },
];

const CURRICULUM = [
  { section: "Getting Started", month: "Month 1", lessons: [
    { title: "Course Overview & Orientation" },
    { title: "Setting Up Your Environment" },
    { title: "Writing Your First Program" },
  ]},
  { section: "Core Fundamentals", month: "Month 1 – 2", lessons: [
    { title: "Variables & Data Types" },
    { title: "Control Flow & Conditionals" },
    { title: "Functions & Scope" },
    { title: "Error Handling Patterns" },
  ]},
  { section: "Intermediate Concepts", month: "Month 2 – 3", lessons: [
    { title: "Object-Oriented Programming" },
    { title: "Functional Patterns" },
    { title: "Concurrency & Parallelism" },
  ]},
  { section: "Real-World Projects", month: "Month 3 – 6", lessons: [
    { title: "Building a REST API" },
    { title: "CLI Tool from Scratch" },
    { title: "Testing & Deployment" },
  ]},
];

/* ============================================================
   UTILS
   ============================================================ */
function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

/* ============================================================
   COURSE CARD
   ============================================================ */
function CourseCard({ course, onClick, idx }) {
  const [hover, setHover] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, 0.1);

  return (
    <div
      ref={ref}
      onClick={() => onClick(course)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "#0d0d0d" : "#080808",
        border: `1px solid ${hover ? course.tagColor + "40" : "#1a1a1a"}`,
        borderRadius: 12, overflow: "hidden", cursor: "pointer",
        transition: "all 0.3s ease", position: "relative",
        boxShadow: hover ? `0 0 60px ${course.tagColor}10, 0 20px 40px #00000060` : "0 4px 20px #00000040",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        animation: inView ? `fadeUp 0.5s ${idx * 0.08}s ease both` : "none",
      }}
    >
      {/* Shimmer on hover */}
      {hover && (
        <div style={{
          position: "absolute", top: 0, left: "-80%", width: "50%", height: "100%",
          background: `linear-gradient(90deg, transparent, ${course.tagColor}06, transparent)`,
          animation: "scanX 1s ease-out forwards", pointerEvents: "none", zIndex: 1,
        }} />
      )}

      {/* Top color bar */}
      <div style={{
        height: 3,
        background: course.tagColor,
        boxShadow: hover ? `0 0 16px ${course.tagColor}60` : "none",
        transition: "box-shadow 0.3s ease",
      }} />

      <div style={{ padding: "24px 24px 20px", position: "relative", zIndex: 2 }}>

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{
              padding: "3px 10px", borderRadius: 3, fontSize: 9,
              fontFamily: "var(--mono)", letterSpacing: "0.15em",
              background: `${course.tagColor}12`, color: course.tagColor,
              border: `1px solid ${course.tagColor}25`,
            }}>
              {course.tag}
            </div>
            <div style={{
              padding: "3px 10px", borderRadius: 3, fontSize: 9,
              fontFamily: "var(--mono)", letterSpacing: "0.15em",
              background: "#0f0f0f", color: "var(--muted2)",
              border: "1px solid #1a1a1a",
            }}>
              {course.level} 
            </div>
          </div>

          <div style={{
            padding: "3px 10px", borderRadius: 3, fontSize: 9,
            fontFamily: "var(--mono)", letterSpacing: "0.15em",
            background: `${course.badgeColor}15`,
            color: course.badgeColor,
            border: `1px solid ${course.badgeColor}30`,
          }}>
            {course.badge}
          </div>
        </div>

        {/* Icon + Title */}
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 10, flexShrink: 0,
            background: `${course.tagColor}10`,
            border: `1px solid ${course.tagColor}25`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24,
            animation: hover ? "float 3s ease-in-out infinite" : "none",
            transition: "all 0.3s ease",
          }}>
            {course.icon}
          </div>
          <div>
            <h3 style={{
              fontFamily: "var(--sans)", fontSize: 18, fontWeight: 700,
              color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.2,
              marginBottom: 4, textTransform: "uppercase",
            }}>
              {course.title}
            </h3>
            <p style={{
              fontFamily: "var(--mono)", fontSize: 11, color: course.tagColor,
              letterSpacing: "0.08em",
            }}>
              {course.subtitle}
            </p>
          </div>
        </div>

        {/* Desc */}
        <p style={{
          fontFamily: "var(--sans)", fontSize: 13, color: "#999",
          lineHeight: 1.75, fontWeight: 300, marginBottom: 18,
          letterSpacing: "0.02em",
        }}>
          {course.desc}
        </p>

        {/* Topics */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {course.topics.slice(0, 5).map(t => (
            <span key={t} style={{
              fontFamily: "var(--mono)", fontSize: 9, color: "#333",
              background: "#0f0f0f", border: "1px solid #1a1a1a",
              padding: "2px 8px", borderRadius: 3, letterSpacing: "0.08em",
            }}>
              {t}
            </span>
          ))}
          {course.topics.length > 5 && (
            <span style={{
              fontFamily: "var(--mono)", fontSize: 9, color: course.tagColor,
              padding: "2px 8px", letterSpacing: "0.08em",
            }}>
              +{course.topics.length - 5} more
            </span>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#111", marginBottom: 16 }} />

        {/* Stats */}
        <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          {[
            ["👥", course.students],
            ["📅", course.duration],
            ["📚", `${course.lessons} classes`],
          ].map(([icon, val]) => (
            <div key={val} style={{
              fontFamily: "var(--mono)", fontSize: 10,
              color: "var(--muted2)", letterSpacing: "0.05em",
              display: "flex", alignItems: "center", gap: 4,
            }}>
              <span>{icon}</span>
              <span>{val}</span>
            </div>
          ))}
        </div>

        {/* Duration badge bottom */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <div style={{
            fontFamily: "var(--sans)", fontSize: 13, fontWeight: 700,
            color: course.tagColor, letterSpacing: "0.06em",
            background: `${course.tagColor}10`, border: `1px solid ${course.tagColor}25`,
            padding: "6px 14px", borderRadius: 6,
          }}>
            📅 {course.duration}
          </div>
        </div>

      </div>

      {/* Enroll bar */}
      <div style={{
        padding: "14px 24px",
        background: hover ? `${course.tagColor}10` : "#050505",
        borderTop: `1px solid ${hover ? course.tagColor + "20" : "#111"}`,
        transition: "all 0.3s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10,
          color: hover ? course.tagColor : "var(--muted)",
          letterSpacing: "0.12em", transition: "color 0.3s",
        }}>
          VIEW DETAILS →
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          {[course.tagColor, course.tagColor + "60", course.tagColor + "30"].map((c, i) => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: "50%",
              background: c, transition: "all 0.3s ease",
              animation: hover ? `glow ${1 + i * 0.3}s infinite` : "none",
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   COURSES PAGE
   ============================================================ */
export function CoursesPage({ onSelectCourse }) {

  return (
    <div style={{
      background: "#000", minHeight: "100vh",
      fontFamily: "var(--sans)", position: "relative",
    }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* dot grid bg */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(circle, #ffffff06 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── HERO ── */}
        <div style={{
          padding: "80px 48px 60px", textAlign: "center",
          borderBottom: "1px solid #111", position: "relative", overflow: "hidden",
        }}>
          {/* glow */}
          <div style={{
            position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)",
            width: 600, height: 400,
            background: "radial-gradient(ellipse, #00ff8808 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            border: "1px solid #1c1c1c", borderRadius: 4,
            padding: "5px 16px", marginBottom: 28,
            fontFamily: "var(--mono)", fontSize: 10,
            color: "#00ff88", letterSpacing: "0.2em", background: "#00ff8808",
            animation: "fadeUp 0.5s ease both",
          }}>
            <span style={{ animation: "glow 2s infinite", fontSize: 8 }}>◆</span>
            CODEFORGE ACADEMY
          </div>

          <h1 style={{
            fontSize: "clamp(44px, 7vw, 88px)", fontWeight: 700,
            color: "var(--text)", letterSpacing: "-0.04em", lineHeight: 0.95,
            textTransform: "uppercase", marginBottom: 20,
            animation: "fadeUp 0.5s 0.1s ease both",
          }}>
            Learn to{" "}
            <span style={{ color: "#00ff88" }}>
              build
            </span>
            <br />
            <span style={{ fontWeight: 100, fontStyle: "italic", color: "#333" }}>
              real software
            </span>
          </h1>

          <p style={{
            fontFamily: "var(--mono)", fontSize: 14, color: "#666",
            lineHeight: 1.8, maxWidth: 520, margin: "0 auto 40px",
            animation: "fadeUp 0.5s 0.2s ease both",
          }}>
            No fluff. No fake projects. Just production-grade skills taught by engineers
            who've shipped at scale.
          </p>

          {/* Stats */}
          <div style={{
            display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap",
            animation: "fadeUp 0.5s 0.3s ease both",
          }}>
            {[["6","Courses"],["48K+","Students"],["4.8★","Avg Rating"],["100%","Job-Ready"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "var(--sans)", fontSize: 28, fontWeight: 700,
                  color: "#00ff88",
                }}>
                  {v}
                </div>
                <div style={{
                  fontFamily: "var(--mono)", fontSize: 9, color: "var(--muted2)",
                  letterSpacing: "0.15em", marginTop: 4, textTransform: "uppercase",
                }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── GRID ── */}
        <div style={{ padding: "48px 48px 80px" }}>
          {COURSES.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "80px 0",
              fontFamily: "var(--mono)", color: "#1a1a1a",
              fontSize: 14, letterSpacing: "0.1em",
            }}>
              // no courses found matching your filters
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 24,
            }}>
              {COURSES.map((c, i) => (
                <CourseCard key={c.id} course={c} onClick={onSelectCourse} idx={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   COURSE DETAILS PAGE
   ============================================================ */
export function CourseDetailsPage({ course, onBack }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [openSection, setOpenSection] = useState(0);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [playingLesson, setPlayingLesson] = useState(null);
  const heroRef = useRef(null);

  const handleEnroll = async () => {
    if (enrolling || enrolled) return;
    setEnrolling(true);
    await new Promise(r => setTimeout(r, 2000));
    setEnrolling(false);
    setEnrolled(true);
  };

  return (
    <div style={{
      background: "#000", minHeight: "100vh",
      fontFamily: "var(--sans)", position: "relative",
    }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* dot grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(circle, #ffffff06 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── BACK BAR ── */}
        <div style={{
          padding: "16px 48px",
          borderBottom: "1px solid #111",
          display: "flex", alignItems: "center", gap: 16,
          background: "#030303",
          position: "sticky", top: 0, zIndex: 50,
          backdropFilter: "blur(20px)",
        }}>
          <button onClick={onBack} style={{
            fontFamily: "var(--mono)", fontSize: 11, color: "#888",
            background: "transparent", border: "1px solid #1a1a1a",
            borderRadius: 5, padding: "6px 14px", cursor: "pointer",
            letterSpacing: "0.12em", transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: 8,
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#00ff88"; e.currentTarget.style.borderColor = "#00ff8840"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#333"; e.currentTarget.style.borderColor = "#1a1a1a"; }}
          >
            ← BACK
          </button>

          <div style={{ display: "flex", gap: 8 }}>
            <span style={{
              padding: "3px 10px", borderRadius: 3, fontSize: 9,
              fontFamily: "var(--mono)", letterSpacing: "0.15em",
              background: `${course.tagColor}12`, color: course.tagColor,
              border: `1px solid ${course.tagColor}25`,
            }}>
              {course.tag}
            </span>
            <span style={{
              padding: "3px 10px", borderRadius: 3, fontSize: 9,
              fontFamily: "var(--mono)", letterSpacing: "0.15em",
              background: "#0f0f0f", color: "var(--muted2)",
              border: "1px solid #1a1a1a",
            }}>
              {course.level}
            </span>
          </div>

          <span style={{
            fontFamily: "var(--sans)", fontSize: 13, fontWeight: 700,
            color: "var(--text)", letterSpacing: "0.04em", textTransform: "uppercase",
          }}>
            {course.title}
          </span>
        </div>

        {/* ── HERO SECTION ── */}
        <div ref={heroRef} style={{
          padding: "60px 48px 48px",
          borderBottom: "1px solid #111",
          position: "relative", overflow: "hidden",
        }}>
          {/* glow */}
          <div style={{
            position: "absolute", top: -150, right: -150, width: 500, height: 500,
            background: `radial-gradient(circle, ${course.tagColor}10 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 360px",
            gap: 60, alignItems: "flex-start",
          }}>

            {/* Left */}
            <div style={{ animation: "slideInLeft 0.5s ease both" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: `${course.badgeColor}12`,
                border: `1px solid ${course.badgeColor}30`,
                borderRadius: 3, padding: "4px 14px", marginBottom: 24,
                fontFamily: "var(--mono)", fontSize: 9,
                color: course.badgeColor, letterSpacing: "0.2em",
              }}>
                <span style={{ animation: "glow 2s infinite", fontSize: 7 }}>◆</span>
                {course.badge}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
                <div style={{
                  width: 80, height: 80, borderRadius: 16, flexShrink: 0,
                  background: `${course.tagColor}12`,
                  border: `1px solid ${course.tagColor}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 40, animation: "float 4s ease-in-out infinite",
                }}>
                  {course.icon}
                </div>
                <div>
                  <h1 style={{
                    fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700,
                    color: "var(--text)", letterSpacing: "-0.03em",
                    lineHeight: 1, textTransform: "uppercase",
                  }}>
                    {course.title}
                  </h1>
                  <p style={{
                    fontFamily: "var(--mono)", fontSize: 13,
                    color: course.tagColor, letterSpacing: "0.08em", marginTop: 8,
                  }}>
                    {course.subtitle}
                  </p>
                </div>
              </div>

              <p style={{
                fontFamily: "var(--sans)", fontSize: 15, color: "#888",
                lineHeight: 1.85, fontWeight: 300, marginBottom: 32,
                letterSpacing: "0.02em", maxWidth: 600,
              }}>
                {course.desc}
              </p>

              {/* Meta row */}
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 32 }}>
                {[
                  ["👥", `${course.students} Students`],
                  ["📅", course.duration],
                  ["🏫", `${course.lessons} Classes`],
                ].map(([icon, label]) => (
                  <div key={label} style={{
                    fontFamily: "var(--mono)", fontSize: 11,
                    color: "var(--muted2)", display: "flex",
                    alignItems: "center", gap: 6, letterSpacing: "0.05em",
                  }}>
                    <span>{icon}</span>{label}
                  </div>
                ))}
              </div>

            </div>

            {/* Right: Enroll card */}
            <div style={{
              animation: "slideInRight 0.5s 0.1s ease both",
              position: "sticky", top: 80,
            }}>
              <div style={{
                background: "#080808",
                border: `1px solid ${course.tagColor}25`,
                borderRadius: 12, overflow: "hidden",
                boxShadow: `0 0 60px ${course.tagColor}08, 0 24px 48px #00000060`,
              }}>
                {/* top bar */}
                <div style={{
                  height: 3,
                  background: course.tagColor,
                }} />

                <div style={{ padding: "28px 24px" }}>
                  {/* Duration highlight */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{
                      fontFamily: "var(--mono)", fontSize: 9,
                      color: "var(--muted2)", letterSpacing: "0.2em",
                      textTransform: "uppercase", marginBottom: 10,
                    }}>
                      Course Duration
                    </div>
                    <div style={{
                      fontFamily: "var(--sans)", fontSize: 36, fontWeight: 700,
                      color: course.tagColor, letterSpacing: "-0.02em", lineHeight: 1,
                    }}>
                      {course.duration}
                    </div>
                    <div style={{
                      fontFamily: "var(--mono)", fontSize: 11, color: "#333",
                      marginTop: 8, letterSpacing: "0.05em",
                    }}>
                      Offline classroom · {course.lessons} classes
                    </div>
                  </div>

                  {/* Enroll button */}
                  <button onClick={handleEnroll} style={{
                    width: "100%", padding: "16px",
                    background: enrolled ? "#00ff88" : enrolling ? "transparent" : course.tagColor,
                    color: enrolled || !enrolling ? "#000" : course.tagColor,
                    border: `2px solid ${course.tagColor}`,
                    borderRadius: 8, cursor: enrolling ? "wait" : "pointer",
                    fontFamily: "var(--sans)", fontSize: 14, fontWeight: 700,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    transition: "all 0.3s ease", marginBottom: 12,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    boxShadow: enrolled ? `0 0 30px ${course.tagColor}30` : "none",
                    animation: enrolling ? "pulse 1s infinite" : "none",
                  }}>
                    {enrolled ? "✓ ENROLLED!" : enrolling ? (
                      <>
                        <div style={{
                          width: 14, height: 14,
                          border: `2px solid ${course.tagColor}30`,
                          borderTop: `2px solid ${course.tagColor}`,
                          borderRadius: "50%", animation: "spin 0.7s linear infinite",
                        }} />
                        ENROLLING...
                      </>
                    ) : "ENROLL NOW"}
                  </button>

                  <button style={{
                    width: "100%", padding: "13px",
                    background: "transparent", color: "#888",
                    border: "1px solid #1a1a1a", borderRadius: 8,
                    fontFamily: "var(--sans)", fontSize: 13, fontWeight: 600,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    cursor: "pointer", transition: "all 0.2s",
                    marginBottom: 20,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color="#ccc"; e.currentTarget.style.borderColor="#333"; }}
                  onMouseLeave={e => { e.currentTarget.style.color="#333"; e.currentTarget.style.borderColor="#1a1a1a"; }}
                  >
                  BOOK DEMO CLASS →
                  </button>

                  {/* Includes */}
                  <div style={{ borderTop: "1px solid #111", paddingTop: 20 }}>
                    <div style={{
                      fontFamily: "var(--mono)", fontSize: 9,
                      color: "var(--muted2)", letterSpacing: "0.15em",
                      marginBottom: 14, textTransform: "uppercase",
                    }}>
                      This course includes:
                    </div>
                    {[
                      `${course.lessons} offline classroom sessions`,
                      `${course.duration} structured program`,
                      "Hands-on coding exercises",
                      "Doubt clearing sessions",
                      "Certificate of completion",
                      "Community & peer support",
                    ].map((item) => (
                      <div key={item} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        marginBottom: 10, fontFamily: "var(--mono)",
                        fontSize: 11, color: "#888", letterSpacing: "0.04em",
                      }}>
                        <span style={{ color: course.tagColor, fontSize: 12 }}>✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div style={{
          padding: "0 48px",
          borderBottom: "1px solid #111",
          display: "flex", gap: 0, background: "#030303",
          position: "sticky", top: 53, zIndex: 40,
        }}>
          {["overview", "curriculum", "topics"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "16px 24px",
              background: "transparent", color: activeTab === tab ? course.tagColor : "#333",
              border: "none",
              borderBottom: activeTab === tab ? `2px solid ${course.tagColor}` : "2px solid transparent",
              fontFamily: "var(--mono)", fontSize: 11, cursor: "pointer",
              letterSpacing: "0.15em", textTransform: "uppercase",
              transition: "all 0.2s",
            }}>
              {tab}
            </button>
          ))}
        </div>

        {/* ── TAB CONTENT ── */}
        <div style={{ padding: "48px 48px 80px", maxWidth: 860 }}>

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <h2 style={{
                fontFamily: "var(--sans)", fontSize: 28, fontWeight: 700,
                color: "var(--text)", letterSpacing: "-0.02em",
                textTransform: "uppercase", marginBottom: 24,
              }}>
                What you'll learn
              </h2>

              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: 12, marginBottom: 48,
              }}>
                {[
                  "Build production-ready applications from scratch",
                  "Understand core language internals and runtime",
                  "Write clean, testable, maintainable code",
                  "Deploy and monitor apps in production",
                  "Apply design patterns used at top companies",
                  "Debug complex issues like a senior engineer",
                  "Optimize performance at every layer",
                  "Contribute to open-source projects confidently",
                ].map(item => (
                  <div key={item} style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "14px 16px",
                    background: "#070707", border: "1px solid #141414",
                    borderRadius: 8, fontFamily: "var(--sans)",
                    fontSize: 13, color: "#888", lineHeight: 1.6,
                    fontWeight: 300, letterSpacing: "0.02em",
                  }}>
                    <span style={{ color: course.tagColor, marginTop: 1, flexShrink: 0 }}>→</span>
                    {item}
                  </div>
                ))}
              </div>

              {/* Requirements */}
              <h2 style={{
                fontFamily: "var(--sans)", fontSize: 22, fontWeight: 700,
                color: "var(--text)", letterSpacing: "-0.02em",
                textTransform: "uppercase", marginBottom: 16,
              }}>
                Requirements
              </h2>
              <div style={{ marginBottom: 40 }}>
                {[
                  "Basic understanding of programming concepts",
                  "A computer with internet connection",
                  "Willingness to practice and build projects",
                ].map(r => (
                  <div key={r} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    fontFamily: "var(--mono)", fontSize: 12,
                    color: "#3a3a3a", marginBottom: 10, letterSpacing: "0.04em",
                  }}>
                    <span style={{ color: course.tagColor }}>▸</span>
                    {r}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CURRICULUM */}
          {activeTab === "curriculum" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: 28,
              }}>
                <h2 style={{
                  fontFamily: "var(--sans)", fontSize: 28, fontWeight: 700,
                  color: "var(--text)", letterSpacing: "-0.02em", textTransform: "uppercase",
                }}>
                  Class Schedule
                </h2>
                <div style={{
                  fontFamily: "var(--mono)", fontSize: 10,
                  color: "var(--muted2)", letterSpacing: "0.1em",
                }}>
                  {CURRICULUM.reduce((a, s) => a + s.lessons.length, 0)} CLASSES · {course.duration}
                </div>
              </div>

              {CURRICULUM.map((section, si) => (
                <div key={si} style={{ marginBottom: 8 }}>
                  {/* Section header */}
                  <button
                    onClick={() => setOpenSection(openSection === si ? -1 : si)}
                    style={{
                      width: "100%", padding: "16px 20px",
                      background: openSection === si ? "#0d0d0d" : "#070707",
                      border: `1px solid ${openSection === si ? course.tagColor + "30" : "#1a1a1a"}`,
                      borderRadius: openSection === si ? "8px 8px 0 0" : 8,
                      cursor: "pointer", transition: "all 0.2s",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span style={{
                        fontFamily: "var(--mono)", fontSize: 10,
                        color: openSection === si ? course.tagColor : "#222",
                        letterSpacing: "0.15em",
                      }}>
                        {String(si + 1).padStart(2, "0")}
                      </span>
                      <span style={{
                        fontFamily: "var(--sans)", fontSize: 14, fontWeight: 700,
                        color: openSection === si ? "var(--text)" : "#444",
                        letterSpacing: "0.04em", textTransform: "uppercase",
                      }}>
                        {section.section}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {/* Month badge */}
                      <span style={{
                        fontFamily: "var(--mono)", fontSize: 9,
                        color: openSection === si ? course.tagColor : "#2a2a2a",
                        background: openSection === si ? `${course.tagColor}10` : "#0a0a0a",
                        border: `1px solid ${openSection === si ? course.tagColor + "25" : "#1a1a1a"}`,
                        padding: "2px 10px", borderRadius: 3,
                        letterSpacing: "0.1em", transition: "all 0.2s",
                      }}>
                        {section.month}
                      </span>
                      <span style={{
                        fontFamily: "var(--mono)", fontSize: 9,
                        color: "var(--muted)", letterSpacing: "0.1em",
                      }}>
                        {section.lessons.length} CLASSES
                      </span>
                      <span style={{
                        color: openSection === si ? course.tagColor : "#222",
                        fontSize: 10, transition: "transform 0.2s, color 0.2s",
                        transform: openSection === si ? "rotate(180deg)" : "none",
                        display: "inline-block",
                      }}>
                        ▼
                      </span>
                    </div>
                  </button>

                  {/* Class list */}
                  {openSection === si && (
                    <div style={{
                      border: `1px solid ${course.tagColor}18`,
                      borderTop: "none", borderRadius: "0 0 8px 8px",
                      overflow: "hidden", animation: "fadeUp 0.2s ease",
                    }}>
                      {section.lessons.map((lesson, li) => (
                        <div
                          key={li}
                          style={{
                            padding: "15px 20px 15px 48px",
                            background: "#080808",
                            borderBottom: li < section.lessons.length - 1 ? "1px solid #0f0f0f" : "none",
                            display: "flex", alignItems: "center",
                            justifyContent: "space-between",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = "#0d0d0d"}
                          onMouseLeave={e => e.currentTarget.style.background = "#080808"}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            {/* Class number dot */}
                            <div style={{
                              width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                              background: `${course.tagColor}10`,
                              border: `1px solid ${course.tagColor}20`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontFamily: "var(--mono)", fontSize: 9,
                              color: course.tagColor, letterSpacing: "0.05em",
                            }}>
                              {String(li + 1).padStart(2, "0")}
                            </div>
                            <span style={{
                              fontFamily: "var(--sans)", fontSize: 13,
                              color: "#555", letterSpacing: "0.04em",
                              fontWeight: 400,
                            }}>
                              {lesson.title}
                            </span>
                          </div>
                          {/* Class label */}
                          <span style={{
                            fontFamily: "var(--mono)", fontSize: 9,
                            color: "#1e1e1e", letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}>
                            CLASS {(si * 3) + li + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TOPICS */}
          {activeTab === "topics" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <h2 style={{
                fontFamily: "var(--sans)", fontSize: 28, fontWeight: 700,
                color: "var(--text)", letterSpacing: "-0.02em",
                textTransform: "uppercase", marginBottom: 28,
              }}>
                Topics Covered
              </h2>

              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}>
                {course.topics.map((topic, i) => (
                  <div key={i} style={{
                    padding: "20px 20px",
                    background: "#070707",
                    border: `1px solid #141414`,
                    borderRadius: 8,
                    display: "flex", alignItems: "center", gap: 16,
                    transition: "all 0.2s ease",
                    cursor: "default",
                    animation: `fadeUp 0.4s ${i * 0.06}s ease both`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = course.tagColor + "30";
                    e.currentTarget.style.background = "#0d0d0d";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#141414";
                    e.currentTarget.style.background = "#070707";
                  }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: 6, flexShrink: 0,
                      background: `${course.tagColor}12`,
                      border: `1px solid ${course.tagColor}25`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700,
                      color: course.tagColor,
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div style={{
                        fontFamily: "var(--sans)", fontSize: 14, fontWeight: 700,
                        color: "var(--text)", letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}>
                        {topic}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ============================================================
   APP — wires both pages together
   ============================================================ */
export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return selectedCourse ? (
    <CourseDetailsPage
      course={selectedCourse}
      onBack={() => setSelectedCourse(null)}
    />
  ) : (
    <CoursesPage onSelectCourse={setSelectedCourse} />
  );
}