import { Suspense, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadRecordsActionCreator } from "../../store/records/recordsSlice";
import useRecordsApi from "../../hooks/useRecordsApi";
import { auth } from "../../firebase";
import RecordsList from "../../components/RecordList/RecordsList";
import NoRecordsInformation from "../../components/NoRecordsInformation/NoRecordsInformation";
import "./RecordsListPage.scss";

const RecordsListPage = (): React.ReactElement => {
  const [user] = useAuthState(auth);
  const records = useAppSelector((state) => state.recordsState.records);
  const { getRecords } = useRecordsApi();
  const dispatch = useAppDispatch();

  const hasRecords = records.length > 0;

  useEffect(() => {
    if (user) {
      (async () => {
        const records = await getRecords();

        dispatch(loadRecordsActionCreator(records));
      })();
    }
  }, [dispatch, getRecords, user]);

  return (
    <>
      {hasRecords ? (
        <>
          <h1 className="records-page__title">Records</h1>
          <Suspense>
            <RecordsList />
          </Suspense>
        </>
      ) : (
        <Suspense>
          <NoRecordsInformation />
        </Suspense>
      )}
    </>
  );
};

export default RecordsListPage;
