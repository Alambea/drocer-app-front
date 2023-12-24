import { RecordApi, Record } from "../types";

const apiRecordToRecord = (apiRecord: RecordApi): Record => {
  const record: Record & { _id?: string } = {
    ...apiRecord,
    id: apiRecord._id,
  };

  delete record._id;

  return record;
};

export default apiRecordToRecord;
