import React from "react";
import { Link } from "react-router-dom";
import { paths } from "../../routers/paths";
import "./Header.scss";

const Header = (): React.ReactElement => {
  return (
    <header className="header">
      <Link to={paths.home}>
        <h1 className="header__title">Drocer</h1>
      </Link>
      <Link to={paths.home}>
        <img
          src="./images/drocer_logo.svg"
          alt="Drocer's app logo"
          className="header__logo"
          width="37"
          height="26"
        />
      </Link>
    </header>
  );
};

export default Header;
