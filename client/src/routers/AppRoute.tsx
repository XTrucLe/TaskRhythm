import { Suspense } from "react";
import { routes } from "./routes";
import { useRoutes } from "react-router-dom";
import Loading from "../utils/loading.util";

const AppRoute = () => {
  const element = useRoutes(routes);
  return <Suspense fallback={<Loading />}>{element}</Suspense>;
};

export default AppRoute;
