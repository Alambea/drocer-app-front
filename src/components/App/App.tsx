import HomePage from "../../pages/HomePage/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import RecordsListPage from "../../pages/RecordsListPage/RecordsListPage";
import Layout from "../Layout/Layout";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const App = (): React.ReactElement => {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/home" />
            </ProtectedRoute>
          }
        />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/records"
          element={
            <ProtectedRoute>
              <RecordsListPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
};

export default App;
