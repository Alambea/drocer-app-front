import { useEffect } from "react";
import "./RecordsListPage.scss";
import { useAppDispatch } from "../../store";
import { recordsData } from "../../data/recordData";
import { loadRecordsActionCreator } from "../../store/records/recordsSlice";
import RecordsList from "../../components/RecordList/RecordsList";

const RecordsListPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const records = recordsData;

    dispatch(loadRecordsActionCreator(records));
  });

  return (
    <section className="records">
      <h2 className="records__title">Records</h2>
      <RecordsList />
    </section>
  );
};

export default RecordsListPage;
