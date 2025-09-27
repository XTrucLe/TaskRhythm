import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import WorkspaceDetailPage from "../pages/user/WorkspaceDetailPage";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const OnboardingPage = lazy(() => import("../pages/auth/OnboardingPage"));
const DashboardPage = lazy(() => import("../pages/user/DashboardPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const ManageDashboardPage = lazy(() => import("../pages/manage/DashboardPage"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <OnboardingPage />,
  },
  {
    path: "/register",
    element: <OnboardingPage />,
  },
  {
    path: ":userName",
    children: [
      {
        index: true,
        element: <Navigate to="boards" replace />,
      },
      {
        path: "boards",
        element: <DashboardPage />,
      },
      {
        path: "boards/:workspaceId",
        element: <WorkspaceDetailPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/manage",
    children: [
      {
        path: "dashboard",
        element: <ManageDashboardPage />,
      },
    ],
  },
];
