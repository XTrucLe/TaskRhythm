import { useNavigate } from "react-router-dom";
import { TokenManager } from "../services/tokenManager";

export default function useRouting() {
  const navigate = useNavigate();
  const isAuthenticated = TokenManager.isLoggedIn();
  return {
    // Auth routes
    goLogin: () => navigate("/login"),
    goRegister: () => navigate("/register"),

    // Mặc định fallback
    goHome: () => navigate(isAuthenticated ? "/home" : "/"),

    goWorkspace: (workspace: any) =>
      navigate(`/workspace/${workspace.id}`, { state: workspace }),
  };
}
