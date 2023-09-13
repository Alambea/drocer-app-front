import { renderHook } from "@testing-library/react";
import useRecordsApi from "../useRecordsApi";
import { Provider } from "react-redux";
import { PropsWithChildren } from "react";
import { recordIdMock, recordsMock } from "../../mocks/recordsMock";
import { setupStore } from "../../store";

describe("Given a deleteRecord function", () => {
  describe("When it's called and there's no user", () => {
    const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
      const store = setupStore({ recordsState: { records: recordsMock } });

      return <Provider store={store}>{children}</Provider>;
    };

    test("Then it should throw an error 'Couldn't load records' when rejecting", async () => {
      const expectedError = new Error("Couldn't delete record");
      const idRecordToDelete = recordIdMock;

      const {
        result: {
          current: { deleteRecord },
        },
      } = renderHook(() => useRecordsApi(), { wrapper });

      const promise = deleteRecord(idRecordToDelete);

      expect(promise).rejects.toThrowError(expectedError);
    });
  });
});
