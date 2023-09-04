const Header = () => {
  return (
    <header className="header">
      <a href="/home">
        <h1 className="header__title">Drocer</h1>
      </a>
      <a href="/home">
        <img
          src="./images/drocer_logo.svg"
          alt="Drocer's app logo"
          className="header__logo"
          width="37"
          height="26"
        />
      </a>
    </header>
  );
};

export default Header;
