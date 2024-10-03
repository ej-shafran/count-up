import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

import "./index.css";

const container = document.getElementById("root");

if (!container) throw new Error("Invalid index.html file; missing #root");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
