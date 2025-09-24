import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const OnboardingPage = lazy(() => import("../pages/OnboardingPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
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
