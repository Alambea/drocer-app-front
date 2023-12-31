import { lazy } from "react";

export const LazyRecordsListPage = lazy(
  () => import("../pages/RecordsListPage/RecordsListPage"),
);

export const LazyHomePage = lazy(() => import("../pages/HomePage/HomePage"));

export const LazyNotFoundPage = lazy(
  () => import("../pages/NotFoundPage/NotFoundPage"),
);

export const LazyAddRecordPage = lazy(
  () => import("../pages/AddRecordPage/AddRecordPage"),
);

export const LazyRecordDetailPage = lazy(
  () => import("../pages/RecordDetailPage/RecordDetailPage"),
);

export const LazyModifyRecordPage = lazy(
  () => import("../pages/ModifyRecordPage/ModifyRecordPage"),
);
