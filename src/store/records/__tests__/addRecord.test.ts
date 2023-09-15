import { recordMock, recordsMock } from "../../../mocks/recordsMock";
import { Record } from "../../../types";
import { addRecordActionCreator, recordsReducer } from "../recordsSlice";
import { RecordsState } from "../types";

describe("Given a recordsReducer reducer", () => {
  describe("When it receives an addRecord action with a currentState with an 'In Rainbows', 'Mezzanine', 'Heliocentric' and a 'Third', and a payload of an 'LP1'", () => {
    test("Then it should return a new state with a In Rainbows', 'Mezzanine', 'Heliocentric','Third' and a 'LP1'", () => {
      const currentRecordsState: RecordsState = {
        records: recordsMock,
      };
      const newRecord: Record = recordMock;

      const addRecordAction = addRecordActionCreator(newRecord);
      const newRecordsState = recordsReducer(
        currentRecordsState,
        addRecordAction,
      );

      expect(newRecordsState.records).toContain(newRecord);
      newRecordsState.records.forEach((record) => {
        expect(newRecordsState.records).toContain(record);
      });
    });
  });
});
