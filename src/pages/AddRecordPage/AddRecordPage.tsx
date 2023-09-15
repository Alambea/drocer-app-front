import { useDispatch } from "react-redux";
import NewRecordForm from "../../components/NewRecordForm/NewRecordForm";

import "./AddRecordPage.scss";
import useRecordsApi from "../../hooks/useRecordsApi";
import { Record } from "../../types";
import { addRecordActionCreator } from "../../store/records/recordsSlice";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routers/paths";

const AddRecordPage = (): React.ReactElement => {
  const { addRecord } = useRecordsApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const actionOnSubmit = async (newRecordToAdd: Omit<Record, "id">) => {
    const newRecord = await addRecord(newRecordToAdd);

    dispatch(addRecordActionCreator(newRecord));
    navigate(paths.records);
  };

  return (
    <div className="add-record">
      <h1 className="add-record__title">Add a new record</h1>
      <NewRecordForm actionOnSubmit={actionOnSubmit} />
    </div>
  );
};

export default AddRecordPage;
