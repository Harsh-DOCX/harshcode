import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { PortfolioProvider } from "./context/PortfolioContext.jsx";
import "./styles/global.css";
import { captureUtm } from "./utm.js";

captureUtm();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PortfolioProvider>
    </ThemeProvider>
  </React.StrictMode>
);
