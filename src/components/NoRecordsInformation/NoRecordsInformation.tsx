import React, { lazy } from "react";
import "./NoRecordsInformation.scss";

export const NoRecordsInformationPreview = lazy(
  () => import("./NoRecordsInformation"),
);

const NoRecordsInformation = (): React.ReactElement => {
  return (
    <div className="no-records-information">
      <img
        src="./images/drocer_logo.svg"
        alt="Drocer's app logo"
        className="no-records-information__logo"
        width="165"
        height="114"
        loading="eager"
      />
      <h2 className="no-records-information__title">Add your first record</h2>
    </div>
  );
};

export default NoRecordsInformation;
