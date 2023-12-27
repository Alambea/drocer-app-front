import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../firebase";
import useRecordsApi from "../../hooks/useRecordsApi";
import { useAppSelector } from "../../store";
import {
  loadSelectedRecordActionCreator,
  modifyRecordActionCreator,
} from "../../store/records/recordsSlice";
import RecordForm from "../../components/RecordForm/RecordForm";
import "./ModifyRecordPage.scss";
import { Record } from "../../types";
import { paths } from "../../routers/paths";

const ModifyRecordPage = (): React.ReactElement => {
  const record = useAppSelector((state) => state.recordsState.selectedRecord);
  const isLoadingUi = useAppSelector((state) => state.uiState.isLoading);
  const [user, isLoadingAuth] = useAuthState(auth);
  const { getRecordById, modifyRecord } = useRecordsApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (user && id) {
      (async () => {
        const selectedRecord = await getRecordById(id);

        if (selectedRecord) {
          dispatch(loadSelectedRecordActionCreator(selectedRecord));
        }
      })();
    }
  }, [dispatch, getRecordById, id, user]);

  scroll(0, 0);

  const actionOnSubmit = async (recordToModify: Record) => {
    const modifiedRecord = await modifyRecord(
      recordToModify.id,
      recordToModify,
    );

    if (modifiedRecord) {
      dispatch(modifyRecordActionCreator(modifiedRecord));
      navigate(paths.records);
      scroll(0, 0);
    }
  };

  return !isLoadingAuth && !isLoadingUi && record ? (
    <>
      <Helmet>
        <title>Drocer - Modify {`${record.record}`} record</title>
        <meta
          name="description"
          content=" Modify your favorite records in Drocer to always have updated your top artists' records"
        />
      </Helmet>
      <div className="modify-record">
        <h1 className="modify-record__title">
          Modify {`${record.artist}'s ${record.record}`} record
        </h1>
        <RecordForm actionOnSubmit={actionOnSubmit} recordToUpdate={record} />
      </div>
    </>
  ) : (
    <></>
  );
};

export default ModifyRecordPage;
