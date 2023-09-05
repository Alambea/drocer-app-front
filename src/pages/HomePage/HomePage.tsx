import Button from "../../components/Button/Button";
import "./HomePage.scss";

const HomePage = (): React.ReactElement => {
  return (
    <section className="sign-in">
      <div className="sign-in__container">
        <h2 className="sign-in__title">Welcome</h2>
        <p className="sign-in__text">
          Access with your GitHub account to your favorite records
        </p>
        <Button className="sign-in__button" actionOnClick={() => {}}>
          Sign in
        </Button>
      </div>
    </section>
  );
};

export default HomePage;
