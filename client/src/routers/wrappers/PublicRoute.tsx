import { Outlet } from "react-router-dom";
import { TokenManager } from "../../services/tokenManager";

export default function PublicRoute() {
  const isAuthenticated = TokenManager.isLoggedIn();

  return !isAuthenticated ? <Outlet /> : (window.location.href = "/");
}
