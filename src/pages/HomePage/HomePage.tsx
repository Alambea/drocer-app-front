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
    <article className="sign-in">
      <h2 className="sign-in__title">Welcome</h2>
      <p className="sign-in__text">
        Access with your GitHub account to your favorite records
      </p>
      <Button className="sign-in__button" actionOnClick={login}>
        Sign in
      </Button>
    </article>
  );
};

export default HomePage;
