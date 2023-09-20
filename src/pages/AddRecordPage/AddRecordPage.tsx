import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewRecordForm from "../../components/NewRecordForm/NewRecordForm";
import useRecordsApi from "../../hooks/useRecordsApi";
import { paths } from "../../routers/paths";
import { addRecordActionCreator } from "../../store/records/recordsSlice";
import { Record } from "../../types";
import "./AddRecordPage.scss";

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
    <>
      <Helmet>
        <title>Drocer - Add record</title>
        <meta
          name="description"
          content="Add your favorite records in Drocer to always have your top artists with you"
        />
      </Helmet>
      <div className="add-record">
        <h1 className="add-record__title">Add a new record</h1>
        <NewRecordForm actionOnSubmit={actionOnSubmit} />
      </div>
    </>
  );
};

export default AddRecordPage;
