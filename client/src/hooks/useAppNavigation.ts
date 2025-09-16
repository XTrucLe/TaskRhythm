import { useNavigate } from "react-router-dom";

export default function useAppNavigation() {
  const navigate = useNavigate();
  return {
    goHome: () => navigate("/"),
    goDashboard: () => navigate("/manage/dashboard"),
  };
}
