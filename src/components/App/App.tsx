import { useAuthState } from "react-firebase-hooks/auth";
import HomePage from "../../pages/HomePage/HomePage";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import "./App.scss";
import { auth } from "../../firebase";
import { Navigate, Route, Routes } from "react-router-dom";

const App = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  return (
    <div className="container">
      <Header />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
        {user && <Navigation />}
      </main>
    </div>
  );
};

export default App;
