// // src/components/WhitelistCheckerWallet.tsx
// import React, { useState, CSSProperties } from "react";
// import romeIcon from "../assets/Romeicon.svg";

// export default function WhitelistCheckerWallet() {
//   const [wallet, setWallet] = useState("");

//   const onCheck = () => {
//     alert(`Checking whitelist status for wallet: ${wallet}`);
//   };

//   return (
//     <div style={styles.page}>
//       <header style={styles.header}>
//         <div style={styles.brandBlock}>
//           <img src={romeIcon} alt="Rome Protocol" style={styles.brandLogo} />
//           <p style={styles.brandTag}>Imperia: Rome Citizens</p>
//         </div>

//         <div style={{ marginTop: 32 }}>
//           <h2 style={styles.heroTitle}>WHITELIST CHECKER</h2>
//           <p style={styles.heroSub}>
//             VERIFY YOUR ELIGIBILITY FOR THE ROME NFT DROP
//           </p>
//         </div>

//         <nav style={styles.stepper}>
//           <StepItem index="I" label="Follow" />
//           <span style={styles.stepLine} />
//           <StepItem index="II" label="Wallet" active />
//           <span style={styles.stepLine} />
//           <StepItem index="III" label="Result" />
//         </nav>
//       </header>

//       <main style={styles.main}>
//         <div style={styles.card}>
//           <h3 style={styles.cardTitle}>Step 2: Check Your Wallet</h3>
//           <p style={styles.cardKicker}>ENTER YOUR SOLANA WALLET ADDRESS</p>

//           <label htmlFor="wallet" style={styles.srOnly}>
//             Solana Wallet Address
//           </label>
//           <div style={{ marginTop: 20 }}>
//             <input
//               id="wallet"
//               placeholder="7xK2s3fA...jK9nLcXdE5gTf"
//               value={wallet}
//               onChange={(e) => setWallet(e.target.value)}
//               style={styles.input}
//             />
//           </div>

//           <button type="button" onClick={onCheck} style={styles.checkBtn}>
//             Check Whitelist Status
//           </button>
//         </div>
//       </main>

//       <footer style={styles.footer}>
//         © {new Date().getFullYear()} Rome Protocol
//       </footer>
//     </div>
//   );
// }

// function StepItem({
//   index,
//   label,
//   active = false,
// }: {
//   index: string;
//   label: string;
//   active?: boolean;
// }) {
//   return (
//     <div
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 8,
//         color: active ? "#6D28D9" : "#9CA3AF",
//         fontWeight: 600,
//         fontSize: 12,
//         letterSpacing: "0.08em",
//         textTransform: "uppercase",
//       }}
//     >
//       <span
//         style={{
//           display: "grid",
//           placeItems: "center",
//           width: 24,
//           height: 24,
//           borderRadius: 999,
//           border: `1px solid ${active ? "#A78BFA" : "#D1D5DB"}`,
//           background: active ? "#F5F3FF" : "#FFFFFF",
//           fontSize: 11,
//         }}
//       >
//         {index}
//       </span>
//       <span>{label}</span>
//     </div>
//   );
// }

// const styles: Record<string, CSSProperties> = {
//   page: {
//     minHeight: "100vh",
//     background: "#FAF7FB",
//     fontFamily:
//       '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter,Helvetica,Arial,sans-serif',
//     color: "#111827",
//     textAlign: "center",
//   },
//   header: { maxWidth: 1040, margin: "0 auto", padding: "40px 24px 0" },
//   brandBlock: { display: "inline-flex", flexDirection: "column", gap: 8 },
//   brandLogo: { height: 42, margin: "0 auto 4px" },
//   brandTag: { fontSize: 14, color: "#7C3AED", margin: 0 },
//   heroTitle: { fontSize: 44, fontWeight: 800, margin: 0 },
//   heroSub: {
//     marginTop: 8,
//     fontSize: 13,
//     letterSpacing: "0.18em",
//     textTransform: "uppercase",
//     color: "#6B7280",
//   },
//   stepper: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 12,
//     marginTop: 32,
//   },
//   stepLine: { width: 40, height: 1, background: "#D1D5DB" },
//   main: { maxWidth: 1040, margin: "0 auto", padding: "40px 24px 96px" },
//   card: {
//     maxWidth: 480,
//     margin: "0 auto",
//     borderRadius: 12,
//     border: "1px solid #E5E7EB",
//     background: "#fff",
//     padding: 24,
//     boxShadow: "0 20px 60px -30px rgba(90,0,140,0.25)",
//   },
//   cardTitle: { fontSize: 20, fontWeight: 600, textAlign: "left", margin: 0 },
//   cardKicker: {
//     marginTop: 6,
//     fontSize: 13,
//     letterSpacing: "0.18em",
//     textTransform: "uppercase",
//     color: "#6B7280",
//     textAlign: "left",
//   },
//   input: {
//     width: "100%",
//     height: 44,
//     borderRadius: 8,
//     border: "1px solid #D1D5DB",
//     padding: "0 12px",
//     fontSize: 15,
//     color: "#111827",
//   },
//   checkBtn: {
//     width: "100%",
//     marginTop: 20,
//     borderRadius: 12,
//     padding: "12px 20px",
//     fontSize: 14,
//     fontWeight: 700,
//     color: "#FFFFFF",
//     background:
//       "linear-gradient(90deg, #8B5CF6 0%, #F472B6 55%, #F9A8D4 100%)",
//     border: "none",
//     cursor: "pointer",
//   },
//   footer: {
//     paddingBottom: 40,
//     textAlign: "center",
//     fontSize: 12,
//     color: "#9CA3AF",
//   },
//   srOnly: {
//     position: "absolute",
//     width: 1,
//     height: 1,
//     padding: 0,
//     margin: -1,
//     overflow: "hidden",
//     clip: "rect(0,0,0,0)",
//     whiteSpace: "nowrap",
//     border: 0,
//   },
// };



import React, { useState, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import romeIcon from "../assets/Romeicon.svg";

type StatusKey = "not" | "overallocated" | "guaranteed" | "standby";

export default function WhitelistCheckerWallet() {
  const [wallet, setWallet] = useState("");
  const navigate = useNavigate();

  // mock deterministic status so you can demo all variants:
  function getMockStatus(addr: string): StatusKey {
    if (!addr) return "not";
    const c = addr.trim().slice(-1).toLowerCase();
    if ("0123".includes(c)) return "guaranteed";
    if ("4567".includes(c)) return "overallocated";
    if ("89ab".includes(c)) return "standby";
    return "not";
  }

  const onCheck = () => {
    const status = getMockStatus(wallet);
    // pass wallet via query; handle is stored in sessionStorage by step 1
    const q = new URLSearchParams({ status, wallet });
    navigate(`/result?${q.toString()}`);
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
          <StepItem index="II" label="Wallet" active />
          <span style={styles.stepLine} />
          <StepItem index="III" label="Result" />
        </nav>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Step 2: Check Your Wallet</h3>
          <p style={styles.cardKicker}>ENTER YOUR SOLANA WALLET ADDRESS</p>

          <label htmlFor="wallet" style={styles.srOnly}>
            Solana Wallet Address
          </label>
          <div style={{ marginTop: 20 }}>
            <input
              id="wallet"
              placeholder="7xK2s3fA...jK9nLcXdE5gTf"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="button" onClick={onCheck} style={styles.checkBtn}>
            Check Whitelist Status
          </button>
        </div>
      </main>

      <footer style={styles.footer}>© {new Date().getFullYear()} Rome Protocol</footer>
    </div>
  );
}

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
    maxWidth: 560,
    margin: "0 auto",
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "#fff",
    padding: 24,
    boxShadow: "0 20px 80px -40px rgba(90,0,140,0.25)",
  },
  cardTitle: { fontSize: 20, fontWeight: 600, textAlign: "left", margin: 0 },
  cardKicker: {
    marginTop: 6,
    fontSize: 13,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#6B7280",
    textAlign: "left",
  },
  input: {
    width: "100%",
    height: 44,
    borderRadius: 10,
    border: "1px solid #E5E7EB",
    padding: "0 14px",
    fontSize: 15,
    color: "#111827",
    background: "#FFFFFF",
  },
  checkBtn: {
    width: "100%",
    marginTop: 20,
    borderRadius: 12,
    padding: "12px 20px",
    fontSize: 14,
    fontWeight: 700,
    color: "#FFFFFF",
    background: "linear-gradient(90deg, #8B5CF6 0%, #F472B6 55%, #F9A8D4 100%)",
    border: "none",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  footer: { paddingBottom: 40, fontSize: 12, color: "#9CA3AF" },
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
