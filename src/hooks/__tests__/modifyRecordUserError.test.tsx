import { renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { recordIdMock, recordsMock } from "../../mocks/recordsMock";
import { setupStore } from "../../store";
import useRecordsApi from "../useRecordsApi";
import { Record } from "../../types";
import { BrowserRouter } from "react-router-dom";
import * as utils from "../../utils/showFeedback";

describe("Given a modifyRecord function", () => {
  describe("When it's called and there's no user", () => {
    test("Then it should call the function showFeedback with 'Failed to modify record' and 'error'", async () => {
      const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
        const store = setupStore({
          recordsState: {
            records: recordsMock,
            recordCount: recordsMock.length,
          },
        });

        return (
          <BrowserRouter>
            <Provider store={store}>{children}</Provider>
          </BrowserRouter>
        );
      };

      const expectedErrorMessage = "Failed to modify record";
      const expectedErrorType = "error";
      const recordIdToModify = recordIdMock;
      const updateData: Partial<Record> = {};

      const spyShowFeedback = vitest.spyOn(utils, "showFeedback");

      const {
        result: {
          current: { modifyRecord },
        },
      } = renderHook(() => useRecordsApi(), { wrapper });

      await modifyRecord(recordIdToModify, updateData);

      expect(spyShowFeedback).toHaveBeenCalledWith(
        expectedErrorMessage,
        expectedErrorType,
      );
    });
  });
});
