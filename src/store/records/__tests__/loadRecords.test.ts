import { recordsMock } from "../../../mocks/recordsMock";
import { Record } from "../../../types";
import { loadRecordsActionCreator, recordsReducer } from "../recordsSlice";
import { RecordsState } from "../types";

describe("Given a recordsReducer reducer", () => {
  describe("When it receives a loadRecords action with 'In Rainbows' and 'Third' records", () => {
    test("Then it should return a new state with the received 'In Rainbows' and 'Third' records", () => {
      const currentRecordsState: RecordsState = {
        records: [],
      };
      const records: Record[] = recordsMock;

      const loadRecordsAction = loadRecordsActionCreator(records);
      const newRecordsState = recordsReducer(
        currentRecordsState,
        loadRecordsAction,
      );

      expect(newRecordsState).toHaveProperty("records", records);
    });
  });
});
