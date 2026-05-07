import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

// =========================================
// 🎨 GLOBAL STYLES
// =========================================
import "./styles/main.css";


// =========================================
// 🚀 CREATE ROOT
// =========================================
const root = ReactDOM.createRoot(
  document.getElementById("root")
);


// =========================================
// 🌍 RENDER APP
// =========================================
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);