import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import React from "react";
import { Auth, User } from "firebase/auth";
import RecordsListPage from "./RecordsListPage";
import { setupStore } from "../../store";
import { recordIdMock, recordMock, recordsMock } from "../../mocks/recordsMock";
import authHook, {
  AuthStateHook,
  IdTokenHook,
} from "react-firebase-hooks/auth";
import { BrowserRouter } from "react-router-dom";

vi.mock("react", async () => {
  const actual: Auth = await vi.importActual("react");
  return {
    ...actual,
    useEffect: vi.fn(),
  };
});

describe("Given a RecordsListPage page", () => {
  describe("When it is rendered and has records", () => {
    test("Then it should show a heading 'Records'", async () => {
      const expectedTitle = "Records";
      const store = setupStore({
        recordsState: { records: recordsMock, recordCount: recordsMock.length },
      });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <React.Suspense>
              <RecordsListPage />
            </React.Suspense>
          </BrowserRouter>
        </Provider>,
      );

      const heading = await screen.findByRole("heading", {
        name: expectedTitle,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When it is rendered and doesn't have records on the current selection page but it has on the total count", () => {
    test("Then it should show a heading 'You don't have more records'", async () => {
      const expectedHeading = "You don't have more records";
      const store = setupStore({
        recordsState: { records: [], recordCount: 3 },
      });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <React.Suspense>
              <RecordsListPage />
            </React.Suspense>
          </BrowserRouter>
        </Provider>,
      );

      const heading = await screen.findByRole("heading", {
        name: expectedHeading,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When it's rendered, has records, and the user clicks on the 'In Rainbows' record delete button", () => {
    test("Then it shouldn't show the heading 'Radiohead'", async () => {
      const deleteButtonName = "Delete";
      const recordToDelete = recordsMock.find(
        (record) => record.id === recordIdMock,
      )!;

      const user: Partial<User> = {
        getIdToken: vi.fn().mockResolvedValue("token"),
      };
      authHook.useIdToken = vi.fn().mockReturnValue([user]);

      const store = setupStore({
        recordsState: { records: recordsMock, recordCount: 0 },
      });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <React.Suspense>
              <RecordsListPage />
            </React.Suspense>
          </BrowserRouter>
        </Provider>,
      );

      const recordHeading = await screen.findByRole("heading", {
        name: recordToDelete.artist,
      });

      const deleteButton = within(recordHeading.closest(".record")!).getByRole(
        "button",
        { name: deleteButtonName },
      );

      await userEvent.click(deleteButton);

      expect(recordHeading).not.toBeInTheDocument();
    });
  });

  describe("When it is rendered and the user clicks on 'LP1' third button rating", () => {
    test("Then it should have an alt name 'Solid star 3'", async () => {
      const buttonAlt = /star/i;
      const rating = 3;
      const recordHeading = "The Ocean";
      const expectedButtonNumber = /Solid star number 3/i;

      const store = setupStore({
        recordsState: {
          records: recordsMock,
          recordCount: 1,
          selectedRecord: recordMock,
        },
      });

      const user: Partial<User> = {
        getIdToken: vi.fn().mockResolvedValue("token"),
      };

      const idTokenHookMock: Partial<IdTokenHook> = [user as User];
      authHook.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <Provider store={store}>
          <BrowserRouter>
            <RecordsListPage />
          </BrowserRouter>
        </Provider>,
      );

      const heading = screen.getByRole("heading", { name: recordHeading });

      const buttonsPreClick = await within(
        heading.closest(".record")!,
      ).findAllByAltText(buttonAlt);
      const buttonPreClick = buttonsPreClick[rating - 1];

      await userEvent.click(buttonPreClick);

      const buttonsPostClick = await screen.findAllByAltText(buttonAlt);
      const button = buttonsPostClick[rating - 1];

      expect(button).toHaveAccessibleName(expectedButtonNumber);
    });
  });
});
