import HomePage from "../../pages/HomePage/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import RecordsListPage from "../../pages/RecordsListPage/RecordsListPage";
import Layout from "../Layout/Layout";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { paths } from "../../routers/paths";

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
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={paths.records}
          element={
            <ProtectedRoute destinationPath={paths.records}>
              <RecordsListPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={paths.home} />} />
      </Routes>
    </Layout>
  );
};

export default App;
