import { Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadRecordsActionCreator } from "../../store/records/recordsSlice";
import {
  LazyNoRecordsInformation,
  LazyRecordsList,
} from "../../routers/lazyComponents";
import "./RecordsListPage.scss";
import useRecordsApi from "../../hooks/useRecordsApi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

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
            <LazyRecordsList />
          </Suspense>
        </>
      ) : (
        <Suspense>
          <LazyNoRecordsInformation />
        </Suspense>
      )}
    </>
  );
};

export default RecordsListPage;
