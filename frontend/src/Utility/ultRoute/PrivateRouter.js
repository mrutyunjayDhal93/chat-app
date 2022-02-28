import { useAuth } from "../../Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateOutlet() {
  const { authCheck, dispatch } = useAuth();

  return authCheck ? Outlet : <Navigate to="/auth/login" />;
}
