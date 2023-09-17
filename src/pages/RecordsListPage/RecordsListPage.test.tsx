import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import React from "react";
import { Auth, User } from "firebase/auth";
import RecordsListPage from "./RecordsListPage";
import { setupStore } from "../../store";
import { recordIdMock, recordsMock } from "../../mocks/recordsMock";
import authHook from "react-firebase-hooks/auth";
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
      const store = setupStore({ recordsState: { records: recordsMock } });

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

  describe("When it is rendered and doesn't have records", () => {
    test("Then it should show a heading 'Add your first record'", async () => {
      const expectedHeading = "Add your first record";
      const store = setupStore({ recordsState: { records: [] } });

      render(
        <Provider store={store}>
          <React.Suspense>
            <RecordsListPage />
          </React.Suspense>
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
      const deleteButtonName = "Delete record";
      const recordToDelete = recordsMock.find(
        (record) => record.id === recordIdMock,
      )!;

      const user: Partial<User> = {
        getIdToken: vi.fn().mockResolvedValue("token"),
      };
      authHook.useIdToken = vi.fn().mockReturnValue([user]);

      const store = setupStore({ recordsState: { records: recordsMock } });

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
});
