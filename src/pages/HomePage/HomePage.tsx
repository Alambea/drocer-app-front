import { browserPopupRedirectResolver, signInWithPopup } from "firebase/auth";
import { Helmet } from "react-helmet";
import Button from "../../components/Button/Button";
import { auth, gitHubProvider, googleProvider } from "../../firebase";
import "./HomePage.scss";

const HomePage = (): React.ReactElement => {
  const loginWithGitHub = async () => {
    await signInWithPopup(auth, gitHubProvider, browserPopupRedirectResolver);
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);
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
          Select a sign in method to access to your favorite records
        </p>
        <Button className="sign-in__button" actionOnClick={loginWithGoogle}>
          <span className="sign-in__button-content">
            <img
              src="/images/google_icon.svg"
              alt="Google icon"
              className="sign-in__icon"
              width="25"
              height="25"
            />
            {"Sign in with Google"}
          </span>
        </Button>
        <Button className="sign-in__button" actionOnClick={loginWithGitHub}>
          <span className="sign-in__button-content">
            <img
              src="/images/github_icon.svg"
              alt="GitHub icon"
              className="sign-in__icon"
              width="25"
              height="25"
            />
            {"Sign in with GitHub"}
          </span>
        </Button>
      </article>
    </>
  );
};

export default HomePage;
