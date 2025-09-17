// // src/App.tsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import WhitelistCheckerFollow from "./components/WhitelistCheckerFollow";
// import WhitelistCheckerWallet from "./components/WhitelistCheckerWallet";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<WhitelistCheckerFollow />} />
//       <Route path="/wallet" element={<WhitelistCheckerWallet />} />
//     </Routes>
//   );
// }


import React from "react";
import { Routes, Route } from "react-router-dom";
import WhitelistCheckerFollow from "./components/WhitelistCheckerFollow";
import WhitelistCheckerWallet from "./components/WhitelistCheckerWallet";
import WhitelistCheckerResult from "./components/WhitelistCheckerResult";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WhitelistCheckerFollow />} />
      <Route path="/wallet" element={<WhitelistCheckerWallet />} />
      <Route path="/result" element={<WhitelistCheckerResult />} />
    </Routes>
  );
}
