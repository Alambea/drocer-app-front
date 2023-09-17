import { render, screen } from "@testing-library/react";
import RecordDetailPage from "./RecordDetailPage";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { paths } from "../../routers/paths";
import { recordMock, recordsMock } from "../../mocks/recordsMock";
import { setupStore } from "../../store";

describe("Given a RecordDetailPage page", () => {
  const path = `${paths.records}/${recordMock.id}`;
  const store = setupStore({
    recordsState: { records: [], selectedRecord: recordsMock[0] },
  });

  describe("When it's rendered", () => {
    test("Then it should show a heading 'Radiohead'", async () => {
      const expectedHeading = "Radiohead";

      render(
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route
              path={path}
              element={
                <Provider store={store}>
                  <RecordDetailPage />
                </Provider>
              }
            ></Route>
          </Routes>
        </MemoryRouter>,
      );

      const heading = await screen.findByRole("heading", {
        name: expectedHeading,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show an alternative text 'Radiohead's cover for In Rainbows'", async () => {
      const expectedAltText = `${recordsMock[0].artist}'s cover for ${recordsMock[0].record}`;

      render(
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route
              path={path}
              element={
                <Provider store={store}>
                  <RecordDetailPage />
                </Provider>
              }
            ></Route>
          </Routes>
        </MemoryRouter>,
      );

      const image = await screen.findByAltText(expectedAltText);

      expect(image).toBeInTheDocument();
    });

    test("Then it should show a heading 'Radiohead'", async () => {
      const expectedHeading = "Radiohead";

      render(
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route
              path={path}
              element={
                <Provider store={store}>
                  <RecordDetailPage />
                </Provider>
              }
            ></Route>
          </Routes>
        </MemoryRouter>,
      );

      const heading = await screen.findByRole("heading", {
        name: expectedHeading,
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
