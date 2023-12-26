import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase";
import useRecordsApi from "../../hooks/useRecordsApi";
import { useAppSelector } from "../../store";
import { loadSelectedRecordActionCreator } from "../../store/records/recordsSlice";
import "./ModifyRecordPage.scss";

const ModifyRecordPage = (): React.ReactElement => {
  const record = useAppSelector((state) => state.recordsState.selectedRecord);
  const isLoadingUi = useAppSelector((state) => state.uiState.isLoading);
  const [user, isLoadingAuth] = useAuthState(auth);
  const { getRecordById } = useRecordsApi();
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

  return !isLoadingAuth && !isLoadingUi && record ? (
    <>
      <Helmet>
        <title>Drocer - Modify {`${record?.record}`} record</title>
        <meta
          name="description"
          content=" Modify your favorite records in Drocer to always have updated your top artists' records"
        />
      </Helmet>
      <div className="modify-record">
        <h1 className="modify-record__title">
          Modify {`${record.artist}'s ${record.record}`} record
        </h1>
      </div>
    </>
  ) : (
    <></>
  );
};

export default ModifyRecordPage;
