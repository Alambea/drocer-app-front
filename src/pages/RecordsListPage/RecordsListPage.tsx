import { useEffect } from "react";
import "./RecordsListPage.scss";
import { useAppDispatch, useAppSelector } from "../../store";
import { recordsData } from "../../data/recordData";
import { loadRecordsActionCreator } from "../../store/records/recordsSlice";
import RecordsList from "../../components/RecordList/RecordsList";
import AddFirstRecord from "../../components/AddFirstRecord/AddFirstRecord";

const RecordsListPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const records = useAppSelector((state) => state.recordsState.records);

  const hasRecords = records.length < 0;

  useEffect(() => {
    const records = recordsData;

    dispatch(loadRecordsActionCreator(records));
  });

  return (
    <section className="records-page">
      {hasRecords ? (
        <>
          <h2 className="records-page__title">Records</h2>
          <RecordsList />
        </>
      ) : (
        <AddFirstRecord />
      )}
    </section>
  );
};

export default RecordsListPage;
