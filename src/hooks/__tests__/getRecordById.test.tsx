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

describe("Given a getRecordById function", () => {
  const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
    const store = setupStore({ recordsState: { records: recordsMock } });

    return <Provider store={store}>{children}</Provider>;
  };

  describe(`When it is called with an id ${recordIdMock}`, () => {
    test(`Then it should return a message 'Record retrieved successfully' when resolving successfully`, async () => {
      const idToGet = recordIdMock;
      const expectedRecord = recordsMock[0];

      const user: Partial<User> = {
        getIdToken: vi.fn(),
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
    test("Then it should throw an error 'Couldn't retrieve record' when rejecting", () => {
      server.resetHandlers(...errorHandlers);

      const expectedError = new Error("Failed to retrieve record");
      const idToGet = wrongIdMock;

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

      const messagePromise = getRecordById(idToGet);

      expect(messagePromise).rejects.toThrowError(expectedError);
    });
  });
});
