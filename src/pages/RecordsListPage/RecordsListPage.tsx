import { Suspense, useEffect, lazy } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { recordsData } from "../../data/recordData";
import { loadRecordsActionCreator } from "../../store/records/recordsSlice";
import { RecordsListPreview } from "../../components/RecordList/RecordsList";
import { NoRecordsInformationPreview } from "../../components/NoRecordsInformation/NoRecordsInformation";
import "./RecordsListPage.scss";

export const RecordsListPagePreview = lazy(() => import("./RecordsListPage"));

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
            <RecordsListPreview />
          </Suspense>
        </>
      ) : (
        <Suspense>
          <NoRecordsInformationPreview />
        </Suspense>
      )}
    </>
  );
};

export default RecordsListPage;
