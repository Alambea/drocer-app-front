import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import React from "react";
import { setupStore } from "../../store";
import AddRecordPage from "./AddRecordPage";
import { recordsMock } from "../../mocks/recordsMock";
import { BrowserRouter } from "react-router-dom";

describe("Given a AddRecordPage page", () => {
  describe("When it's rendered", () => {
    test("Then it should show a heading 'Add a new record'", async () => {
      const expectedTitle = "Add a new record";

      const store = setupStore({ recordsState: { records: recordsMock } });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <React.Suspense>
              <AddRecordPage />
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
});
