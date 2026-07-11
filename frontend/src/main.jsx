import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";

import App from "./App";

import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster position="top-right" />
    </ThemeProvider>
  </StrictMode>
);