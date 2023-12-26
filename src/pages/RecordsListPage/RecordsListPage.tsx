import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet";
import ExtraInformation from "../../components/ExtraInformation/ExtraInformation";
import RecordsList from "../../components/RecordList/RecordsList";
import { auth } from "../../firebase";
import useRecordsApi from "../../hooks/useRecordsApi";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadRecordsActionCreator } from "../../store/records/recordsSlice";
import { preloadImage } from "../../utils/preloadImage";
import "./RecordsListPage.scss";

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

        if (records && records.length > 0) {
          dispatch(loadRecordsActionCreator(records));

          preloadImage(records[0].cover);
        }
      })();
    }
  }, [dispatch, getRecords, user]);

  return (
    <>
      <Helmet>
        <title>Drocer - Records</title>
        <meta name="description" content="List of all your records" />
      </Helmet>
      {hasRecords
        ? !isLoadingAuth && (
            <>
              <h1 className="records-page__title">Records</h1>
              <RecordsList />
            </>
          )
        : !isLoadingUi &&
          !isLoadingAuth && (
            <ExtraInformation text="Add your first record">
              <img
                src="/images/empty_records.svg"
                alt="Empty record"
                width="165"
                height="114"
              />
            </ExtraInformation>
          )}
    </>
  );
};

export default RecordsListPage;
