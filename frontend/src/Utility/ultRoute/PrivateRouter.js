import { useAuth } from "../../Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateOutlet() {
  const { authcheck, dispatch } = useAuth();

  return authcheck ? Outlet : <Navigate to="/auth/login"></Navigate>;
}
