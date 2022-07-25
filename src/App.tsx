import React from "react";
import "./App.css";
import PrivateRoute from "./hooks/PrivateRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register, Dashboard } from "./pages";
import { AuthProvider } from "./context/AuthContext";

// dotenv.config();

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
