import { useAppSelector } from "../../store";
import RecordCard from "../RecordCard/RecordCard";
import "./RecordList.scss";

const RecordsList = (): React.ReactElement => {
  const records = useAppSelector((state) => state.recordsState.records);

  return (
    <ul className="records">
      {records.map((record, recordPosition) => (
        <li key={record.id} className="records__record">
          <RecordCard record={record} recordPosition={recordPosition} />
        </li>
      ))}
    </ul>
  );
};

export default RecordsList;
