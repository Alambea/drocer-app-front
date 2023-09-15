import { recordMock, recordsMock } from "../../../mocks/recordsMock";
import { Record } from "../../../types";
import {
  loadSelectedRecordActionCreator,
  recordsReducer,
} from "../recordsSlice";
import { RecordsState } from "../types";

describe("Given a recordsReducer reducer", () => {
  describe("When it receives an loadSelectedRecord action with a 'LP1'", () => {
    test("Then it should return a new state with a record 'LP1'", () => {
      const currentRecordsState: RecordsState = {
        records: recordsMock,
      };
      const selectedRecord: Record = recordMock;

      const selectedRecordAction =
        loadSelectedRecordActionCreator(selectedRecord);
      const newRecordsState = recordsReducer(
        currentRecordsState,
        selectedRecordAction,
      );

      expect(newRecordsState.selectedRecord).toStrictEqual(selectedRecord);
    });
  });
});
