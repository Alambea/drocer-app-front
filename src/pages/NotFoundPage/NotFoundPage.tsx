import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { paths } from "../../routers/paths";
import "./NotFoundPage.scss";

const NotFoundPage = (): React.ReactElement => {
  return (
    <>
      <Helmet>
        <title>Drocer - Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <div className="page-not-found">
        <h2 className="page-not-found__title">404 Page Not Found</h2>
        <p className="page-not-found__text">Oops, this page doesn’t exist </p>
        <Link className="page-not-found__link" to={paths.records}>
          Back to list
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
