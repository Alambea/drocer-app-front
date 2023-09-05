import HomePage from "../../pages/HomePage/HomePage";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import "./App.scss";

const App = (): React.ReactElement => {
  return (
    <div className="container">
      <Header />
      <main className="main-container">
        <HomePage />
        <Navigation />
      </main>
    </div>
  );
};

export default App;
