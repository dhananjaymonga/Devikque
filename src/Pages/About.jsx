import React, { useState, useEffect, useRef } from "react";

/* ============================================================
   CSS
   ============================================================ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;1,300;1,700&family=JetBrains+Mono:wght@300;400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:    #000000;
    --s1:    #080808;
    --s2:    #0f0f0f;
    --b1:    #1a1a1a;
    --b2:    #282828;
    --text:  #f0f0f0;
    --dim:   #606060;
    --muted: #2a2a2a;
    --green: #00ff88;
    --cyan:  #00d4ff;
    --sans:  'Josefin Sans', sans-serif;
    --mono:  'JetBrains Mono', monospace;
  }

  html { scroll-behavior: smooth; }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(32px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeLeft {
    from { opacity:0; transform:translateX(-32px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes fadeRight {
    from { opacity:0; transform:translateX(32px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes glow {
    0%,100% { opacity:.4; }
    50%      { opacity:1; }
  }
  @keyframes blink {
    0%,100% { opacity:1; }
    50%      { opacity:0; }
  }
  @keyframes float {
    0%,100% { transform:translateY(0px) rotate(0deg); }
    33%      { transform:translateY(-12px) rotate(1deg); }
    66%      { transform:translateY(-6px) rotate(-1deg); }
  }
  @keyframes spinSlow {
    to { transform:rotate(360deg); }
  }
  @keyframes marqueeScroll {
    0%   { transform:translateX(0); }
    100% { transform:translateX(-50%); }
  }
  @keyframes counterUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes lineGrow {
    from { width:0; }
    to   { width:100%; }
  }
  @keyframes dotPulse {
    0%,100% { transform:scale(1); opacity:.5; }
    50%      { transform:scale(1.4); opacity:1; }
  }
  @keyframes scanDown {
    0%   { transform:translateY(-100%); }
    100% { transform:translateY(200%); }
  }
  @keyframes revealChar {
    from { opacity:0; transform:translateY(8px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes borderPulse {
    0%,100% { border-color:#1a1a1a; }
    50%      { border-color:#2a2a2a; }
  }
`;

/* ============================================================
   UTILS
   ============================================================ */
function useInView(ref, threshold = 0.1) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return v;
}

function useCounter(target, inView, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return val;
}

/* ============================================================
   SECTION WRAPPER
   ============================================================ */
function Section({ children, id, style = {} }) {
  return (
    <section id={id} style={{
      position: "relative", overflow: "hidden",
      borderTop: "1px solid #0f0f0f",
      ...style,
    }}>
      {children}
    </section>
  );
}

/* ============================================================
   BADGE
   ============================================================ */
function Badge({ label, color = "#00ff88" }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      border: "1px solid #1a1a1a", borderRadius: 3,
      padding: "5px 16px",
      fontFamily: "var(--mono)", fontSize: 10,
      color, letterSpacing: "0.2em",
      background: `${color}08`,
    }}>
      <span style={{ animation: "glow 2s infinite", fontSize: 7 }}>◆</span>
      {label}
    </div>
  );
}

/* ============================================================
   1. HERO
   ============================================================ */
function Hero() {
  const [chars, setChars] = useState([]);
  const [cursor, setCursor] = useState(true);
  const name = "DEVIQUE";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i <= name.length) {
        setChars(name.slice(0, i).split(""));
        i++;
      } else clearInterval(t);
    }, 120);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <Section style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      {/* dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, #ffffff07 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />
      {/* scan line */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, #00ff8820, transparent)",
        animation: "scanDown 8s linear infinite",
        pointerEvents: "none",
      }} />
      {/* corner glows */}
      <div style={{
        position: "absolute", top: -200, left: -200, width: 600, height: 600,
        background: "radial-gradient(circle, #00ff8808 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -200, right: -200, width: 500, height: 500,
        background: "radial-gradient(circle, #00d4ff06 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "120px 48px",
        width: "100%", position: "relative", zIndex: 1,
      }}>
        {/* eyebrow */}
        <div style={{ animation: "fadeUp 0.6s ease both", marginBottom: 32 }}>
          <Badge label="ABOUT US" />
        </div>

        {/* Big name */}
        <div style={{ marginBottom: 24, overflow: "hidden" }}>
          <h1 style={{
            fontFamily: "var(--sans)", fontSize: "clamp(72px, 14vw, 180px)",
            fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.9,
            textTransform: "uppercase", color: "var(--text)",
          }}>
            {chars.map((ch, i) => (
              <span key={i} style={{
                display: "inline-block",
                animation: `revealChar 0.3s ${i * 0.05}s ease both`,
                color: ch === "I" ? "#00ff88" : "var(--text)",
              }}>
                {ch}
              </span>
            ))}
            {chars.length < name.length && (
              <span style={{
                display: "inline-block", width: 4,
                background: "#00ff88", height: "0.85em",
                verticalAlign: "text-bottom", marginLeft: 4,
                opacity: cursor ? 1 : 0, transition: "opacity 0.1s",
              }} />
            )}
          </h1>
          <div style={{
            fontFamily: "var(--sans)", fontSize: "clamp(18px, 3vw, 36px)",
            fontWeight: 100, fontStyle: "italic", color: "#333",
            letterSpacing: "0.05em", marginTop: 8,
            animation: "fadeUp 0.7s 0.6s ease both", opacity: 0,
            animationFillMode: "forwards",
          }}>
            We build. We train. We deliver.
          </div>
        </div>

        {/* desc */}
        <p style={{
          fontFamily: "var(--mono)", fontSize: 14, color: "#444",
          lineHeight: 1.9, maxWidth: 580, marginBottom: 56,
          letterSpacing: "0.02em",
          animation: "fadeUp 0.7s 0.8s ease both", opacity: 0,
          animationFillMode: "forwards",
        }}>
          DEVIQUE is a next-gen tech company delivering cutting-edge software solutions
          to clients, world-class training programs for students, and real-world internship
          experiences — all under one roof.
        </p>

        {/* CTA row */}
        <div style={{
          display: "flex", gap: 16, flexWrap: "wrap",
          animation: "fadeUp 0.7s 1s ease both", opacity: 0,
          animationFillMode: "forwards",
        }}>
          <button style={{
            padding: "14px 36px", borderRadius: 6,
            background: "#00ff88", color: "#000",
            border: "2px solid #00ff88",
            fontFamily: "var(--sans)", fontSize: 13, fontWeight: 700,
            cursor: "pointer", letterSpacing: "0.15em", textTransform: "uppercase",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#00ff88"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#00ff88"; e.currentTarget.style.color = "#000"; }}
          >
            OUR SERVICES →
          </button>
          <button style={{
            padding: "14px 32px", borderRadius: 6,
            background: "transparent", color: "#333",
            border: "1px solid #1a1a1a",
            fontFamily: "var(--sans)", fontSize: 13, fontWeight: 600,
            cursor: "pointer", letterSpacing: "0.12em", textTransform: "uppercase",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#ccc"; e.currentTarget.style.borderColor = "#333"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#333"; e.currentTarget.style.borderColor = "#1a1a1a"; }}
          >
            GET IN TOUCH
          </button>
        </div>

        {/* scroll hint */}
        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "fadeIn 1s 1.5s ease both", opacity: 0, animationFillMode: "forwards",
        }}>
          <div style={{
            fontFamily: "var(--mono)", fontSize: 9, color: "#222",
            letterSpacing: "0.2em", textTransform: "uppercase",
          }}>
            scroll
          </div>
          <div style={{
            width: 1, height: 40, background: "#1a1a1a",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, width: "100%",
              height: "40%", background: "#00ff88",
              animation: "scanDown 2s ease-in-out infinite",
            }} />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   2. MARQUEE — scrolling services ticker
   ============================================================ */
const TICKER_ITEMS = [
  "WEB DEVELOPMENT", "◆", "MOBILE APPS", "◆", "BILLING SYSTEMS", "◆",
  "STUDENT TRAINING", "◆", "INTERNSHIP PROGRAMS", "◆", "CUSTOM SOFTWARE", "◆",
  "UI/UX DESIGN", "◆", "API DEVELOPMENT", "◆", "DEVIQUE", "◆",
  "CLOUD SOLUTIONS", "◆", "ENTERPRISE SOFTWARE", "◆", "CODE. BUILD. SHIP.", "◆",
];

function Marquee() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{
      background: "#080808", borderTop: "1px solid #111", borderBottom: "1px solid #111",
      padding: "18px 0", overflow: "hidden", position: "relative",
    }}>
      <div style={{
        display: "flex", gap: 40,
        animation: "marqueeScroll 28s linear infinite",
        width: "max-content",
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: item === "◆" ? "var(--mono)" : "var(--sans)",
            fontSize: item === "◆" ? 10 : 13,
            fontWeight: 700, letterSpacing: "0.18em",
            color: item === "◆" ? "#00ff88" : "#2a2a2a",
            whiteSpace: "nowrap", textTransform: "uppercase",
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   3. STATS
   ============================================================ */
const STATS = [
  { val: 120, suffix: "+", label: "Projects Delivered" },
  { val: 500, suffix: "+", label: "Students Trained" },
  { val: 48,  suffix: "+", label: "Interns Placed" },
  { val: 5,   suffix: " yrs", label: "In Industry" },
];

function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, 0.2);

  return (
    <Section style={{ background: "#000", padding: "100px 48px" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          border: "1px solid #111", borderRadius: 12, overflow: "hidden",
        }}>
          {STATS.map((s, i) => (
            <StatItem key={i} s={s} inView={inView} i={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function StatItem({ s, inView, i }) {
  const count = useCounter(s.val, inView);
  return (
    <div style={{
      padding: "48px 40px",
      borderRight: i < STATS.length - 1 ? "1px solid #111" : "none",
      background: "#040404", textAlign: "center",
      animation: inView ? `counterUp 0.6s ${i * 0.12}s ease both` : "none",
      opacity: inView ? 1 : 0,
    }}>
      <div style={{
        fontFamily: "var(--sans)", fontSize: "clamp(44px, 5vw, 72px)",
        fontWeight: 700, color: "#00ff88", letterSpacing: "-0.03em", lineHeight: 1,
      }}>
        {count}{s.suffix}
      </div>
      <div style={{
        fontFamily: "var(--mono)", fontSize: 10, color: "#2a2a2a",
        letterSpacing: "0.15em", marginTop: 12, textTransform: "uppercase",
      }}>
        {s.label}
      </div>
    </div>
  );
}

/* ============================================================
   4. ABOUT STORY
   ============================================================ */
function AboutStory() {
  const ref = useRef(null);
  const inView = useInView(ref, 0.1);

  return (
    <Section style={{ background: "#000", padding: "110px 48px" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

          {/* Left */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateX(-32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
            <Badge label="WHO WE ARE" />
            <h2 style={{
              fontFamily: "var(--sans)", fontSize: "clamp(36px, 4vw, 58px)",
              fontWeight: 700, color: "var(--text)", letterSpacing: "-0.03em",
              lineHeight: 1.05, textTransform: "uppercase", marginTop: 24, marginBottom: 28,
            }}>
              Built by devs.<br />
              <span style={{ fontWeight: 100, fontStyle: "italic", color: "#333" }}>
                For the world.
              </span>
            </h2>
            <p style={{
              fontFamily: "var(--sans)", fontSize: 15, color: "#444",
              lineHeight: 1.9, fontWeight: 300, marginBottom: 20, letterSpacing: "0.02em",
            }}>
              DEVIQUE was founded with a single obsession — close the gap between learning
              and doing. We noticed that students graduate without real skills, and clients
              struggle to find trustworthy tech partners.
            </p>
            <p style={{
              fontFamily: "var(--sans)", fontSize: 15, color: "#333",
              lineHeight: 1.9, fontWeight: 300, letterSpacing: "0.02em",
            }}>
              So we built something different: a tech company that trains the next generation
              of engineers while simultaneously shipping world-class software for clients.
              Everyone wins.
            </p>

            {/* timeline */}
            <div style={{ marginTop: 40, paddingLeft: 20, borderLeft: "1px solid #1a1a1a" }}>
              {[
                ["2020", "Founded in a small office with 3 engineers"],
                ["2022", "Launched student training & internship program"],
                ["2023", "50+ clients served across 8 industries"],
                ["2025", "500+ students trained. Growing every day."],
              ].map(([year, text]) => (
                <div key={year} style={{ marginBottom: 20, position: "relative" }}>
                  <div style={{
                    position: "absolute", left: -25, top: 4,
                    width: 8, height: 8, borderRadius: "50%",
                    background: "#00ff88",
                    animation: "dotPulse 2s infinite",
                    boxShadow: "0 0 8px #00ff8860",
                  }} />
                  <div style={{
                    fontFamily: "var(--mono)", fontSize: 10, color: "#00ff88",
                    letterSpacing: "0.15em", marginBottom: 4,
                  }}>
                    {year}
                  </div>
                  <div style={{
                    fontFamily: "var(--sans)", fontSize: 13, color: "#3a3a3a",
                    fontWeight: 300, letterSpacing: "0.03em",
                  }}>
                    {text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — animated visual */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateX(32px)",
            transition: "opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease",
          }}>
            <div style={{
              border: "1px solid #1a1a1a", borderRadius: 16, padding: 48,
              background: "#050505", position: "relative", overflow: "hidden",
              minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {/* spinning ring */}
              <div style={{
                position: "absolute",
                width: 280, height: 280, borderRadius: "50%",
                border: "1px solid #1a1a1a",
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                animation: "spinSlow 20s linear infinite",
              }}>
                <div style={{
                  position: "absolute", top: -4, left: "50%",
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#00ff88",
                  boxShadow: "0 0 12px #00ff88",
                  transform: "translateX(-50%)",
                }} />
              </div>
              <div style={{
                position: "absolute",
                width: 180, height: 180, borderRadius: "50%",
                border: "1px solid #161616",
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                animation: "spinSlow 14s linear infinite reverse",
              }}>
                <div style={{
                  position: "absolute", bottom: -4, left: "50%",
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#00d4ff",
                  boxShadow: "0 0 10px #00d4ff",
                  transform: "translateX(-50%)",
                }} />
              </div>

              {/* Center logo */}
              <div style={{
                textAlign: "center", position: "relative", zIndex: 2,
                animation: "float 5s ease-in-out infinite",
              }}>
                <div style={{
                  fontFamily: "var(--sans)", fontSize: 52, fontWeight: 700,
                  color: "var(--text)", letterSpacing: "-0.05em",
                }}>
                  DEV<span style={{ color: "#00ff88" }}>I</span>QUE
                </div>
                <div style={{
                  fontFamily: "var(--mono)", fontSize: 10, color: "#222",
                  letterSpacing: "0.2em", marginTop: 8,
                }}>
                  EST. 2020
                </div>
              </div>

              {/* corner tags */}
              {[
                { label: "BUILD", pos: { top: 20, left: 20 } },
                { label: "TRAIN", pos: { top: 20, right: 20 } },
                { label: "SHIP",  pos: { bottom: 20, left: 20 } },
                { label: "GROW",  pos: { bottom: 20, right: 20 } },
              ].map(({ label, pos }) => (
                <div key={label} style={{
                  position: "absolute", ...pos,
                  fontFamily: "var(--mono)", fontSize: 9,
                  color: "#1e1e1e", letterSpacing: "0.2em",
                  border: "1px solid #141414",
                  padding: "4px 10px", borderRadius: 3,
                }}>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   5. SERVICES
   ============================================================ */
const SERVICES = [
  {
    icon: "⚡",
    title: "Web Development",
    color: "#00ff88",
    desc: "Custom websites, web apps, landing pages, dashboards — built fast, built to last. From simple brochure sites to complex enterprise portals.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
  },
  {
    icon: "📱",
    title: "App Development",
    color: "#00d4ff",
    desc: "Native & cross-platform mobile apps for iOS and Android. Clean UX, fast performance, and seamless backend integration.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    icon: "🧾",
    title: "Billing Systems",
    color: "#a855f7",
    desc: "Custom invoicing, payment tracking, subscription management, and GST-compliant billing software tailored to your business.",
    tags: ["Invoicing", "GST", "Payments", "Reports"],
  },
  {
    icon: "🏢",
    title: "Enterprise Software",
    color: "#fbbf24",
    desc: "ERP systems, CRM platforms, inventory management, HR tools — complete custom enterprise solutions built from the ground up.",
    tags: ["ERP", "CRM", "Inventory", "HR Mgmt"],
  },
  {
    icon: "🎓",
    title: "Student Training",
    color: "#00ff88",
    desc: "Offline classroom courses in Python, JavaScript, React, Java, and more — taught by engineers who've shipped real production code.",
    tags: ["Python", "React", "JavaScript", "Java"],
  },
  {
    icon: "🚀",
    title: "Internship Program",
    color: "#ff4560",
    desc: "Real-world internship experience on live client projects. Students get mentorship, stipends, and industry exposure from day one.",
    tags: ["Live Projects", "Mentorship", "Stipend", "Certificate"],
  },
];

function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, 0.05);
  const [hovered, setHovered] = useState(null);

  return (
    <Section style={{ background: "#000", padding: "110px 48px" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 20,
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <div>
            <Badge label="WHAT WE DO" color="#00d4ff" />
            <h2 style={{
              fontFamily: "var(--sans)", fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 700, color: "var(--text)", letterSpacing: "-0.03em",
              lineHeight: 1, textTransform: "uppercase", marginTop: 20,
            }}>
              Our Services
            </h2>
          </div>
          <p style={{
            fontFamily: "var(--mono)", fontSize: 12, color: "#333",
            maxWidth: 280, lineHeight: 1.8, letterSpacing: "0.04em",
          }}>
            End-to-end solutions — from a single landing page to a full enterprise suite.
          </p>
        </div>

        {/* grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1, background: "#0f0f0f",
          border: "1px solid #0f0f0f", borderRadius: 12, overflow: "hidden",
        }}>
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={i} s={s} i={i} inView={inView}
              hovered={hovered === i}
              onHover={() => setHovered(i)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function ServiceCard({ s, i, inView, hovered, onHover, onLeave }) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        background: hovered ? "#0d0d0d" : "#030303",
        padding: "40px 36px",
        transition: "background 0.3s ease",
        position: "relative", overflow: "hidden",
        opacity: inView ? 1 : 0,
        animation: inView ? `fadeUp 0.5s ${i * 0.08}s ease both` : "none",
        borderBottom: hovered ? `2px solid ${s.color}30` : "2px solid transparent",
      }}
    >
      {/* left accent bar on hover */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: hovered ? 2 : 0,
        background: s.color,
        transition: "width 0.3s ease",
        boxShadow: `0 0 12px ${s.color}`,
      }} />

      {/* icon */}
      <div style={{
        width: 56, height: 56, borderRadius: 12, marginBottom: 24,
        background: `${s.color}10`,
        border: `1px solid ${s.color}25`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24,
        animation: hovered ? "float 3s ease-in-out infinite" : "none",
        transition: "all 0.3s ease",
        boxShadow: hovered ? `0 0 24px ${s.color}20` : "none",
      }}>
        {s.icon}
      </div>

      <h3 style={{
        fontFamily: "var(--sans)", fontSize: 18, fontWeight: 700,
        color: hovered ? "var(--text)" : "#444", letterSpacing: "0.02em",
        textTransform: "uppercase", marginBottom: 14,
        transition: "color 0.3s ease",
      }}>
        {s.title}
      </h3>

      <p style={{
        fontFamily: "var(--sans)", fontSize: 13, color: "#2e2e2e",
        lineHeight: 1.8, fontWeight: 300, letterSpacing: "0.02em", marginBottom: 20,
      }}>
        {s.desc}
      </p>

      {/* tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {s.tags.map(t => (
          <span key={t} style={{
            fontFamily: "var(--mono)", fontSize: 9,
            color: hovered ? s.color : "#1e1e1e",
            background: hovered ? `${s.color}10` : "#080808",
            border: `1px solid ${hovered ? s.color + "25" : "#141414"}`,
            padding: "2px 8px", borderRadius: 3, letterSpacing: "0.1em",
            transition: "all 0.3s ease",
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   6. TRAINING SECTION
   ============================================================ */
const COURSES = [
  { name: "Python Programming", duration: "6 Months", level: "Beginner", color: "#3b82f6", icon: "🐍" },
  { name: "JavaScript & React", duration: "5 Months", level: "Intermediate", color: "#f59e0b", icon: "⚡" },
  { name: "Java Development",   duration: "6 Months", level: "Intermediate", color: "#ef4444", icon: "☕" },
  { name: "Full Stack Dev",     duration: "1 Year",   level: "Advanced",    color: "#00ff88", icon: "🖥️" },
  { name: "Mobile App Dev",     duration: "4 Months", level: "Intermediate", color: "#a855f7", icon: "📱" },
  { name: "DevOps & Cloud",     duration: "8 Months", level: "Advanced",    color: "#ff4560", icon: "🚀" },
];

function Training() {
  const ref = useRef(null);
  const inView = useInView(ref, 0.1);

  return (
    <Section style={{ background: "#030303", padding: "110px 48px" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 80 }}>

          {/* Left sticky info */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateX(-24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
            <Badge label="TRAINING PROGRAMS" color="#a855f7" />
            <h2 style={{
              fontFamily: "var(--sans)", fontSize: "clamp(32px, 3.5vw, 52px)",
              fontWeight: 700, color: "var(--text)", letterSpacing: "-0.03em",
              lineHeight: 1.05, textTransform: "uppercase", marginTop: 24, marginBottom: 20,
            }}>
              Learn from<br />
              <span style={{ fontWeight: 100, fontStyle: "italic", color: "#333" }}>
                real engineers
              </span>
            </h2>
            <p style={{
              fontFamily: "var(--sans)", fontSize: 14, color: "#3a3a3a",
              lineHeight: 1.85, fontWeight: 300, marginBottom: 32, letterSpacing: "0.02em",
            }}>
              Our classroom-based training programs are designed for students who want
              real skills, not just certificates. Every course is taught by engineers
              currently working on production systems.
            </p>

            {/* feature list */}
            {[
              ["🏫", "Offline classroom learning"],
              ["💻", "Hands-on coding every session"],
              ["🧑‍💼", "Industry mentorship included"],
              ["📜", "Certificate upon completion"],
              ["🤝", "Direct internship pipeline"],
            ].map(([icon, text]) => (
              <div key={text} style={{
                display: "flex", alignItems: "center", gap: 12,
                marginBottom: 14, fontFamily: "var(--sans)",
                fontSize: 13, color: "#2a2a2a", fontWeight: 300,
                letterSpacing: "0.03em",
              }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                {text}
              </div>
            ))}
          </div>

          {/* Right: course list */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateX(24px)",
            transition: "opacity 0.8s 0.15s ease, transform 0.8s 0.15s ease",
          }}>
            {COURSES.map((c, i) => (
              <CourseRow key={i} c={c} i={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function CourseRow({ c, i, inView }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 24px",
        background: hover ? "#080808" : "transparent",
        border: `1px solid ${hover ? c.color + "25" : "#0f0f0f"}`,
        borderRadius: 8, marginBottom: 8, cursor: "default",
        transition: "all 0.25s ease",
        opacity: inView ? 1 : 0,
        animation: inView ? `fadeUp 0.4s ${i * 0.07}s ease both` : "none",
        boxShadow: hover ? `0 0 30px ${c.color}08` : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10, flexShrink: 0,
          background: `${c.color}10`, border: `1px solid ${c.color}20`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20,
          animation: hover ? "float 3s ease-in-out infinite" : "none",
        }}>
          {c.icon}
        </div>
        <div>
          <div style={{
            fontFamily: "var(--sans)", fontSize: 15, fontWeight: 700,
            color: hover ? "var(--text)" : "#3a3a3a",
            textTransform: "uppercase", letterSpacing: "0.04em",
            transition: "color 0.25s ease",
          }}>
            {c.name}
          </div>
          <div style={{
            fontFamily: "var(--mono)", fontSize: 10, color: hover ? c.color : "#1e1e1e",
            letterSpacing: "0.1em", marginTop: 3, transition: "color 0.25s ease",
          }}>
            {c.level}
          </div>
        </div>
      </div>
      <div style={{
        fontFamily: "var(--mono)", fontSize: 11, color: hover ? c.color : "#1a1a1a",
        letterSpacing: "0.1em", transition: "color 0.25s ease",
        background: hover ? `${c.color}10` : "transparent",
        border: `1px solid ${hover ? c.color + "25" : "transparent"}`,
        padding: "5px 12px", borderRadius: 5,
        transition: "all 0.25s ease",
      }}>
        📅 {c.duration}
      </div>
    </div>
  );
}

/* ============================================================
   7. INTERNSHIP
   ============================================================ */
const INTERN_STEPS = [
  { num: "01", title: "Apply Online", desc: "Submit your application through our portal. We review profiles within 48 hours.", color: "#00ff88" },
  { num: "02", title: "Tech Interview", desc: "A brief technical round to assess your current skills and learning potential.", color: "#00d4ff" },
  { num: "03", title: "Onboarding", desc: "Get assigned to a live client project team with a dedicated senior mentor.", color: "#a855f7" },
  { num: "04", title: "Ship Real Code", desc: "Contribute to production features, attend standups, work like a real engineer.", color: "#fbbf24" },
  { num: "05", title: "Graduate", desc: "Receive your certificate, a detailed recommendation, and placement support.", color: "#00ff88" },
];

function Internship() {
  const ref = useRef(null);
  const inView = useInView(ref, 0.1);

  return (
    <Section style={{ background: "#000", padding: "110px 48px" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{
          textAlign: "center", marginBottom: 72,
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <Badge label="INTERNSHIP PROGRAM" color="#fbbf24" />
          <h2 style={{
            fontFamily: "var(--sans)", fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 700, color: "var(--text)", letterSpacing: "-0.03em",
            lineHeight: 1, textTransform: "uppercase", marginTop: 20,
          }}>
            Work on<br />
            <span style={{ fontWeight: 100, fontStyle: "italic", color: "#333" }}>
              real projects
            </span>
          </h2>
          <p style={{
            fontFamily: "var(--mono)", fontSize: 13, color: "#333",
            maxWidth: 500, margin: "20px auto 0", lineHeight: 1.8, letterSpacing: "0.04em",
          }}>
            No fake todo apps. No tutorial projects. Real client work,
            real deadlines, real growth.
          </p>
        </div>

        {/* steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1 }}>
          {INTERN_STEPS.map((step, i) => (
            <InternStep key={i} step={step} i={i} inView={inView} />
          ))}
        </div>

        {/* bottom perks row */}
        <div style={{
          marginTop: 48,
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          opacity: inView ? 1 : 0,
          transition: "opacity 0.8s 0.4s ease",
        }}>
          {[
            ["💰", "Stipend Provided", "Performance-based monthly stipend"],
            ["🏆", "Certificate", "Industry-recognized completion cert"],
            ["👥", "1:1 Mentorship", "Dedicated senior engineer guide"],
            ["🔗", "Placement Help", "Job referrals and resume support"],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{
              padding: "24px 20px",
              background: "#050505",
              border: "1px solid #0f0f0f",
              borderRadius: 10, textAlign: "center",
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
              <div style={{
                fontFamily: "var(--sans)", fontSize: 13, fontWeight: 700,
                color: "#2a2a2a", textTransform: "uppercase", letterSpacing: "0.06em",
                marginBottom: 8,
              }}>
                {title}
              </div>
              <div style={{
                fontFamily: "var(--mono)", fontSize: 10, color: "#1a1a1a",
                lineHeight: 1.6, letterSpacing: "0.04em",
              }}>
                {desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function InternStep({ step, i, inView }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "32px 24px",
        background: hover ? "#0a0a0a" : "#040404",
        border: `1px solid ${hover ? step.color + "30" : "#0f0f0f"}`,
        borderRadius: 10,
        transition: "all 0.3s ease",
        opacity: inView ? 1 : 0,
        animation: inView ? `fadeUp 0.5s ${i * 0.1}s ease both` : "none",
        boxShadow: hover ? `0 0 40px ${step.color}08` : "none",
        cursor: "default",
      }}
    >
      <div style={{
        fontFamily: "var(--mono)", fontSize: 32, fontWeight: 700,
        color: hover ? step.color : "#141414",
        letterSpacing: "-0.02em", marginBottom: 20,
        transition: "color 0.3s ease",
        lineHeight: 1,
      }}>
        {step.num}
      </div>
      <h4 style={{
        fontFamily: "var(--sans)", fontSize: 14, fontWeight: 700,
        color: hover ? "var(--text)" : "#2a2a2a",
        textTransform: "uppercase", letterSpacing: "0.06em",
        marginBottom: 12, transition: "color 0.3s ease",
      }}>
        {step.title}
      </h4>
      <p style={{
        fontFamily: "var(--sans)", fontSize: 12, color: "#1e1e1e",
        lineHeight: 1.7, fontWeight: 300, letterSpacing: "0.02em",
      }}>
        {step.desc}
      </p>

      {/* connector dot */}
      {i < 4 && (
        <div style={{
          position: "absolute", right: -8, top: "50%", transform: "translateY(-50%)",
          width: 6, height: 6, borderRadius: "50%",
          background: hover ? step.color : "#1a1a1a",
          zIndex: 2, transition: "background 0.3s ease",
        }} />
      )}
    </div>
  );
}

/* ============================================================
   8. CTA
   ============================================================ */
function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, 0.15);

  return (
    <Section style={{ background: "#000", padding: "120px 48px" }}>
      <div ref={ref} style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>

        {/* dot decoration */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 8, marginBottom: 32,
          opacity: inView ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: "50%", background: "#00ff88",
              animation: `dotPulse ${1 + i * 0.3}s ${i * 0.2}s ease-in-out infinite`,
              opacity: 0.6,
            }} />
          ))}
        </div>

        <div style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(24px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
          <Badge label="LET'S WORK TOGETHER" />
          <h2 style={{
            fontFamily: "var(--sans)", fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 700, color: "var(--text)", letterSpacing: "-0.04em",
            lineHeight: 0.95, textTransform: "uppercase", marginTop: 24, marginBottom: 24,
          }}>
            Ready to<br />
            <span style={{ color: "#00ff88" }}>build</span>{" "}
            <span style={{ fontWeight: 100, fontStyle: "italic", color: "#333" }}>
              something
            </span>
            <br />
            great?
          </h2>
          <p style={{
            fontFamily: "var(--mono)", fontSize: 13, color: "#333",
            lineHeight: 1.85, maxWidth: 440, margin: "0 auto 48px",
            letterSpacing: "0.04em",
          }}>
            Whether you need software built, your team trained, or interns who ship —
            DEVIQUE is your partner.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              padding: "16px 44px", borderRadius: 6,
              background: "#00ff88", color: "#000",
              border: "2px solid #00ff88",
              fontFamily: "var(--sans)", fontSize: 14, fontWeight: 700,
              cursor: "pointer", letterSpacing: "0.15em", textTransform: "uppercase",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#00ff88"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#00ff88"; e.currentTarget.style.color = "#000"; }}
            >
              START A PROJECT
            </button>
            <button style={{
              padding: "16px 36px", borderRadius: 6,
              background: "transparent", color: "#333",
              border: "1px solid #1a1a1a",
              fontFamily: "var(--sans)", fontSize: 13, fontWeight: 600,
              cursor: "pointer", letterSpacing: "0.12em", textTransform: "uppercase",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#ccc"; e.currentTarget.style.borderColor = "#333"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#333"; e.currentTarget.style.borderColor = "#1a1a1a"; }}
            >
              JOIN AS INTERN
            </button>
          </div>
        </div>

        {/* bottom line */}
        <div style={{
          marginTop: 80, height: 1,
          background: "#0f0f0f",
          opacity: inView ? 1 : 0,
          transition: "opacity 1s 0.4s ease",
        }} />
        <div style={{
          marginTop: 32,
          fontFamily: "var(--mono)", fontSize: 10, color: "#1a1a1a",
          letterSpacing: "0.2em", textTransform: "uppercase",
          opacity: inView ? 1 : 0,
          transition: "opacity 1s 0.5s ease",
        }}>
          © 2025 DEVIQUE · ALL RIGHTS RESERVED
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   MAIN APP
   ============================================================ */
export default function AboutPage() {
  return (
    <div style={{ background: "#000", minHeight: "100vh", fontFamily: "var(--sans)" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Hero />
      <Marquee />
      <Stats />
      <AboutStory />
      <Services />
      <Training />
      <Internship />
      <CTA />
    </div>
  );
}