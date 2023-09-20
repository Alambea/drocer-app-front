import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadRecordsActionCreator } from "../../store/records/recordsSlice";
import useRecordsApi from "../../hooks/useRecordsApi";
import { auth } from "../../firebase";
import RecordsList from "../../components/RecordList/RecordsList";
import NoRecordsInformation from "../../components/NoRecordsInformation/NoRecordsInformation";
import "./RecordsListPage.scss";
import { preloadImage } from "../../utils/preloadImage";

const RecordsListPage = (): React.ReactElement => {
  const [user, isLoadingAuth] = useAuthState(auth);
  const isLoadingUi = useAppSelector((state) => state.uiState.isLoading);

  const records = useAppSelector((state) => state.recordsState.records);
  const { getRecords } = useRecordsApi();
  const dispatch = useAppDispatch();

  const hasRecords = records.length > 0;

  useEffect(() => {
    if (user) {
      (async () => {
        const records = await getRecords();

        dispatch(loadRecordsActionCreator(records));

        preloadImage(records[0].cover);
      })();
    }
  }, [dispatch, getRecords, user]);

  return (
    <>
      {hasRecords
        ? !isLoadingAuth && (
            <>
              <h1 className="records-page__title">Records</h1>
              <RecordsList />
            </>
          )
        : !isLoadingUi && !isLoadingAuth && <NoRecordsInformation />}
    </>
  );
};

export default RecordsListPage;
