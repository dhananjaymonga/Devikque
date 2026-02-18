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
  @keyframes scanX {
    0%   { transform: translateX(-100%); opacity: 0; }
    20%  { opacity: 1; }
    80%  { opacity: 1; }
    100% { transform: translateX(500%); opacity: 0; }
  }
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

// Custom useInView — no framer-motion dependency
function useInView(ref, threshold = 0.12) {
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

const testimonials = [
  {
    quote: "Shipped our entire auth system in a weekend. What used to take weeks now takes hours. The DX is genuinely insane.",
    name: "Alex Johnson", role: "Lead Engineer @ TechForge",
    avatar: "AJ", color: "#00ff88", stars: 5, lang: "TypeScript",
  },
  {
    quote: "Performance gains were immediate — 3x faster cold starts, 60% less memory. No config changes needed.",
    name: "Sarah Chen", role: "Staff SWE @ Vercel",
    avatar: "SC", color: "#00d4ff", stars: 5, lang: "Go",
  },
  {
    quote: "The type safety alone sold me. Zero runtime surprises in 8 months of production. Absolute zero.",
    name: "Marcus Webb", role: "CTO @ ScaleUp Solutions",
    avatar: "MW", color: "#a855f7", stars: 5, lang: "Rust",
  },
  {
    quote: "Best SDK documentation I've ever encountered. The SDK itself matches that quality. A rare combination.",
    name: "Priya Nair", role: "Developer Advocate",
    avatar: "PN", color: "#fbbf24", stars: 5, lang: "Python",
  },
  {
    quote: "We handle 2M requests per day through this. Not a single incident in production. Genuinely impressive.",
    name: "David Kim", role: "Infra Lead @ DataGrid",
    avatar: "DK", color: "#ff4560", stars: 5, lang: "Java",
  },
  {
    quote: "Migrated from 4 different SDKs to this one. Codebase shrunk 40%. Team velocity doubled overnight.",
    name: "Elena Torres", role: "Principal Eng @ Stripe",
    avatar: "ET", color: "#00ff88", stars: 5, lang: "Ruby",
  },
];

function TCard({ t }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 360, flexShrink: 0,
        background: hover ? "#0d0d0d" : "#080808",
        border: `1px solid ${hover ? t.color + "28" : "#1a1a1a"}`,
        borderRadius: 10, padding: "28px 28px 24px",
        transition: "all 0.3s ease", cursor: "default",
        position: "relative", overflow: "hidden",
        boxShadow: hover ? `0 0 50px ${t.color}08` : "none",
        fontFamily: "var(--display)",
      }}
    >
      {hover && (
        <div style={{
          position: "absolute", top: 0, left: "-80%", width: "60%", height: "100%",
          background: `linear-gradient(90deg, transparent, ${t.color}05, transparent)`,
          animation: "scanX 0.9s ease-out forwards",
          pointerEvents: "none",
        }} />
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 3 }}>
          {Array(t.stars).fill(null).map((_, i) => (
            <span key={i} style={{ color: t.color, fontSize: 12 }}>★</span>
          ))}
        </div>
        <div style={{
          fontFamily: "var(--mono)", fontSize: 9, color: t.color,
          background: `${t.color}08`, border: `1px solid ${t.color}20`,
          padding: "2px 8px", borderRadius: 3, letterSpacing: "0.12em",
        }}>
          {t.lang}
        </div>
      </div>

      <p style={{
        fontSize: 14, lineHeight: 1.85, color: "#555",
        fontWeight: 300, letterSpacing: "0.02em", marginBottom: 24,
        fontFamily: "var(--display)",
      }}>
        "{t.quote}"
      </p>

      <div style={{ height: 1, background: "#111", marginBottom: 20 }} />

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 8,
          background: `${t.color}10`, border: `1px solid ${t.color}25`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700,
          color: t.color, letterSpacing: "0.05em", flexShrink: 0,
        }}>
          {t.avatar}
        </div>
        <div>
          <div style={{
            fontFamily: "var(--display)", fontSize: 13, fontWeight: 700,
            color: "var(--text)", letterSpacing: "0.06em", textTransform: "uppercase",
          }}>
            {t.name}
          </div>
          <div style={{
            fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)",
            marginTop: 3, letterSpacing: "0.06em",
          }}>
            {t.role}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const doubled = [...testimonials, ...testimonials];

  return (
    <section ref={ref} style={{
      background: "#000", padding: "110px 0",
      fontFamily: "var(--display)", overflow: "hidden",
      position: "relative", borderTop: "1px solid #111",
    }}>
      {/* Inject CSS as a string — correct way */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div style={{
        textAlign: "center", padding: "0 48px", marginBottom: 72,
        opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          border: "1px solid #1c1c1c", borderRadius: 4,
          padding: "5px 16px", marginBottom: 28,
          fontFamily: "var(--mono)", fontSize: 10,
          color: "#a855f7", letterSpacing: "0.2em", background: "#a855f708",
        }}>
          <span style={{ animation: "glow 2s infinite", fontSize: 8 }}>◆</span>
          TESTIMONIALS
        </div>

        <h2 style={{
          fontSize: "clamp(38px, 5vw, 68px)", fontWeight: 700,
          color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.05,
          textTransform: "uppercase", fontFamily: "var(--display)", marginBottom: 48,
        }}>
          Hear from teams that{" "}
          <span style={{
            background: "linear-gradient(90deg, #a855f7, #00d4ff)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            trust us
          </span>
        </h2>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: 0, justifyContent: "center",
          border: "1px solid #1c1c1c", borderRadius: 8,
          width: "fit-content", margin: "0 auto", overflow: "hidden",
        }}>
          {[["10K+","Developers"],["99.99%","Uptime"],["38","Edge Regions"],["<50ms","Latency"]].map(([val, label], i) => (
            <div key={label} style={{
              padding: "20px 36px", textAlign: "center",
              borderRight: i < 3 ? "1px solid #1c1c1c" : "none",
              animation: inView ? `countUp 0.5s ${i * 0.1}s ease both` : "none",
            }}>
              <div style={{
                fontFamily: "var(--display)", fontSize: 26, fontWeight: 700,
                background: "linear-gradient(135deg, #a855f7, #00d4ff)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}>
                {val}
              </div>
              <div style={{
                fontFamily: "var(--mono)", fontSize: 9, color: "var(--muted)",
                marginTop: 5, letterSpacing: "0.15em", textTransform: "uppercase",
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee row 1 */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 16, animation: "marquee 45s linear infinite", width: "max-content" }}>
          {doubled.map((t, i) => <TCard key={i} t={t} />)}
        </div>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(90deg, #000 0%, transparent 8%, transparent 92%, #000 100%)",
        }} />
      </div>

      {/* Marquee row 2 reverse */}
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", gap: 16, animation: "marquee 55s linear infinite reverse", width: "max-content" }}>
          {[...doubled].reverse().map((t, i) => <TCard key={i} t={t} />)}
        </div>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(90deg, #000 0%, transparent 8%, transparent 92%, #000 100%)",
        }} />
      </div>
    </section>
  );
}

export default Testimonials;