import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { recordMock } from "../../mocks/recordsMock";
import { BrowserRouter, Params } from "react-router-dom";
import { setupStore } from "../../store";
import ModifyRecordPage from "./ModifyRecordPage";

describe("Given a ModifyRecordPage page", () => {
  const store = setupStore({
    recordsState: { records: [], selectedRecord: recordMock },
    uiState: { isLoading: false },
  });

  vi.mock("react-router-dom", async () => {
    const actual: Readonly<Params<string>> = await vi.importActual(
      "react-router-dom",
    );
    return {
      ...actual,
      useParams: vi.fn().mockReturnValue({ id: recordMock.id }),
    };
  });

  describe(`When it is rendered with a '${recordMock.artist}' ${recordMock.id} id`, () => {
    test(`Then it should show a 'Modify ${recordMock.artist}'s ${recordMock.record} record' heading`, async () => {
      const expectedHeading = `Modify ${recordMock.artist}'s ${recordMock.record} record`;

      render(
        <Provider store={store}>
          <BrowserRouter>
            <ModifyRecordPage />;
          </BrowserRouter>
        </Provider>,
      );

      const heading = await screen.findByRole("heading", {
        level: 1,
        name: expectedHeading,
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
