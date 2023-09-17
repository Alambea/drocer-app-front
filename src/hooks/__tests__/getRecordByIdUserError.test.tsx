import { renderHook } from "@testing-library/react";
import useRecordsApi from "../useRecordsApi";
import { Provider } from "react-redux";
import { PropsWithChildren } from "react";
import { recordIdMock, recordsMock } from "../../mocks/recordsMock";
import { setupStore } from "../../store";

describe("Given a getRecordById function", () => {
  describe("When it's called and there's no user", () => {
    const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
      const store = setupStore({ recordsState: { records: recordsMock } });

      return <Provider store={store}>{children}</Provider>;
    };

    test("Then it should throw an error 'Failed to retrieve record' when rejecting", async () => {
      const expectedError = new Error("Failed to retrieve record");
      const idRecordToGet = recordIdMock;

      const {
        result: {
          current: { getRecordById },
        },
      } = renderHook(() => useRecordsApi(), { wrapper });

      const promise = getRecordById(idRecordToGet);

      expect(promise).rejects.toThrowError(expectedError);
    });
  });
});
