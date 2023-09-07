import React from "react";
import "./AddFirstRecord.scss";

const AddFirstRecord = (): React.ReactElement => {
  return (
    <>
      <article className="add-first-record">
        <img
          src="./images/drocer_logo.svg"
          alt="Drocer's app logo"
          className="add-first-record__logo"
          width="165"
          height="114"
        />
        <h2 className="add-first-record__title">Add your first record</h2>
      </article>
    </>
  );
};

export default AddFirstRecord;
