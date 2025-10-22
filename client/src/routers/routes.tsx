import { lazy } from "react";
import { type RouteObject } from "react-router-dom";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const HomePage = lazy(() => import("../pages/user/HomePage"));
const WorkspaceOverview = lazy(()=> import("../pages/user/WorkspaceOverview"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/workspace/:workspaceId",
    element: <WorkspaceOverview />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
