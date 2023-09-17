import { renderHook } from "@testing-library/react";
import { User } from "firebase/auth";
import { PropsWithChildren } from "react";
import authHook, {
  AuthStateHook,
  IdTokenHook,
} from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import { errorHandlers } from "../../mocks/handlers";
import {
  recordIdMock,
  recordsMock,
  wrongIdMock,
} from "../../mocks/recordsMock";
import { server } from "../../mocks/server";
import { setupStore } from "../../store";
import { Record } from "../../types";
import useRecordsApi from "../useRecordsApi";

describe("Given an modifyRecord  function", () => {
  describe("When it's called with an id and a update value rating : 5", () => {
    const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
      const store = setupStore({ recordsState: { records: recordsMock } });

      return <Provider store={store}>{children}</Provider>;
    };
    const recordToUpdate: Partial<Record> = { rating: 5 };
    const user: Partial<User> = {
      getIdToken: vi.fn().mockResolvedValue({}),
    };

    const idTokenHook: Partial<IdTokenHook> = [user as User];
    const authStateHookMock: Partial<AuthStateHook> = [user as User];

    authHook.useIdToken = vi.fn().mockReturnValue(idTokenHook);
    authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

    test("Then it should return a record 'LP1' with the property rating 5", async () => {
      const {
        result: {
          current: { modifyRecord },
        },
      } = renderHook(() => useRecordsApi(), { wrapper });

      const updatedRecord = await modifyRecord(recordIdMock, recordToUpdate);

      expect(updatedRecord).toStrictEqual({ ...updatedRecord, rating: 5 });
    });

    test("Then it should throw an error 'Failed to modify record' when rejecting", () => {
      const expectedError = new Error("Failed to modify record");
      server.resetHandlers(...errorHandlers);

      const {
        result: {
          current: { modifyRecord },
        },
      } = renderHook(() => useRecordsApi(), { wrapper });

      const recordsPromise = modifyRecord(wrongIdMock, recordToUpdate);

      expect(recordsPromise).rejects.toThrowError(expectedError);
    });
  });
});
