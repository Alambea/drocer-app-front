import { renderHook } from "@testing-library/react";
import useRecordsApi from "../useRecordsApi";
import { Provider } from "react-redux";
import { PropsWithChildren } from "react";
import { recordsMock } from "../../mocks/recordsMock";
import { setupStore } from "../../store";

describe("Given a getRecords function", () => {
  describe("When it's called and there's no user", () => {
    const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
      const store = setupStore({ recordsState: { records: recordsMock } });

      return <Provider store={store}>{children}</Provider>;
    };

    test("Then it should throw an error 'Couldn't load records' when rejecting", async () => {
      const expectedError = new Error("Couldn't load records");

      const {
        result: {
          current: { getRecords },
        },
      } = renderHook(() => useRecordsApi(), { wrapper });

      const promise = getRecords();

      expect(promise).rejects.toThrowError(expectedError);
    });
  });
});
