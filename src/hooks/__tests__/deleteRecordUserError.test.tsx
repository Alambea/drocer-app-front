import { renderHook } from "@testing-library/react";
import useRecordsApi from "../useRecordsApi";
import { Provider } from "react-redux";
import { PropsWithChildren } from "react";
import { recordIdMock, recordsMock } from "../../mocks/recordsMock";
import { setupStore } from "../../store";
import { BrowserRouter } from "react-router-dom";
import * as utils from "../../utils/showFeedback";

describe("Given a deleteRecord function", () => {
  describe("When it's called and there's no user", () => {
    const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
      const store = setupStore({ recordsState: { records: recordsMock } });

      return (
        <BrowserRouter>
          <Provider store={store}>{children}</Provider>
        </BrowserRouter>
      );
    };

    test("Then it should call the function showFeedback with 'Failed to delete record' and 'error'", async () => {
      const expectedErrorMessage = "Failed to delete record";
      const expectedFeedbackType = "error";
      const idRecordToDelete = recordIdMock;

      const spyShowFeedback = vitest.spyOn(utils, "showFeedback");

      const {
        result: {
          current: { deleteRecord },
        },
      } = renderHook(() => useRecordsApi(), { wrapper });

      await deleteRecord(idRecordToDelete);

      expect(spyShowFeedback).toHaveBeenCalledWith(
        expectedErrorMessage,
        expectedFeedbackType,
      );
    });
  });
});
