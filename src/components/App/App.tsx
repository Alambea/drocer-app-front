import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Layout from "../Layout/Layout";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { paths } from "../../routers/paths";
import {
  LazyAddRecordPage,
  LazyHomePage,
  LazyModifyRecordPage,
  LazyNotFoundPage,
  LazyRecordDetailPage,
  LazyRecordsListPage,
} from "../../routers/lazyComponents";

const App = (): React.ReactElement => {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute destinationPath={paths.home}>
              <Navigate to={paths.home} />
            </ProtectedRoute>
          }
        />
        <Route
          path={paths.home}
          element={
            <ProtectedRoute destinationPath={paths.home}>
              <Suspense>
                <LazyHomePage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        {[paths.records, paths.records + paths.search].map((path) => (
          <Route
            path={path}
            element={
              <ProtectedRoute destinationPath={path}>
                <Suspense>
                  <LazyRecordsListPage />
                </Suspense>
              </ProtectedRoute>
            }
            key={path}
          />
        ))}
        <Route
          path={paths.addRecord}
          element={
            <ProtectedRoute destinationPath={paths.addRecord}>
              <Suspense>
                <LazyAddRecordPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path={paths.detail}
          element={
            <ProtectedRoute destinationPath={paths.detail}>
              <Suspense>
                <LazyRecordDetailPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path={paths.modifyRecord}
          element={
            <ProtectedRoute destinationPath={paths.modifyRecord}>
              <Suspense>
                <LazyModifyRecordPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <Suspense>
              <LazyNotFoundPage />
            </Suspense>
          }
        />
      </Routes>
    </Layout>
  );
};

export default App;
