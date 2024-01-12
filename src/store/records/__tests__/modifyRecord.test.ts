import { recordsMock } from "../../../mocks/recordsMock";
import { Record } from "../../../types";
import { modifyRecordActionCreator, recordsReducer } from "../recordsSlice";
import { RecordsState } from "../types";

describe("Given a recordsSlice reducer", () => {
  describe("When it receives a modifyRecord function with for records and a modified one", () => {
    test("Then it should return a new state with the rating property from de modified record updated", () => {
      const currentRecordsState: RecordsState = {
        records: recordsMock,
        recordCount: recordsMock.length,
      };
      const modifiedRecord: Record = { ...recordsMock[0], rating: 3 };

      const modifiedBugAction = modifyRecordActionCreator(modifiedRecord);
      const newRecordsState = recordsReducer(
        currentRecordsState,
        modifiedBugAction,
      );

      expect(newRecordsState.records[0]).toStrictEqual(modifiedRecord);
    });
  });
});
