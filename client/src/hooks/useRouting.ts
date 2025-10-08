import { useNavigate } from "react-router-dom";
import { TokenManager } from "../services/tokenManager";

export default function useRouting() {
  const navigate = useNavigate();
  const isAuthenticated = TokenManager.isLoggedIn();
  return {
    // Chuyển tới dashboard chính
    goDashboard: () => navigate("/boards"),

    // Mở chi tiết workspace
    goWorkspaceDetail: (workspaceId: string, data?: unknown) =>
      navigate(`/boards/${workspaceId}`, {
        state: data ? { data } : undefined,
      }),

    // Quản lý admin/dashboard
    goManageDashboard: () => navigate("/manage/dashboard"),

    // Auth routes
    goLogin: () => navigate("/login"),
    goRegister: () => navigate("/register"),

    // Mặc định fallback
    goHome: () => navigate(isAuthenticated ? "/boards" : "/"),
  };
}
