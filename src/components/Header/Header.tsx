import React from "react";
import "./Header.scss";

const Header = (): React.ReactElement => {
  return (
    <header className="header">
      <h1 className="header__title">Drocer</h1>
      <img
        src="./images/drocer_logo.svg"
        alt="Drocer's app logo"
        className="header__logo"
        width="37"
        height="26"
      />
    </header>
  );
};

export default Header;
