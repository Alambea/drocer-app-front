import { renderHook } from "@testing-library/react";
import { errorHandlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";
import useRecordsApi from "../useRecordsApi";
import { recordsMock } from "../../mocks/recordsMock";
import authHook, {
  AuthStateHook,
  IdTokenHook,
} from "react-firebase-hooks/auth";
import { User } from "firebase/auth";

const user: Partial<User> = { getIdToken: vi.fn().mockResolvedValue("token") };
const idTokenHook: Partial<IdTokenHook> = [user as User];

const authStateHookMock: Partial<AuthStateHook> = [user as User];
authHook.useIdToken = vi.fn().mockReturnValue(idTokenHook);
authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

describe("Given a getRecords function", () => {
  const {
    result: {
      current: { getRecords },
    },
  } = renderHook(() => useRecordsApi());

  describe("When it is called", () => {
    test("Then it should return a list of records when resolving successfully", async () => {
      const records = await getRecords();

      expect(records).toStrictEqual(recordsMock);
    });
  });

  test("Then it should throw an error 'Couldn't load records' when rejecting", () => {
    server.resetHandlers(...errorHandlers);
    const expectedError = new Error("Couldn't load records");

    const recordsPromise = getRecords();

    expect(recordsPromise).rejects.toThrowError(expectedError);
  });
});
