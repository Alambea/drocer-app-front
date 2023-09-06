import HomePage from "../../pages/HomePage/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import RecordsListPage from "../../pages/RecordsListPage/RecordsListPage";
import Layout from "../Layout/Layout";

const App = (): React.ReactElement => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/records" element={<RecordsListPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
