import { Suspense } from "react";
import { routes } from "./routes";
import { useRoutes } from "react-router-dom";

const AppRoute = () => {
  const element = useRoutes(routes);
  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
};

export default AppRoute;
