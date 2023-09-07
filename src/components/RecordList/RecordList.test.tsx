import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../../store";
import { recordsMock } from "../../mocks/recordsMock";
import { BrowserRouter } from "react-router-dom";
import RecordsList from "./RecordsList";

describe("Given a RecordList component", () => {
  describe("When it is rendered", () => {
    test("Then it should show an 'IRadiohead' and 'Portishead' heading", () => {
      const store = setupStore({ recordsState: { records: recordsMock } });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <RecordsList />
          </BrowserRouter>
        </Provider>,
      );

      recordsMock.forEach((record) => {
        const heading = screen.getByRole("heading", { name: record.artist });

        expect(heading).toBeInTheDocument();
      });
    });
  });
});
