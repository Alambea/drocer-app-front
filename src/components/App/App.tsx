import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import "./App.scss";

const App = (): React.ReactElement => {
  return (
    <div className="container">
      <Header />
      <Navigation />
    </div>
  );
};

export default App;
