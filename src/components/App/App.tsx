import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Layout from "../Layout/Layout";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { paths } from "../../routers/paths";
import {
  LazyHomePage,
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
        <Route
          path={paths.records}
          element={
            <ProtectedRoute destinationPath={paths.records}>
              <Suspense>
                <LazyRecordsListPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={paths.home} />} />
      </Routes>
    </Layout>
  );
};

export default App;
