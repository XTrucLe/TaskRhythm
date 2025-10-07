import { Outlet } from "react-router-dom";
import { TokenManager } from "../../services/tokenManager";

export default function PrivateRoute() {
  const isAuthenticated = TokenManager.isLoggedIn();

  return isAuthenticated ? <Outlet /> : (window.location.href = "/login");
}
