import { render, screen } from "@testing-library/react";
import RecordsListPage from "./RecordsListPage";
import { setupStore } from "../../store";
import { recordsMock } from "../../mocks/recordsMock";
import { Provider } from "react-redux";

describe("Given a RecordsListPage page", () => {
  vi.mock("react", () => ({ useEffect: vi.fn() }));

  describe("When it is rendered and has records", () => {
    test("Then it should show a heading 'Records'", () => {
      const expectedTitle = "Records";
      const store = setupStore({ recordsState: { records: recordsMock } });

      render(
        <Provider store={store}>
          <RecordsListPage />
        </Provider>,
      );

      const heading = screen.getByRole("heading", { name: expectedTitle });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When it is rendered and doesn't have records", () => {
    test("Then it should show a heading 'Add your first record'", () => {
      const expectedHeading = "Add your first record";
      const store = setupStore({ recordsState: { records: [] } });

      render(
        <Provider store={store}>
          <RecordsListPage />
        </Provider>,
      );

      const heading = screen.getByRole("heading", { name: expectedHeading });

      expect(heading).toBeInTheDocument();
    });
  });
});
