import React, { PropsWithChildren } from "react";
import { setupStore } from "../../store";
import { Provider } from "react-redux";
import {
  recordIdMock,
  recordsMock,
  wrongIdMock,
} from "../../mocks/recordsMock";
import { User } from "firebase/auth";
import authHook, {
  AuthStateHook,
  IdTokenHook,
} from "react-firebase-hooks/auth";
import { renderHook } from "@testing-library/react";
import useRecordsApi from "../useRecordsApi";
import { server } from "../../mocks/server";
import { errorHandlers } from "../../mocks/handlers";
import { BrowserRouter } from "react-router-dom";
import * as utils from "../../utils/showFeedback";

describe("Given a getRecordById function", () => {
  const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
    const store = setupStore({ recordsState: { records: recordsMock } });

    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  };

  describe(`When it is called with an id ${recordIdMock}`, () => {
    test(`Then it should return a message 'Record retrieved successfully' when resolving successfully`, async () => {
      const idToGet = recordIdMock;
      const expectedRecord = recordsMock[0];
      const user: Partial<User> = {
        getIdToken: vi.fn().mockResolvedValue("token"),
      };
      const idTokenHook: Partial<IdTokenHook> = [user as User];
      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      authHook.useIdToken = vi.fn().mockReturnValue(idTokenHook);
      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
      const {
        result: {
          current: { getRecordById },
        },
      } = renderHook(() => useRecordsApi(), { wrapper });
      const record = await getRecordById(idToGet);
      expect(record).toStrictEqual(expectedRecord);
    });
  });

  describe("When it's called and there's an error on retrieving the record", () => {
    test("Then it should call the function showFeedback with 'Couldn't retrieve record' and 'error'", async () => {
      server.resetHandlers(...errorHandlers);

      const expectedErrorMessage = "Couldn't retrieve record";
      const expectedErrorType = "error";
      const idToGet = wrongIdMock;

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
          current: { getRecordById },
        },
      } = renderHook(() => useRecordsApi(), { wrapper });

      server.resetHandlers(...errorHandlers);

      await getRecordById(idToGet);

      expect(spyShowFeedback).toHaveBeenCalledWith(
        expectedErrorMessage,
        expectedErrorType,
      );
    });
  });
});
