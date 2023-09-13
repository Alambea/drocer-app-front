import React from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routers/paths";

const NotFoundPage = (): React.ReactElement => {
  const navigate = useNavigate();

  const redirectList = () => {
    navigate(paths.records);
  };

  return (
    <div className="page-not-found">
      <h2 className="page-not-found__title">404 Page Not Found</h2>
      <p className="page-not-found__text">Oops, this page doesn’t exist </p>
      <Button className="page-not-found__button" actionOnClick={redirectList}>
        Back to list
      </Button>
    </div>
  );
};

export default NotFoundPage;
