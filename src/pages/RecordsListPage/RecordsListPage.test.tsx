import { render, screen } from "@testing-library/react";
import RecordsListPage from "./RecordsListPage";
import { setupStore } from "../../store";
import { recordsMock } from "../../mocks/recordsMock";
import { Provider } from "react-redux";
import React from "react";
import { Auth } from "firebase/auth";

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
          <React.Suspense>
            <RecordsListPage />
          </React.Suspense>
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
});
