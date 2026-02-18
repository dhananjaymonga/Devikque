import React from "react";
import { useState, useEffect, useRef } from "react";

/* ============================================================
   SHARED STYLES — Pure Black + Josefin Sans
   ============================================================ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;1,300&family=JetBrains+Mono:wght@300;400;500;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:      #000000;
    --surface: #0a0a0a;
    --card:    #0f0f0f;
    --border:  #1c1c1c;
    --border2: #252525;
    --green:   #00ff88;
    --cyan:    #00d4ff;
    --purple:  #a855f7;
    --red:     #ff4560;
    --yellow:  #fbbf24;
    --text:    #f0f0f0;
    --muted:   #404040;
    --muted2:  #606060;
    --mono:    'JetBrains Mono', monospace;
    --display: 'Josefin Sans', sans-serif;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeLeft {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeRight {
    from { opacity: 0; transform: translateX(24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes glow {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1; }
  }
  @keyframes scanX {
    0%   { transform: translateX(-100%); opacity: 0; }
    20%  { opacity: 1; }
    80%  { opacity: 1; }
    100% { transform: translateX(500%); opacity: 0; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,136,0.3); }
    50%       { box-shadow: 0 0 0 10px rgba(0,255,136,0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes borderGlow {
    0%, 100% { border-color: #1c1c1c; }
    50%       { border-color: #2a2a2a; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
`;

function useInView(ref, threshold = 0.12) {
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
   COMPONENT 1 — HOW IT WORKS
   ============================================================ */
const steps = [
  {
    id: "01",
    title: "Install the SDK",
    icon: "↓",
    color: "#00ff88",
    tag: "bash",
    code: `$ npm install @codeforge/sdk

✓ Resolving packages...
✓ Fetching packages (3.2MB)
✓ Linking dependencies
✓ Building fresh packages

added 42 packages in 1.8s`,
    desc: "One command. Zero config. The SDK auto-detects your environment and configures optimal settings instantly.",
  },
  {
    id: "02",
    title: "Initialize & Connect",
    icon: "⚡",
    color: "#00d4ff",
    tag: "typescript",
    code: `import { CodeForge } from '@codeforge/sdk'

const forge = new CodeForge({
  apiKey: process.env.FORGE_KEY,
  runtime: 'edge',
  cache: true,
})

await forge.connect() // ✓ Connected`,
    desc: "Authenticate once. Persistent connections with automatic retry logic and intelligent caching built-in.",
  },
  {
    id: "03",
    title: "Ship with Confidence",
    icon: "→",
    color: "#a855f7",
    tag: "terminal",
    code: `$ forge deploy --prod

▸ Running 847 tests...  ✓ passed
▸ Bundle analysis...    ✓ 42kb gzip
▸ Security audit...     ✓ 0 issues
▸ Deploying to edge...  ✓ 38 regions

🎉 Live: your-app.forge.dev`,
    desc: "Automated testing, bundle optimization, security scanning — all before a single byte ships to production.",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState(["", "", ""]);
  const [typing, setTyping] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    startTyping(0);
  }, [inView]);

  const startTyping = (idx) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTyping(true);
    const target = steps[idx].code;
    let i = 0;
    timerRef.current = setInterval(() => {
      i += 5;
      setTyped((prev) => {
        const next = [...prev];
        next[idx] = target.slice(0, i);
        return next;
      });
      if (i >= target.length) {
        setTyped((prev) => { const n = [...prev]; n[idx] = target; return n; });
        clearInterval(timerRef.current);
        setTyping(false);
      }
    }, 18);
  };

  const handleTab = (i) => {
    setActive(i);
    startTyping(i);
  };

  return (
    <section ref={ref} style={{
      background: "var(--bg)", padding: "110px 48px",
      fontFamily: "var(--display)", position: "relative", overflow: "hidden",
    }}>
      <style>{CSS}</style>

      {/* subtle dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, #ffffff08 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* top accent line */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
        background: "linear-gradient(90deg, transparent, #00ff8830, transparent)",
      }} />

      <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>

        {/* ── HEADER ── */}
        <div style={{
          textAlign: "center", marginBottom: 80,
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            border: "1px solid #1c1c1c", borderRadius: 4,
            padding: "5px 16px", marginBottom: 28,
            fontFamily: "var(--mono)", fontSize: 10,
            color: "#00ff88", letterSpacing: "0.2em",
            background: "#00ff8808",
          }}>
            <span style={{ animation: "glow 2s infinite", fontSize: 8 }}>◆</span>
            HOW IT WORKS
          </div>

          <h2 style={{
            fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 700,
            color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.05,
            fontFamily: "var(--display)", textTransform: "uppercase",
          }}>
            From zero to{" "}
            <span style={{
              background: "linear-gradient(90deg, #00ff88, #00d4ff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              production
            </span>
            <br />
            <span style={{ fontWeight: 100, fontStyle: "italic", color: "var(--muted2)" }}>
              in three steps
            </span>
          </h2>
        </div>

        {/* ── TABS ── */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 0, marginBottom: 56,
          border: "1px solid var(--border)", borderRadius: 6, width: "fit-content",
          margin: "0 auto 56px", overflow: "hidden",
        }}>
          {steps.map((s, i) => (
            <button key={i} onClick={() => handleTab(i)} style={{
              padding: "12px 36px",
              background: active === i ? `${s.color}12` : "transparent",
              color: active === i ? s.color : "var(--muted)",
              borderRight: i < 2 ? "1px solid var(--border)" : "none",
              border: "none",
              fontFamily: "var(--display)", fontSize: 13, fontWeight: 700,
              cursor: "pointer", letterSpacing: "0.12em",
              transition: "all 0.2s ease",
              textTransform: "uppercase",
              borderBottom: active === i ? `2px solid ${s.color}` : "2px solid transparent",
            }}>
              {s.id} — {s.title.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* ── CONTENT ── */}
        {steps.map((step, i) => i !== active ? null : (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 48,
            animation: "fadeUp 0.35s ease",
          }}>
            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 32 }}>

              <div style={{
                width: 72, height: 72, borderRadius: 12,
                border: `1px solid ${step.color}35`,
                background: `${step.color}08`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 30, color: step.color,
                fontFamily: "var(--display)", fontWeight: 100,
                animation: "float 4s ease-in-out infinite",
              }}>
                {step.icon}
              </div>

              <div>
                <div style={{
                  fontFamily: "var(--mono)", fontSize: 10, color: step.color,
                  letterSpacing: "0.25em", marginBottom: 14, textTransform: "uppercase",
                }}>
                  Step {step.id}
                </div>
                <h3 style={{
                  fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700,
                  color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.15,
                  marginBottom: 18, fontFamily: "var(--display)", textTransform: "uppercase",
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: "var(--muted2)", fontSize: 15, lineHeight: 1.9,
                  fontFamily: "var(--display)", fontWeight: 300,
                  letterSpacing: "0.02em",
                }}>
                  {step.desc}
                </p>
              </div>

              {/* Progress dots */}
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {steps.map((_, idx) => (
                  <div key={idx} onClick={() => handleTab(idx)} style={{
                    height: 3, borderRadius: 2,
                    width: idx === active ? 40 : 12,
                    background: idx === active ? step.color : "var(--border2)",
                    cursor: "pointer", transition: "all 0.3s ease",
                    boxShadow: idx === active ? `0 0 10px ${step.color}50` : "none",
                  }} />
                ))}
                <span style={{
                  fontFamily: "var(--mono)", fontSize: 10,
                  color: "var(--muted)", marginLeft: 6, letterSpacing: "0.1em",
                }}>
                  {step.id}/03
                </span>
              </div>
            </div>

            {/* Right: Terminal */}
            <div style={{
              border: `1px solid ${step.color}20`,
              borderRadius: 12, overflow: "hidden",
              boxShadow: `0 0 80px ${step.color}08, 0 32px 64px #00000080`,
            }}>
              <div style={{
                background: "#0a0a0a",
                borderBottom: `1px solid ${step.color}18`,
                padding: "0 20px", height: 46,
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <div style={{ display: "flex", gap: 8 }}>
                  {["#ff5f56","#ffbd2e","#27c93f"].map(c => (
                    <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.85 }} />
                  ))}
                </div>
                <span style={{
                  flex: 1, textAlign: "center",
                  fontFamily: "var(--mono)", fontSize: 11,
                  color: "var(--muted)", letterSpacing: "0.1em",
                }}>
                  {step.tag} — codeforge
                </span>
                <div style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: step.color, animation: "glow 2s infinite",
                  boxShadow: `0 0 8px ${step.color}`,
                }} />
              </div>

              <div style={{
                background: "#050505", padding: "28px 28px 36px", minHeight: 300,
              }}>
                <pre style={{
                  fontFamily: "var(--mono)", fontSize: 13, lineHeight: 1.85,
                  color: "#888", whiteSpace: "pre-wrap", letterSpacing: "0.01em",
                }}>
                  {typed[i]}
                  {typing && (
                    <span style={{
                      display: "inline-block", width: 7, height: 14,
                      background: step.color, marginLeft: 2, verticalAlign: "text-bottom",
                      animation: "blink 0.5s infinite",
                    }} />
                  )}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}