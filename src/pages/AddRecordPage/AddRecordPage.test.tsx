import { Provider } from "react-redux";
import { setupStore } from "../../store";
import { render, screen } from "@testing-library/react";
import React from "react";
import AddRecordPage from "./AddRecordPage";
import { recordsMock } from "../../mocks/recordsMock";

describe("Given a AddRecordPage page", () => {
  describe("When it's rendered", () => {
    test("Then it should show a heading 'Add a new record'", async () => {
      const expectedTitle = "Add a new record";
      const store = setupStore({ recordsState: { records: recordsMock } });

      render(
        <Provider store={store}>
          <React.Suspense>
            <AddRecordPage />
          </React.Suspense>
        </Provider>,
      );

      const heading = await screen.findByRole("heading", {
        name: expectedTitle,
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
