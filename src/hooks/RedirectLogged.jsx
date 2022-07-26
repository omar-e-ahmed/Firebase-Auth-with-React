import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RedirectLogged() {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/dashboard" /> : <Outlet />;
}
