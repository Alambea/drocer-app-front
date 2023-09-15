import { renderHook } from "@testing-library/react";
import useRecordsApi from "../useRecordsApi";
import { Provider } from "react-redux";
import { PropsWithChildren } from "react";
import { recordToAddMock, recordsMock } from "../../mocks/recordsMock";
import { setupStore } from "../../store";

describe("Given a addRecord function", () => {
  describe("When it's called and there's no user", () => {
    const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
      const store = setupStore({ recordsState: { records: recordsMock } });

      return <Provider store={store}>{children}</Provider>;
    };

    test("Then it should throw an error 'Failed to add record' when rejecting", async () => {
      const expectedError = new Error("Failed to add record");

      const {
        result: {
          current: { addRecord },
        },
      } = renderHook(() => useRecordsApi(), { wrapper });

      const promise = addRecord(recordToAddMock);

      expect(promise).rejects.toThrowError(expectedError);
    });
  });
});
