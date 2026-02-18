import React from "react";
import { useState, useRef, useEffect } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,300;0,400;0,600;0,700;1,300&family=JetBrains+Mono:wght@300;400;500;700&display=swap');

  :root {
    --display: 'Josefin Sans', sans-serif;
    --mono: 'JetBrains Mono', monospace;
    --text: #f0f0f0;
    --muted: #404040;
  }

  @keyframes glow {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,136,0.3); }
    50%       { box-shadow: 0 0 0 10px rgba(0,255,136,0); }
  }
`;

// Custom useInView — no framer-motion dependency needed
function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

const ctaLines = [
  { text: "$ forge init my-killer-app", color: "#00ff88" },
  { text: "✓ Template cloned (react-ts-edge)", color: "#3a3a3a" },
  { text: "✓ Dependencies installed (1.2s)", color: "#3a3a3a" },
  { text: "✓ Environment configured", color: "#3a3a3a" },
  { text: "✓ Git initialized + first commit", color: "#3a3a3a" },
  { text: "" },
  { text: "$ forge deploy --prod", color: "#00d4ff" },
  { text: "▸ Building...  ████████████  100%", color: "#3a3a3a" },
  { text: "▸ Deploying to 38 edge regions...", color: "#3a3a3a" },
  { text: "" },
  { text: "🎉 Live: https://my-killer-app.forge.dev", color: "#00ff88" },
  { text: "⚡ Deploy time: 4.2 seconds", color: "#fbbf24" },
];

export function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, 0.1);
  const [visible, setVisible] = useState([]);
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const hasRun = useRef(false);

  const runAnim = () => {
    setVisible([]);
    hasRun.current = true;
    let delay = 0;
    ctaLines.forEach((_, i) => {
      delay += i === 0 ? 0 : i === 6 ? 400 : 200;
      setTimeout(() => setVisible(p => [...p, i]), delay);
    });
  };

  useEffect(() => {
    if (inView && !hasRun.current) runAnim();
  }, [inView]);

  const handleDeploy = async () => {
    if (deploying || deployed) return;
    setDeploying(true);
    await new Promise(r => setTimeout(r, 2400));
    setDeploying(false);
    setDeployed(true);
  };

  return (
    <section ref={ref} style={{
      background: "#000", padding: "110px 48px",
      fontFamily: "var(--display)", position: "relative",
      overflow: "hidden", borderTop: "1px solid #111",
    }}>
      {/* ✅ Fixed: dangerouslySetInnerHTML instead of {CSS} child */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, #ffffff05 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      {/* center glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 700, height: 700,
        background: "radial-gradient(circle, #00ff8805 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 72, alignItems: "center",
        }}>

          {/* ── LEFT: Copy ── */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateX(-24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              border: "1px solid #1c1c1c", borderRadius: 4,
              padding: "5px 16px", marginBottom: 28,
              fontFamily: "var(--mono)", fontSize: 10,
              color: "#00ff88", letterSpacing: "0.2em", background: "#00ff8808",
            }}>
              <span style={{ animation: "glow 2s infinite", fontSize: 8 }}>◆</span>
              READY TO BUILD
            </div>

            {/* Heading */}
            <h2 style={{
              fontSize: "clamp(38px, 4.8vw, 62px)", fontWeight: 700,
              color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.05,
              marginBottom: 24, fontFamily: "var(--display)", textTransform: "uppercase",
            }}>
              Stop configuring.<br />
              <span style={{ fontWeight: 100, fontStyle: "italic", color: "#444", textTransform: "none" }}>
                Start
              </span>{" "}
              <span style={{
                background: "linear-gradient(90deg, #00ff88, #00d4ff 50%, #a855f7)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                shipping.
              </span>
            </h2>

            {/* Description */}
            <p style={{
              fontFamily: "var(--display)", fontSize: 15, lineHeight: 1.9,
              color: "#444", fontWeight: 300, marginBottom: 44, letterSpacing: "0.03em",
            }}>
              From init to production in seconds. No DevOps PhD required.
              Just your code and the will to ship something real.
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <button
                onClick={handleDeploy}
                style={{
                  padding: "14px 36px", borderRadius: 6,
                  background: deployed ? "#00ff88" : deploying ? "transparent" : "#00ff88",
                  color: deployed || !deploying ? "#000" : "#00ff88",
                  border: "2px solid #00ff88",
                  fontFamily: "var(--display)", fontSize: 13, fontWeight: 700,
                  cursor: deploying ? "wait" : "pointer",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  transition: "all 0.3s ease",
                  display: "flex", alignItems: "center", gap: 10, minWidth: 190,
                  boxShadow: deployed ? "0 0 30px #00ff8828" : deploying ? "0 0 20px #00ff8838" : "none",
                  animation: deploying ? "pulse 1s infinite" : "none",
                }}
              >
                {deployed ? (
                  "✓ DEPLOYED!"
                ) : deploying ? (
                  <>
                    <div style={{
                      width: 13, height: 13,
                      border: "2px solid #00ff8828",
                      borderTop: "2px solid #00ff88",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                    }} />
                    DEPLOYING...
                  </>
                ) : (
                  "▶ GET STARTED"
                )}
              </button>

              <button
                style={{
                  padding: "14px 28px", borderRadius: 6,
                  background: "transparent", color: "#333",
                  border: "1px solid #222",
                  fontFamily: "var(--display)", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", letterSpacing: "0.12em", textTransform: "uppercase",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "#aaa";
                  e.currentTarget.style.borderColor = "#444";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "#333";
                  e.currentTarget.style.borderColor = "#222";
                }}
              >
                CONTACT SALES →
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {["SOC 2 Type II", "GDPR Compliant", "99.99% SLA"].map(b => (
                <div key={b} style={{
                  display: "flex", alignItems: "center", gap: 7,
                  fontFamily: "var(--mono)", fontSize: 10,
                  color: "#2a2a2a", letterSpacing: "0.08em",
                }}>
                  <span style={{ color: "#00ff88" }}>✓</span>
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Terminal ── */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateX(24px)",
            transition: "opacity 0.8s 0.15s ease, transform 0.8s 0.15s ease",
          }}>
            <div style={{
              border: "1px solid #1a1a1a", borderRadius: 12, overflow: "hidden",
              boxShadow: "0 0 100px #00ff8805, 0 40px 80px #00000090",
            }}>
              {/* Terminal bar */}
              <div style={{
                background: "#060606", borderBottom: "1px solid #161616",
                padding: "0 18px", height: 46,
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{ display: "flex", gap: 7 }}>
                  {["#ff5f56", "#ffbd2e", "#27c93f"].map(c => (
                    <div key={c} style={{
                      width: 11, height: 11, borderRadius: "50%",
                      background: c, opacity: 0.75,
                    }} />
                  ))}
                </div>
                <span style={{
                  flex: 1, textAlign: "center",
                  fontFamily: "var(--mono)", fontSize: 10,
                  color: "#222", letterSpacing: "0.12em",
                }}>
                  zsh — codeforge
                </span>
                <button
                  onClick={runAnim}
                  style={{
                    fontFamily: "var(--display)", fontSize: 9, color: "#2a2a2a",
                    background: "transparent", border: "1px solid #1c1c1c",
                    borderRadius: 3, padding: "3px 10px", cursor: "pointer",
                    letterSpacing: "0.12em", transition: "all 0.2s",
                    textTransform: "uppercase", fontWeight: 700,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#00ff88";
                    e.currentTarget.style.borderColor = "#00ff8828";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "#2a2a2a";
                    e.currentTarget.style.borderColor = "#1c1c1c";
                  }}
                >
                  ↺ REPLAY
                </button>
              </div>

              {/* Terminal body */}
              <div style={{
                background: "#020202", padding: "28px 24px 36px",
                minHeight: 340, fontFamily: "var(--mono)",
              }}>
                {ctaLines.map((line, i) => (
                  <div key={i} style={{
                    opacity: visible.includes(i) ? 1 : 0,
                    transform: visible.includes(i) ? "none" : "translateX(-6px)",
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                    height: line.text === "" ? 12 : "auto",
                    lineHeight: 1.85, fontSize: 12.5,
                    color: line.color || "#222",
                    letterSpacing: "0.01em",
                  }}>
                    {line.text}
                  </div>
                ))}
                {/* blinking cursor */}
                <span style={{
                  display: "inline-block", width: 7, height: 13,
                  background: "#00ff88", marginLeft: 2,
                  verticalAlign: "text-bottom",
                  animation: "blink 1s infinite", marginTop: 6,
                }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CTASection;