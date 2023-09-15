import NewRecordForm from "../../components/NewRecordForm/NewRecordForm";

import "./AddRecordPage.scss";

const AddRecordPage = (): React.ReactElement => {
  const actionOnSubmit = () => {};

  return (
    <div className="add-record">
      <h1 className="add-record__title">Add a new record</h1>
      <NewRecordForm actionOnSubmit={actionOnSubmit} />
    </div>
  );
};

export default AddRecordPage;
