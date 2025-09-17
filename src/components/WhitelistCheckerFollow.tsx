import React, { useState, CSSProperties } from "react";
import romeIcon from "../assets/Romeicon.svg";
import { useNavigate } from "react-router-dom";


export default function WhitelistCheckerFollow() {
  const [handle, setHandle] = useState("");
  const isHandleValid =
    handle.trim().length >= 2 &&
    /^@?\w{2,15}$/i.test(handle.replace(/^@/, ""));

    const navigate = useNavigate();

  const followUrl = "https://x.com/RomeProtocol";

  const onVerify = () => {
  if (isHandleValid) {
    const normalized = "@" + handle.replace(/^@/, "");
    sessionStorage.setItem("romeHandle", normalized); // remember X handle
    navigate("/wallet");
  }
};

  return (
    <div style={styles.page}>
      {/* soft background glow */}
      <div style={styles.bgWrap} aria-hidden>
        <div style={styles.bgOrb} />
      </div>

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.brandBlock}>
  <img
    src={romeIcon}
    alt="Rome Protocol"
    style={styles.brandLogo}
  />
  <p style={styles.brandTag}>Imperia: Rome Citizens</p>
</div>

        <div style={{ marginTop: 32 }}>
          <h2 style={styles.heroTitle}>WHITELIST CHECKER</h2>
          <p style={styles.heroSub}>
            VERIFY YOUR ELIGIBILITY FOR THE ROME NFT DROP
          </p>
        </div>

        {/* Stepper */}
        <nav style={styles.stepper}>
          <StepItem index="I" label="Follow" active />
          <span style={styles.stepLine} />
          <StepItem index="II" label="Wallet" />
          <span style={styles.stepLine} />
          <StepItem index="III" label="Result" />
        </nav>
      </header>

      {/* CARD */}
      <main style={styles.main}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Step 1: Follow Rome Protocol</h3>
          <p style={styles.cardKicker}>
            FOLLOW <span style={styles.cardKickerStrong}>@ROMEPROTOCOL</span>{" "}
            ON X TO PROCEED
          </p>

          {/* Handle input */}
          <label htmlFor="xHandle" style={styles.srOnly}>
            Your X Handle
          </label>
          <div style={{ marginTop: 20 }}>
            <div style={styles.inputWrap}>
              <div style={styles.atPrefix}>@</div>
              <input
                id="xHandle"
                inputMode="text"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                placeholder="yourusername"
                value={handle.replace(/^@/, "")}
                onChange={(e) => setHandle(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          {/* Buttons */}
          <div style={styles.buttonRow}>
            <a
              href={followUrl}
              target="_blank"
              rel="noreferrer noopener"
              style={styles.followBtn}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ width: 16, height: 16, marginRight: 8 }}
              >
                <path d="M18.244 2H21l-7.36 8.395L22.5 22H15.9l-5.03-6.025L4.96 22H2l7.828-8.928L1.5 2h6.76l4.65 5.56L18.244 2Zm-2.652 18.11h1.722L7.512 3.81H5.708l9.884 16.3Z" />
              </svg>
              Follow @RomeProtocol
            </a>

            <button
              type="button"
              onClick={onVerify}
              disabled={!isHandleValid}
              style={{
                ...styles.verifyBtn,
                ...(isHandleValid ? {} : styles.verifyBtnDisabled),
              }}
            >
              Verify Follow Status
            </button>
          </div>

          <p style={styles.note}>
            We’ll never post on your behalf. Your handle is used only to check
            the follow status.
          </p>
        </div>
      </main>

      <footer style={styles.footer}>
        © {new Date().getFullYear()} Rome Protocol
      </footer>
    </div>
  );
}

/* ---------- Step Item ---------- */
function StepItem({
  index,
  label,
  active = false,
}: {
  index: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color: active ? "#6D28D9" : "#9CA3AF",
        fontWeight: 600,
        fontSize: 12,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          display: "grid",
          placeItems: "center",
          width: 24,
          height: 24,
          borderRadius: 999,
          border: `1px solid ${active ? "#A78BFA" : "#D1D5DB"}`,
          background: active ? "#F5F3FF" : "#FFFFFF",
          fontSize: 11,
        }}
      >
        {index}
      </span>
      <span>{label}</span>
    </div>
  );
}

/* ---------- Styles ---------- */
const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#FAF7FB",
    position: "relative",
    overflow: "hidden",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter,Helvetica,Arial,sans-serif',
    color: "#111827",
  },
  bgWrap: {
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    opacity: 0.13,
  } as CSSProperties,
  bgOrb: {
    position: "absolute",
    top: -160,
    left: "50%",
    transform: "translateX(-50%)",
    width: 1200,
    height: 1200,
    borderRadius: "9999px",
    background:
      "radial-gradient(closest-side, rgba(167,139,250,0.7), rgba(255,255,255,0.6) 45%, rgba(255,255,255,0) 70%)",
    filter: "blur(40px)",
  },
  header: {
    maxWidth: 1040,
    margin: "0 auto",
    padding: "40px 24px 0",
    textAlign: "center",
  },
  brandBlock: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  logoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 4,
  },
  logoDot: {
    width: 16,
    height: 16,
    borderRadius: 4,
    display: "block",
  } as CSSProperties,
  brandTitle: {
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: "0.03em",
    color: "#4C1D95",
    margin: 0,
  },
  brandTag: {
    margin: 0,
    fontSize: 14,
    fontWeight: 500,
    color: "#7C3AED",
  },
  heroTitle: {
    margin: 0,
    fontSize: 44,
    fontWeight: 800,
    letterSpacing: "0.02em",
    color: "#111827",
  },
  heroSub: {
    marginTop: 8,
    fontSize: 13,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#6B7280",
  },
  stepper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    maxWidth: 640,
    margin: "32px auto 0",
  },
  stepLine: {
    width: 40,
    height: 1,
    background: "#D1D5DB",
    display: "inline-block",
  },
  main: {
    maxWidth: 1040,
    margin: "0 auto",
    padding: "40px 24px 96px",
  },
  card: {
    maxWidth: 640,
    margin: "0 auto",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.8)",
    background: "rgba(255,255,255,0.82)",
    padding: 24,
    boxShadow: "0 20px 80px -40px rgba(90,0,140,0.25)",
    backdropFilter: "blur(6px)",
  } as CSSProperties,
  cardTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 600,
    color: "#111827",
    textAlign: "left",
  },
  cardKicker: {
    marginTop: 6,
    fontSize: 13,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#6B7280",
    textAlign: "left",
  },
  cardKickerStrong: { fontWeight: 700, color: "#374151" },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    borderRadius: 12,
    border: "1px solid #E5E7EB",
    background: "#FFFFFF",
    padding: 6,
  },
  atPrefix: {
    padding: "0 12px",
    color: "#9CA3AF",
    fontWeight: 500,
  },
  input: {
    height: 44,
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    borderRadius: 10,
    color: "#1F2937",
    fontSize: 16,
  } as CSSProperties,
  buttonRow: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 20,
  },
 followBtn: {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  boxSizing: "border-box",           // <— key fix
  borderRadius: 12,
  background: "#F5F5F5",
  padding: "12px 20px",
  fontSize: 14,
  fontWeight: 600,
  color: "#374151",
  border: "1px solid rgba(0,0,0,0.05)",
  textDecoration: "none",
  transition: "background 150ms ease",
},

verifyBtn: {
  width: "100%",
  boxSizing: "border-box",           // <— do the same here
  borderRadius: 12,
  padding: "12px 20px",
  fontSize: 14,
  fontWeight: 700,
  color: "#FFFFFF",
  boxShadow: "0 8px 24px -10px rgba(120, 0, 120, 0.45)",
  background: "linear-gradient(90deg, #8B5CF6 0%, #F472B6 55%, #F9A8D4 100%)",
  cursor: "pointer",
  border: "none",
},
  verifyBtnDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  note: {
    marginTop: 12,
    fontSize: 12,
    color: "#6B7280",
  },
  footer: {
    paddingBottom: 40,
    textAlign: "center",
    fontSize: 12,
    color: "#9CA3AF",
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    whiteSpace: "nowrap",
    border: 0,
  },
};
