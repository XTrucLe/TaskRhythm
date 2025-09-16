import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const ManageDashboardPage = lazy(() => import("../pages/manage/DashboardPage"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/boards",
    element: <DashboardPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/manage",
    children: [
      {
        path: "/manage/dashboard",
        element: <ManageDashboardPage />,
      },
    ],
  },
];
