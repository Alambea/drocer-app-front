import { browserPopupRedirectResolver, signInWithPopup } from "firebase/auth";
import { Helmet } from "react-helmet";
import Button from "../../components/Button/Button";
import { auth, gitHubProvider } from "../../firebase";
import "./HomePage.scss";

const HomePage = (): React.ReactElement => {
  const login = async () => {
    await signInWithPopup(auth, gitHubProvider, browserPopupRedirectResolver);
  };

  return (
    <>
      <Helmet>
        <title>Drocer - Sign in</title>
        <meta
          name="description"
          content="Sign in to save your favourite records"
        />
      </Helmet>
      <article className="sign-in">
        <h2 className="sign-in__title">Welcome</h2>
        <p className="sign-in__text">
          Access with your GitHub account to your favorite records
        </p>
        <Button className="sign-in__button" actionOnClick={login}>
          Sign in
        </Button>
      </article>
    </>
  );
};

export default HomePage;
