import { lazy } from "react";

export const LazyNavigation = lazy(
  () => import("../components/Navigation/Navigation"),
);

export const LazyRecordsListPage = lazy(
  () => import("../pages/RecordsListPage/RecordsListPage"),
);

export const LazyHomePage = lazy(() => import("../pages/HomePage/HomePage"));

export const LazyNoRecordsInformation = lazy(
  () => import("../components/NoRecordsInformation/NoRecordsInformation"),
);

export const LazyRecordsList = lazy(
  () => import("../components/RecordList/RecordsList"),
);
