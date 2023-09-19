import { renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { recordIdMock, recordsMock } from "../../mocks/recordsMock";
import { setupStore } from "../../store";
import useRecordsApi from "../useRecordsApi";
import { Record } from "../../types";

describe("Given a modifyRecord function", () => {
  describe("When it's called and there's no user", () => {
    test("Then it should throw an error 'Failed to modify record' when rejecting", async () => {
      const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
        const store = setupStore({ recordsState: { records: recordsMock } });

        return <Provider store={store}>{children}</Provider>;
      };

      const expectedError = new Error("Failed to modify record");
      const recordIdToModify = recordIdMock;
      const updateData: Partial<Record> = {};

      const {
        result: {
          current: { modifyRecord },
        },
      } = renderHook(() => useRecordsApi(), { wrapper });

      const promise = modifyRecord(recordIdToModify, updateData);

      expect(promise).rejects.toThrowError(expectedError);
    });
  });
});
