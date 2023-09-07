import { useAppSelector } from "../../store";

const RecordsList = (): React.ReactElement => {
  const records = useAppSelector((state) => state.recordsState.records);

  return (
    <ul className="records">
      {records.map((record) => (
        <li key={record.id} className="records__record">
          <h3>{record.record}</h3>
        </li>
      ))}
    </ul>
  );
};

export default RecordsList;
