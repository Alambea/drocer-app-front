import { PropsWithChildren } from "react";
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

describe("Given a deleteRecord function", () => {
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

  describe(`When it is called with an id ${recordIdMock}`, () => {
    test(`Then it should return a message 'Record deleted successfully' when resolving successfully`, async () => {
      const expectedMessage = "Record deleted successfully";
      const idToDelete = recordIdMock;

      const user: Partial<User> = {
        getIdToken: vi.fn(),
      };

      const idTokenHook: Partial<IdTokenHook> = [user as User];
      const authStateHookMock: Partial<AuthStateHook> = [user as User];

      authHook.useIdToken = vi.fn().mockReturnValue(idTokenHook);
      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const {
        result: {
          current: { deleteRecord },
        },
      } = renderHook(() => useRecordsApi(), { wrapper });

      const message = await deleteRecord(idToDelete);

      expect(message).toHaveProperty("message", expectedMessage);
    });
  });

  describe("When it's called and there's an error on deleting the record", () => {
    const idToDelete = wrongIdMock;

    const user: Partial<User> = {
      getIdToken: vi.fn().mockResolvedValue("token"),
    };

    const idTokenHook: Partial<IdTokenHook> = [user as User];
    const authStateHookMock: Partial<AuthStateHook> = [user as User];

    authHook.useIdToken = vi.fn().mockReturnValue(idTokenHook);
    authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

    test("Then it should call the function showFeedback with 'Couldn't delete record' and 'error'", async () => {
      server.resetHandlers(...errorHandlers);

      const expectedErrorMessage = "Couldn't delete record";
      const expectedErrorType = "error";

      const spyShowFeedback = vitest.spyOn(utils, "showFeedback");

      const {
        result: {
          current: { deleteRecord },
        },
      } = renderHook(() => useRecordsApi(), { wrapper });

      await deleteRecord(idToDelete);

      expect(spyShowFeedback).toHaveBeenCalledWith(
        expectedErrorMessage,
        expectedErrorType,
      );
    });
  });
});
