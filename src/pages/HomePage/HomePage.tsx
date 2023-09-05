import Button from "../../components/Button/Button";

const HomePage = (): React.ReactElement => {
  return (
    <div className="sign-in">
      <h2 className="sign-in__title">Welcome</h2>
      <p className="sign-in__text">
        Access with your GitHub account to your favorite records
      </p>
      <Button className="sign-in__button" actionOnClick={() => {}}>
        Sign in
      </Button>
    </div>
  );
};

export default HomePage;
