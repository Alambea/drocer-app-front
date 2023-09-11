import { useAppSelector } from "../../store";
import RecordCard from "../RecordCard/RecordCard";
import { lazy } from "react";
import "./RecordList.scss";

export const RecordsListPreview = lazy(() => import("./RecordsList"));

const RecordsList = (): React.ReactElement => {
  const records = useAppSelector((state) => state.recordsState.records);

  return (
    <ul className="records">
      {records.map((record) => (
        <li key={record.id} className="records__record">
          <RecordCard record={record} />
        </li>
      ))}
    </ul>
  );
};

export default RecordsList;
