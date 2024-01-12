import { recordIdMock, recordsMock } from "../../../mocks/recordsMock";
import { deleteRecordActionCreator, recordsReducer } from "../recordsSlice";
import { RecordsState } from "../types";

describe("Given a recordsReducer reducer", () => {
  describe("When it receives a deleteRecord action with an id 1", () => {
    test(`Then it should return a state without the received record with an id ${recordIdMock}`, () => {
      const currentRecordState: RecordsState = {
        records: recordsMock,
        recordCount: recordsMock.length,
      };
      const recordToDeleteId = recordIdMock;

      const deleteRecordAction = deleteRecordActionCreator(recordToDeleteId);
      const newRecordsState = recordsReducer(
        currentRecordState,
        deleteRecordAction,
      );
      const recordToDelete = currentRecordState.records.find(
        ({ id }) => id === recordToDeleteId,
      );

      expect(newRecordsState).not.toContain(recordToDelete);
    });
  });
});
