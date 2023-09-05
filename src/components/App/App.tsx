import { useAuthState } from "react-firebase-hooks/auth";
import HomePage from "../../pages/HomePage/HomePage";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import "./App.scss";
import { auth } from "../../firebase";

const App = (): React.ReactElement => {
  const [user] = useAuthState(auth);
  return (
    <div className="container">
      <Header />
      <main className="main-container">
        <HomePage />
        {user && <Navigation />}
      </main>
    </div>
  );
};

export default App;
