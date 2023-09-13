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

describe("Given a deleteRecord function", () => {
  const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
    const store = setupStore({ recordsState: { records: recordsMock } });

    return <Provider store={store}>{children}</Provider>;
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
    test("Then it should throw an error 'Couldn't delete record' when rejecting", () => {
      const expectedError = new Error("Couldn't delete record");
      const idToDelete = wrongIdMock;

      const user: Partial<User> = {
        getIdToken: vi.fn().mockResolvedValue("token"),
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

      server.resetHandlers(...errorHandlers);

      const messagePromise = deleteRecord(idToDelete);

      expect(messagePromise).rejects.toThrowError(expectedError);
    });
  });
});
