import { useNavigate } from "react-router-dom";

export default function useRouting() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "defaultUser";

  return {
    goDashboard: () => navigate(`/${username}/boards`),
    goWorkspaceDetail: (workspaceId: string, data: unknown) =>
      navigate(`/${username}/boards/${workspaceId}`, { state: { data } }),
    goManageDashboard: () => navigate("/manage/dashboard"),
  };
}
