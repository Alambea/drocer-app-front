import { useAppSelector } from "../../store";
import RecordCard from "../RecordCard/RecordCard";
import "./RecordList.scss";

const RecordsList = (): React.ReactElement => {
  const records = useAppSelector((state) => state.recordsState.records);

  return (
    <ul className="records">
      {records.map((record, recordPosition) => {
        const isLazy = recordPosition > 2;

        return (
          <li key={record.id} className="records__record">
            <RecordCard record={record} isLazy={isLazy} />
          </li>
        );
      })}
    </ul>
  );
};

export default RecordsList;
