import { lazy } from "react";

export const LazyRecordsListPage = lazy(
  () => import("../pages/RecordsListPage/RecordsListPage"),
);

export const LazyHomePage = lazy(() => import("../pages/HomePage/HomePage"));
