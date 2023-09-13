import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { renderHook } from "@testing-library/react";
import authHook, {
  AuthStateHook,
  IdTokenHook,
} from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import { errorHandlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";
import useRecordsApi from "../useRecordsApi";
import { recordsMock } from "../../mocks/recordsMock";
import { setupStore } from "../../store";

describe("Given a getRecords function", () => {
  const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
    const store = setupStore({ recordsState: { records: recordsMock } });

    return <Provider store={store}>{children}</Provider>;
  };

  describe("When it is called", () => {
    test("Then it should return a list of records when resolving successfully", async () => {
      const user: Partial<User> = {
        getIdToken: vi.fn().mockResolvedValue(null),
      };
      const idTokenHook: Partial<IdTokenHook> = [user as User];

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      authHook.useIdToken = vi.fn().mockReturnValue(idTokenHook);
      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const {
        result: {
          current: { getRecords },
        },
      } = renderHook(() => useRecordsApi(), { wrapper });

      const records = await getRecords();

      expect(records).toStrictEqual(recordsMock);
    });
  });

  describe("When it's called and there's an error on receiving the records", () => {
    test("Then it should throw an error 'Couldn't load records' when rejecting", () => {
      const expectedError = new Error("Couldn't load records");
      const user: Partial<User> = {
        getIdToken: vi.fn().mockResolvedValue("token"),
      };
      const idTokenHook: Partial<IdTokenHook> = [user as User];

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      authHook.useIdToken = vi.fn().mockReturnValue(idTokenHook);
      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const {
        result: {
          current: { getRecords },
        },
      } = renderHook(() => useRecordsApi(), { wrapper });

      server.resetHandlers(...errorHandlers);

      const recordsPromise = getRecords();

      expect(recordsPromise).rejects.toThrowError(expectedError);
    });
  });
});
