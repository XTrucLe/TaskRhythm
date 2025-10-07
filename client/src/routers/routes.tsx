import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import PrivateRoute from "./wrappers/PrivateRoute";
import PublicRoute from "./wrappers/PublicRoute";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const OnboardingPage = lazy(() => import("../pages/auth/OnboardingPage"));
const DashboardPage = lazy(() => import("../pages/user/DashboardPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const ManageDashboardPage = lazy(() => import("../pages/manage/DashboardPage"));
const WorkspaceDetailPage = lazy(
  () => import("../pages/user/WorkspaceDetailPage")
);

export const routes: RouteObject[] = [
  {
    element: <PublicRoute />,
    children: [
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
    ],
  },

  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/manage",
        children: [
          {
            path: "dashboard",
            element: <ManageDashboardPage />,
          },
        ],
      },
      {
        path: "/boards",
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
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
