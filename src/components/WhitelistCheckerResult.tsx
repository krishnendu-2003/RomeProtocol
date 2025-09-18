import React, { CSSProperties, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import romeIcon from "../assets/SVG.svg";

type StatusKey = "not" | "overallocated" | "guaranteed" | "standby";

export default function WhitelistCheckerResult() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);

  const status = (params.get("status") as StatusKey) || "not";
  const wallet = params.get("wallet") || "7XK2S3FAGJ5J65GA..."; // placeholder
  const handle = sessionStorage.getItem("romeHandle") || "@USERNAME";

  const ui = useMemo(() => getStatusUI(status), [status]);

  const openMint = () => {
    window.open("https://magiceden.io/", "_blank", "noopener,noreferrer");
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brandBlock}>
          <img src={romeIcon} alt="Rome Protocol" style={styles.brandLogo} />
          <p style={styles.brandTag}>Imperia: Rome Citizens</p>
        </div>

        <div style={{ marginTop: 32 }}>
          <h2 style={styles.heroTitle}>WHITELIST CHECKER</h2>
          <p style={styles.heroSub}>VERIFY YOUR ELIGIBILITY FOR THE ROME NFT DROP</p>
        </div>

        <nav style={styles.stepper}>
          <StepItem index="I" label="Follow" />
          <span style={styles.stepLine} />
          <StepItem index="II" label="Wallet" />
          <span style={styles.stepLine} />
          <StepItem index="III" label="Result" active />
        </nav>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Whitelist Status</h3>

          {/* status panel */}
          <div style={{ ...styles.statusPanel, ...ui.panel }}>
            <div style={styles.statusHeaderRow}>
              {ui.icon}
              <h4 style={{ ...styles.statusTitle, color: ui.titleColor }}>{ui.title}</h4>
            </div>
            <p style={styles.statusDesc}>{ui.desc}</p>

            <button type="button" onClick={openMint} style={styles.mintBtn}>
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ width: 16, height: 16, marginRight: 8 }}
              >
                <path d="M5 12a1 1 0 1 0 0 2h7a1 1 0 1 0 0-2H5zm13.293-8.707a1 1 0 0 0-1.414 0l-5 5A1 1 0 0 0 12 9v3a1 1 0 1 0 2 0v-1.586l4-4V11a1 1 0 1 0 2 0V4a1 1 0 0 0-.707-.707z" />
              </svg>
              Mint in Phase 3 (Public) - Magic Eden
            </button>
          </div>

          {/* rows */}
          <div style={styles.row}>
            <div style={styles.rowLeft}>
              <XIcon />
              <div>
                <div style={styles.rowLabel}>X Follow</div>
                <div style={styles.rowValue}>{handle}</div>
              </div>
            </div>
            <Badge ok text="Verified" />
          </div>

          <div style={styles.row}>
            <div style={styles.rowLeft}>
              <WalletIcon />
              <div>
                <div style={styles.rowLabel}>Wallet</div>
                <div style={styles.rowValue}>{compress(wallet)}</div>
              </div>
            </div>
            {status === "not" ? (
              <Badge ok={false} text="Not Whitelisted" />
            ) : (
              <Badge ok text="Verified" />
            )}
          </div>

          <button
            type="button"
            onClick={() => navigate("/wallet")}
            style={styles.secondaryBtn}
          >
            Check Another Wallet
          </button>
        </div>
      </main>

      <footer style={styles.footer}>© {new Date().getFullYear()} Rome Protocol</footer>
    </div>
  );
}

/* ---------- helpers & tiny components ---------- */
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

function Badge({ ok, text }: { ok: boolean; text: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 700,
        color: ok ? "#16A34A" : "#DC2626",
        background: ok ? "rgba(22,163,74,0.08)" : "rgba(220,38,38,0.08)",
        border: `1px solid ${ok ? "rgba(22,163,74,0.25)" : "rgba(220,38,38,0.25)"}`,
      }}
    >
      {/* gear/check-ish glyph */}
      <span style={{ fontSize: 14 }}>{ok ? "✔︎" : "✖︎"}</span>
      {text}
    </span>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18, color: "#111827" }}>
      <path d="M18.244 2H21l-7.36 8.395L22.5 22H15.9l-5.03-6.025L4.96 22H2l7.828-8.928L1.5 2h6.76l4.65 5.56L18.244 2Zm-2.652 18.11h1.722L7.512 3.81H5.708l9.884 16.3Z" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18, color: "#111827" }}>
      <path d="M3 7a3 3 0 013-3h11a2 2 0 012 2v1h1a2 2 0 012 2v7a2 2 0 01-2 2H6a3 3 0 01-3-3V7zm16-1H6a1 1 0 00-1 1v9a1 1 0 001 1h13V6z" />
    </svg>
  );
}

function compress(s: string, left = 12, right = 8) {
  if (!s || s.length <= left + right + 3) return s || "";
  return `${s.slice(0, left)}...${s.slice(-right)}`;
}

function getStatusUI(status: StatusKey) {
  if (status === "guaranteed") {
    return {
      title: "Guaranteed WL",
      desc:
        "Your Wallet has been Whitelisted. You can Mint the NFT in Phase 1. Welcome to the Empire.",
      titleColor: "#16A34A",
      panel: {
        border: "1px solid rgba(22,163,74,0.35)",
        background: "rgba(16,185,129,0.06)",
      } as CSSProperties,
      icon: <CircleCheck color="#16A34A" />,
    };
  }
  if (status === "overallocated") {
    return {
      title: "Overallocated WL",
      desc:
        "Your Wallet has been Whitelisted and You can mint the NFT in Phase 2. If you miss Phase 2 you can still mint in Phase 3 which is Open for Public.",
      titleColor: "#7C3AED",
      panel: {
        border: "1px solid rgba(124,58,237,0.35)",
        background: "rgba(124,58,237,0.06)",
      } as CSSProperties,
      icon: <CircleInfo color="#7C3AED" />,
    };
  }
  if (status === "standby") {
    return {
      title: "Standby WL",
      desc:
        "Your Wallet is Standby for Phase 1. If anyone with Guarantee WL doesn't mint within 4 hours, you'll be able to mint. Or you can mint in Phase 2.",
      titleColor: "#D97706",
      panel: {
        border: "1px solid rgba(217,119,6,0.35)",
        background: "rgba(217,119,6,0.06)",
      } as CSSProperties,
      icon: <TriangleWarn color="#D97706" />,
    };
  }
  // not whitelisted
  return {
    title: "Not Whitelisted",
    desc:
      "Sorry your Wallet has not been Whitelisted but you can still mint the NFT in Phase 3, which is Open for Public Mint.",
    titleColor: "#DC2626",
    panel: {
      border: "1px solid rgba(220,38,38,0.35)",
      background: "rgba(220,38,38,0.06)",
    } as CSSProperties,
    icon: <CircleX color="#DC2626" />,
  };
}

function CircleCheck({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, color }}>
      <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M7 12.5l3 3 7-7" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function CircleX({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, color }}>
      <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M8 8l8 8M16 8l-8 8" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function CircleInfo({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, color }}>
      <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M12 7.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm-1.25 4h2.5v6h-2.5z" fill={color} />
    </svg>
  );
}
function TriangleWarn({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, color }}>
      <path
        d="M12 3l10 18H2L12 3z"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <path d="M12 9v5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1" fill={color} />
    </svg>
  );
}

/* ---------- styles ---------- */
const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#FAF7FB",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter,Helvetica,Arial,sans-serif',
    color: "#111827",
    textAlign: "center",
  },
  header: { maxWidth: 1040, margin: "0 auto", padding: "40px 24px 0" },
  brandBlock: { display: "inline-flex", flexDirection: "column", gap: 8, alignItems: "center" },
  brandLogo: { height: 42, marginBottom: 4, display: "block" },
  brandTag: { fontSize: 14, color: "#7C3AED", margin: 0 },
  heroTitle: { fontSize: 44, fontWeight: 800, margin: 0 },
  heroSub: {
    marginTop: 8,
    fontSize: 13,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#6B7280",
  },
  stepper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 32,
  },
  stepLine: { width: 40, height: 1, background: "#D1D5DB" },
  main: { maxWidth: 1040, margin: "0 auto", padding: "40px 24px 96px" },
  card: {
    maxWidth: 640,
    margin: "0 auto",
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "#fff",
    padding: 24,
    boxShadow: "0 20px 80px -40px rgba(90,0,140,0.25)",
  },
  cardTitle: { fontSize: 20, fontWeight: 600, textAlign: "left", margin: 0 },

  statusPanel: {
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    textAlign: "left",
  },
  statusHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  statusTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 800,
  },
  statusDesc: {
    margin: "6px 0 12px",
    fontSize: 14,
    color: "#6B7280",
  },
  mintBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 12,
    padding: "12px 20px",
    fontSize: 14,
    fontWeight: 800,
    color: "#FFFFFF",
    background: "linear-gradient(90deg, #6D28D9 0%, #7C3AED 50%, #581C87 100%)",
    border: "none",
    cursor: "pointer",
  },

  row: {
    marginTop: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #E5E7EB",
    borderRadius: 10,
    padding: 12,
    background: "#FFFFFF",
  },
  rowLeft: { display: "flex", alignItems: "center", gap: 10 },
  rowLabel: { fontSize: 13, color: "#6B7280" },
  rowValue: { fontSize: 14, color: "#111827", fontWeight: 600 },

  secondaryBtn: {
    width: "100%",
    marginTop: 16,
    borderRadius: 12,
    padding: "12px 20px",
    fontSize: 15,
    fontWeight: 700,
    color: "#111827",
    background: "linear-gradient(180deg, #F5F5F5, #EEEEEE)",
    border: "1px solid rgba(0,0,0,0.06)",
    cursor: "pointer",
  },

  footer: { paddingBottom: 40, fontSize: 12, color: "#9CA3AF" },
};
