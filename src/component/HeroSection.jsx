import HeroCube from "./HeroCube";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "100px 40px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 500 }}>
        <Reveal>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#fff",
              marginBottom: 20,
            }}
          >
            Empower your product with our versatile SDK
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p style={{ color: "#777", marginBottom: 30 }}>
            Build faster, integrate seamlessly, and ship with confidence.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <button
            style={{
              background: "#fff",
              padding: "12px 28px",
              borderRadius: 8,
              border: "none",
              fontWeight: 600,
            }}
          >
            Get Started
          </button>
        </Reveal>
      </div>

      <div style={{ position: "absolute", right: "5%" }}>
        <HeroCube />
      </div>
    </section>
  );
}
