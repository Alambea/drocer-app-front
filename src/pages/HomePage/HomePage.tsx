import { signInWithPopup } from "firebase/auth";
import Button from "../../components/Button/Button";
import "./HomePage.scss";
import { auth, gitHubProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routers/paths";

const HomePage = (): React.ReactElement => {
  const navigate = useNavigate();

  const login = async () => {
    await signInWithPopup(auth, gitHubProvider);
    navigate(paths.records);
  };

  return (
    <section className="sign-in">
      <div className="sign-in__container">
        <h2 className="sign-in__title">Welcome</h2>
        <p className="sign-in__text">
          Access with your GitHub account to your favorite records
        </p>
        <Button className="sign-in__button" actionOnClick={login}>
          Sign in
        </Button>
      </div>
    </section>
  );
};

export default HomePage;
