import { useEffect } from "react";
import "./RecordsListPage.scss";
import { useAppDispatch, useAppSelector } from "../../store";
import { recordsData } from "../../data/recordData";
import { loadRecordsActionCreator } from "../../store/records/recordsSlice";
import RecordsList from "../../components/RecordList/RecordsList";
import NoRecordsInformation from "../../components/NoRecordsInformation/NoRecordsInformation";

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
          <RecordsList />
        </>
      ) : (
        <NoRecordsInformation />
      )}
    </>
  );
};

export default RecordsListPage;
