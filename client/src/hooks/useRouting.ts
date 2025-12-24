import { useNavigate } from "react-router-dom";
import { TokenManager } from "@/features/auth/services/tokenManager";
import type { Workspace } from "@/features/workspaces/types/workspace";

export default function useRouting() {
  const navigate = useNavigate();
  const isAuthenticated = TokenManager.isLoggedIn();
  return {
    // Auth routes
    goLogin: () => navigate("/login"),
    goRegister: () => navigate("/register"),

    // Mặc định fallback
    goHome: () => navigate(isAuthenticated ? "/home" : "/"),

    goWorkspace: (workspace: Workspace) =>
      navigate(`/workspace/${workspace.id}`, { state: workspace }),
  };
}
