import { render, screen } from "@testing-library/react";
import RecordsListPage from "./RecordsListPage";
import { setupStore } from "../../store";
import { recordsMock } from "../../mocks/recordsMock";
import { Provider } from "react-redux";

describe("Given a RecordsListPage page", () => {
  describe("When it is rendered", () => {
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
});
