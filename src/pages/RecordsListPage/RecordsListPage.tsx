import { Suspense, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { recordsData } from "../../data/recordData";
import { loadRecordsActionCreator } from "../../store/records/recordsSlice";
import {
  LazyNoRecordsInformation,
  LazyRecordsList,
} from "../../routers/lazyComponents";
import "./RecordsListPage.scss";

const RecordsListPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const records = useAppSelector((state) => state.recordsState.records);

  const hasRecords = records.length > 0;

  useEffect(() => {
    const records = recordsData;
    dispatch(loadRecordsActionCreator(records));
  }, [dispatch]);

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
