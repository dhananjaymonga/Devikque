import React from "react";
import { useState, useEffect, useRef } from "react";

const templates = {
  Python: `# ✦ Python — clean & powerful
def fibonacci(n):
    a, b = 0, 1
    result = []
    while len(result) < n:
        result.append(a)
        a, b = b, a + b
    return result

nums = fibonacci(10)
print("Fibonacci:", nums)
print("Sum:", sum(nums))`,

  JavaScript: `// ✦ JavaScript — the web's heartbeat
const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error:", err.message);
  }
};

const greet = (name) => \`Hello, \${name}! 🚀\`;
console.log(greet("World"));`,

  Java: `// ✦ Java — enterprise strength
public class Main {
  static int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  }

  public static void main(String[] args) {
    for (int i = 1; i <= 8; i++) {
      System.out.printf("%d! = %d%n", i, factorial(i));
    }
  }
}`,

  "C++": `// ✦ C++ — raw machine power
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
  vector<int> nums = {5, 2, 8, 1, 9, 3, 7, 4, 6};
  sort(nums.begin(), nums.end());
  
  cout << "Sorted: ";
  for (auto n : nums) cout << n << " ";
  cout << endl;
  return 0;
}`,

  Rust: `// ✦ Rust — memory safe & blazing fast
fn is_prime(n: u64) -> bool {
    if n < 2 { return false; }
    (2..=(n as f64).sqrt() as u64)
        .all(|i| n % i != 0)
}

fn main() {
    let primes: Vec<u64> = (2..50)
        .filter(|&n| is_prime(n))
        .collect();
    println!("Primes < 50: {:?}", primes);
}`,

  Go: `// ✦ Go — simple, concurrent, fast
package main

import (
    "fmt"
    "strings"
)

func reverseWords(s string) string {
    words := strings.Fields(s)
    for i, j := 0, len(words)-1; i < j; i, j = i+1, j-1 {
        words[i], words[j] = words[j], words[i]
    }
    return strings.Join(words, " ")
}

func main() {
    msg := "Hello beautiful world of Go"
    fmt.Println(reverseWords(msg))
}`,
};

const outputs = {
  Python: `>>> Running Python...

Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
Sum: 88

✓ Executed in 0.003s`,

  JavaScript: `> Running JavaScript...

Hello, World! 🚀

✓ Executed in 0.001s`,

  Java: `$ Running Java...

1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720
7! = 5040
8! = 40320

✓ Compiled & executed in 0.412s`,

  "C++": `$ Running C++...

Sorted: 1 2 3 4 5 6 7 8 9

✓ Compiled & executed in 0.087s`,

  Rust: `$ Running Rust...

Primes < 50: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]

✓ Compiled & executed in 0.024s`,

  Go: `$ Running Go...

world beautiful Hello of Go

✓ Compiled & executed in 0.009s`,
};

const LANG_COLORS = {
  Python: "#3b82f6",
  JavaScript: "#f59e0b",
  Java: "#ef4444",
  "C++": "#8b5cf6",
  Rust: "#f97316",
  Go: "#06b6d4",
};

const LANG_ICONS = {
  Python: "🐍",
  JavaScript: "⚡",
  Java: "☕",
  "C++": "⚙️",
  Rust: "🦀",
  Go: "🐹",
};

function GlitchText({ text }) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <style>{`
        @keyframes glitch1 {
          0%, 90%, 100% { clip-path: none; transform: none; opacity: 1; }
          92% { clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); transform: translate(-2px, 0); opacity: 0.8; }
          94% { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); transform: translate(2px, 0); opacity: 0.8; }
          96% { clip-path: none; transform: none; opacity: 1; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 8px currentColor; }
          50% { box-shadow: 0 0 24px currentColor, 0 0 40px currentColor; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes typeIn {
          from { opacity: 0; transform: translateX(-4px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes runPulse {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); box-shadow: 0 0 30px currentColor; }
          100% { transform: scale(1); }
        }
        @keyframes lineNumberFade {
          from { opacity: 0; }
          to { opacity: 0.35; }
        }
        @keyframes outputReveal {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes borderTrace {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0px); opacity: 0.6; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
      <span style={{ animation: "glitch1 6s infinite" }}>{text}</span>
    </span>
  );
}

function LineNumbers({ code, color }) {
  const lines = code.split("\n").length;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 48,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        paddingRight: 12,
        paddingTop: 16,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: 12,
        color: color,
        opacity: 0.35,
        userSelect: "none",
        borderRight: `1px solid ${color}22`,
        animation: "lineNumberFade 0.4s ease",
      }}
    >
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} style={{ lineHeight: "1.6em" }}>
          {i + 1}
        </div>
      ))}
    </div>
  );
}

export default function CodeEditor() {
  const [language, setLanguage] = useState("Python");
  const [code, setCode] = useState(templates["Python"]);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [typedOutput, setTypedOutput] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const textareaRef = useRef(null);
  const color = LANG_COLORS[language];

  const selectLanguage = (lang) => {
    setLanguage(lang);
    setCode(templates[lang]);
    setOutput("");
    setTypedOutput("");
    setShowOutput(false);
  };

  const runCode = async () => {
    if (running) return;
    setRunning(true);
    setShowOutput(false);
    setTypedOutput("");
    await new Promise((r) => setTimeout(r, 900));
    const result = outputs[language];
    setOutput(result);
    setShowOutput(true);
    setRunning(false);

    // type out the output
    let i = 0;
    const interval = setInterval(() => {
      setTypedOutput(result.slice(0, i));
      i += 3;
      if (i > result.length) {
        setTypedOutput(result);
        clearInterval(interval);
      }
    }, 18);
  };

  // cursor blink
  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = textareaRef.current;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080b10",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `
            linear-gradient(${color}08 1px, transparent 1px),
            linear-gradient(90deg, ${color}08 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Corner glow */}
      <div
        style={{
          position: "fixed",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
          transition: "background 0.5s ease",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: -200,
          left: -200,
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
          transition: "background 0.5s ease",
        }}
      />

      {/* HEADER */}
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "#080b10ee",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${color}30`,
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "border-color 0.4s ease",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 32,
              height: 32,
              border: `2px solid ${color}`,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              color: color,
              boxShadow: `0 0 12px ${color}60`,
              transition: "all 0.4s ease",
              animation: "pulseGlow 3s infinite",
            }}
          >
            {"</>"}
          </div>
          <span
            style={{
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            <GlitchText text="CODEFORGE" />
          </span>
          <span
            style={{
              color: color,
              fontSize: 10,
              letterSpacing: "0.2em",
              opacity: 0.7,
              paddingLeft: 8,
              borderLeft: `1px solid ${color}40`,
            }}
          >
            v2.4.1
          </span>
        </div>

        {/* Language tabs */}
        <div
          style={{
            display: "flex",
            gap: 4,
            background: "#0d1117",
            padding: 4,
            borderRadius: 10,
            border: "1px solid #1e2433",
          }}
        >
          {Object.keys(templates).map((lang) => {
            const active = lang === language;
            const lc = LANG_COLORS[lang];
            return (
              <button
                key={lang}
                onClick={() => selectLanguage(lang)}
                style={{
                  padding: "6px 14px",
                  background: active ? `${lc}20` : "transparent",
                  color: active ? lc : "#4a5568",
                  border: active ? `1px solid ${lc}50` : "1px solid transparent",
                  borderRadius: 7,
                  cursor: "pointer",
                  fontSize: 12,
                  fontFamily: "inherit",
                  fontWeight: active ? 700 : 400,
                  letterSpacing: "0.05em",
                  transition: "all 0.25s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  whiteSpace: "nowrap",
                  boxShadow: active ? `0 0 12px ${lc}30` : "none",
                }}
              >
                <span>{LANG_ICONS[lang]}</span>
                {lang}
              </button>
            );
          })}
        </div>

        {/* Run button */}
        <button
          onClick={runCode}
          disabled={running}
          style={{
            padding: "9px 24px",
            background: running ? "transparent" : color,
            color: running ? color : "#000",
            border: `2px solid ${color}`,
            borderRadius: 8,
            cursor: running ? "not-allowed" : "pointer",
            fontSize: 12,
            fontFamily: "inherit",
            fontWeight: 700,
            letterSpacing: "0.15em",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: running ? `0 0 20px ${color}60` : `0 0 8px ${color}40`,
            animation: running ? "pulseGlow 0.8s infinite" : "none",
          }}
        >
          {running ? (
            <>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: color,
                  display: "inline-block",
                  animation: "blink 0.6s infinite",
                }}
              />
              RUNNING
            </>
          ) : (
            <>▶ RUN</>
          )}
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          paddingTop: 16,
          paddingBottom: 40,
          paddingLeft: 32,
          paddingRight: 32,
          maxWidth: 1400,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Status bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "10px 16px",
            marginBottom: 16,
            background: "#0d1117",
            border: `1px solid ${color}20`,
            borderRadius: 8,
            fontSize: 11,
            color: "#4a5568",
            letterSpacing: "0.08em",
            transition: "border-color 0.4s ease",
          }}
        >
          <span style={{ color: color }}>● {language}</span>
          <span>|</span>
          <span>{code.split("\n").length} lines</span>
          <span>|</span>
          <span>{code.length} chars</span>
          <span>|</span>
          <span>UTF-8</span>
          <span style={{ marginLeft: "auto", color: color, opacity: 0.7 }}>
            {LANG_ICONS[language]} Ready
          </span>
        </div>

        {/* Editor + Output layout */}
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          {/* EDITOR */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                border: `1px solid ${color}30`,
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: `0 0 40px ${color}10, inset 0 0 40px #00000040`,
                transition: "border-color 0.4s, box-shadow 0.4s",
                animation: "fadeSlideIn 0.4s ease",
              }}
            >
              {/* Editor tab bar */}
              <div
                style={{
                  background: "#0d1117",
                  borderBottom: `1px solid ${color}20`,
                  padding: "0 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  height: 40,
                }}
              >
                <div style={{ display: "flex", gap: 6 }}>
                  {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
                    <div
                      key={c}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: c,
                        opacity: 0.8,
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    marginLeft: 12,
                    padding: "2px 14px",
                    background: `${color}15`,
                    border: `1px solid ${color}30`,
                    borderRadius: 5,
                    fontSize: 11,
                    color: color,
                    letterSpacing: "0.06em",
                  }}
                >
                  main.{language === "Python" ? "py" : language === "JavaScript" ? "js" : language === "Java" ? "java" : language === "C++" ? "cpp" : language === "Rust" ? "rs" : "go"}
                </div>
              </div>

              {/* Code area */}
              <div style={{ position: "relative", background: "#0a0e16" }}>
                <LineNumbers code={code} color={color} />
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  style={{
                    display: "block",
                    width: "100%",
                    minHeight: 440,
                    padding: "16px 16px 16px 64px",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#e2e8f0",
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontSize: 13,
                    lineHeight: 1.6,
                    resize: "none",
                    boxSizing: "border-box",
                    caretColor: color,
                    letterSpacing: "0.02em",
                  }}
                />
                {/* Scanline effect */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      ${color}04 2px,
                      ${color}04 4px
                    )`,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </div>

          {/* OUTPUT PANEL */}
          <div
            style={{
              width: 380,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* Output box */}
            <div
              style={{
                border: `1px solid ${color}30`,
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: `0 0 30px ${color}08`,
                transition: "border-color 0.4s, box-shadow 0.4s",
              }}
            >
              <div
                style={{
                  background: "#0d1117",
                  borderBottom: `1px solid ${color}20`,
                  padding: "0 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: 40,
                }}
              >
                <span style={{ fontSize: 11, color: color, letterSpacing: "0.1em" }}>
                  CONSOLE OUTPUT
                </span>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: color,
                        opacity: 0.5,
                        animation: `floatDot ${1 + i * 0.3}s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: "#06080f",
                  minHeight: 260,
                  padding: 20,
                  fontFamily: "inherit",
                  fontSize: 12,
                  lineHeight: 1.7,
                  position: "relative",
                }}
              >
                {running && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        border: `2px solid ${color}30`,
                        borderTop: `2px solid ${color}`,
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    <span style={{ color: color, fontSize: 11, letterSpacing: "0.15em" }}>
                      EXECUTING...
                    </span>
                  </div>
                )}

                {!running && !showOutput && (
                  <div
                    style={{
                      color: "#2d3748",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      marginTop: 8,
                    }}
                  >
                    <span>▶ Press RUN to execute</span>
                    <span style={{ opacity: 0.5 }}>
                      Output will appear here...
                    </span>
                  </div>
                )}

                {showOutput && (
                  <pre
                    style={{
                      color: "#4ade80",
                      margin: 0,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      animation: "outputReveal 0.3s ease",
                    }}
                  >
                    {typedOutput}
                    {typedOutput.length < output.length && (
                      <span
                        style={{
                          display: "inline-block",
                          width: 7,
                          height: 13,
                          background: "#4ade80",
                          marginLeft: 1,
                          verticalAlign: "text-bottom",
                          opacity: cursorVisible ? 1 : 0,
                        }}
                      />
                    )}
                  </pre>
                )}
              </div>
            </div>

            {/* Language info card */}
            <div
              style={{
                border: `1px solid ${color}25`,
                borderRadius: 12,
                padding: 20,
                background: "#0d1117",
                transition: "all 0.4s ease",
                animation: "fadeSlideIn 0.5s ease",
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  marginBottom: 8,
                }}
              >
                {LANG_ICONS[language]}
              </div>
              <div style={{ color: color, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 6 }}>
                {language}
              </div>
              <div style={{ color: "#4a5568", fontSize: 11, lineHeight: 1.6, letterSpacing: "0.04em" }}>
                {language === "Python" && "Interpreted · Dynamic · Readable"}
                {language === "JavaScript" && "Event-driven · Async · Universal"}
                {language === "Java" && "Compiled · JVM · Enterprise"}
                {language === "C++" && "Systems · Manual memory · Speed"}
                {language === "Rust" && "Memory-safe · Zero-cost · Modern"}
                {language === "Go" && "Concurrent · Compiled · Simple"}
              </div>

              <div
                style={{
                  marginTop: 14,
                  height: 3,
                  borderRadius: 2,
                  background: `linear-gradient(90deg, ${color}, ${color}30)`,
                  boxShadow: `0 0 8px ${color}60`,
                }}
              />
            </div>

            {/* Keyboard shortcuts */}
            <div
              style={{
                border: "1px solid #1a2030",
                borderRadius: 12,
                padding: 16,
                background: "#0a0e14",
              }}
            >
              <div style={{ color: "#2d3748", fontSize: 10, letterSpacing: "0.15em", marginBottom: 10 }}>
                SHORTCUTS
              </div>
              {[
                ["Tab", "Indent"],
                ["Ctrl+A", "Select all"],
                ["▶ RUN", "Execute code"],
              ].map(([key, desc]) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                    fontSize: 11,
                  }}
                >
                  <span
                    style={{
                      color: color,
                      padding: "1px 6px",
                      border: `1px solid ${color}30`,
                      borderRadius: 4,
                      fontFamily: "inherit",
                    }}
                  >
                    {key}
                  </span>
                  <span style={{ color: "#3d4a5c" }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}