import { renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { errorHandlers } from "../../mocks/handlers";
import {
  recordMock,
  recordToAddMock,
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

describe("Given an addRecord  function", () => {
  const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
    const store = setupStore({ recordsState: { records: recordsMock } });

    return <Provider store={store}>{children}</Provider>;
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

      const newRecordCreated = await addRecord(recordToAddMock);

      expect(newRecordCreated).toContain(recordMock);
    });
  });

  describe("When it's called and there's an error on posting the record", () => {
    test("Then it should throw an error 'Failed to add record' when rejecting", () => {
      server.resetHandlers(...errorHandlers);
      const expectedError = new Error("Failed to add record");
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

      const recordsPromise = addRecord(recordToAddMock);

      expect(recordsPromise).rejects.toThrowError(expectedError);
    });
  });
});
