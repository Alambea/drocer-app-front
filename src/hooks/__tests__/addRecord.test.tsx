import { renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { errorHandlers } from "../../mocks/handlers";
import {
  recordMock,
  fkaRecordMock,
  recordsMock,
} from "../../mocks/recordsMock";
import { server } from "../../mocks/server";
import useRecordsApi from "../useRecordsApi";
import { User } from "firebase/auth";
import authHook, {
  AuthStateHook,
  IdTokenHook,
} from "react-firebase-hooks/auth";
import { setupStore } from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import * as utils from "../../utils/showFeedback";

describe("Given an addRecord  function", () => {
  const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
    const store = setupStore({
      recordsState: { records: recordsMock, recordCount: recordsMock.length },
    });

    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  };
  describe("When it's called", () => {
    test("Then it should post a record 'LP1' when resolving successfully", async () => {
      const user: Partial<User> = {
        getIdToken: vi.fn().mockResolvedValue(null),
      };

      const idTokenHook: Partial<IdTokenHook> = [user as User];
      const authStateHookMock: Partial<AuthStateHook> = [user as User];

      authHook.useIdToken = vi.fn().mockReturnValue(idTokenHook);
      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const {
        result: {
          current: { addRecord },
        },
      } = renderHook(() => useRecordsApi(), { wrapper });

      const newRecordCreated = await addRecord(fkaRecordMock);

      expect(recordMock).toStrictEqual(newRecordCreated);
    });
  });

  describe("When it's called and there's an error on posting the record", () => {
    test("Then it should call the function showFeedback with 'Couldn't add record' and 'error'", async () => {
      server.resetHandlers(...errorHandlers);

      const expectedErrorMessage = "Couldn't add record";
      const expectedErrorType = "error";

      const spyShowFeedback = vitest.spyOn(utils, "showFeedback");

      const user: Partial<User> = {
        getIdToken: vi.fn().mockResolvedValue("token"),
      };

      const idTokenHook: Partial<IdTokenHook> = [user as User];
      const authStateHookMock: Partial<AuthStateHook> = [user as User];

      authHook.useIdToken = vi.fn().mockReturnValue(idTokenHook);
      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const {
        result: {
          current: { addRecord },
        },
      } = renderHook(() => useRecordsApi(), { wrapper });

      server.resetHandlers(...errorHandlers);

      await addRecord(fkaRecordMock);

      expect(spyShowFeedback).toHaveBeenCalledWith(
        expectedErrorMessage,
        expectedErrorType,
      );
    });
  });
});
