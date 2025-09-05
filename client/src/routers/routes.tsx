import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
];
