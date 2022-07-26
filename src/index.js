import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import ReactDOM from "react-dom/client";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <SoftUIControllerProvider>
        <App />
      </SoftUIControllerProvider>
    </AuthProvider>
  </BrowserRouter>
);
