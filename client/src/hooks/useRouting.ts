import { useNavigate } from "react-router-dom";

export default function useRouting() {
  const navigate = useNavigate();
  return {
    goHome: () => navigate("/"),
    goDashboard: () => navigate("/manage/dashboard"),
    goLogin: () => navigate("/login"),
    goRegister: () => navigate("/register"),
    goSettings: () => navigate("/manage/settings"),
    goNotFound: () => navigate("/404"),
  };
}
