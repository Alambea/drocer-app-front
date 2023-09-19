import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { recordMock, recordsMock } from "../../mocks/recordsMock";
import { paths } from "../../routers/paths";
import { setupStore } from "../../store";
import RecordDetailPage from "./RecordDetailPage";
import { User } from "firebase/auth";
import authHook, {
  AuthStateHook,
  IdTokenHook,
} from "react-firebase-hooks/auth";

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
            />
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
            />
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
            />
          </Routes>
        </MemoryRouter>,
      );

      const heading = await screen.findByRole("heading", {
        name: expectedHeading,
      });

      expect(heading).toBeInTheDocument();
    });

    describe("And the user clicks on 'LP1' third button rating", () => {
      test("Then it should have an alt name 'Solid star 3'", async () => {
        const buttonAlt = /star/i;
        const rating = 3;
        const expectedButtonNumber = /Solid star number 3/i;

        const user: Partial<User> = {
          getIdToken: vi.fn().mockResolvedValue("token"),
        };

        const idTokenHookMock: Partial<IdTokenHook> = [user as User];
        authHook.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);

        const authStateHookMock: Partial<AuthStateHook> = [user as User];
        authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

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
              />
            </Routes>
          </MemoryRouter>,
        );

        const buttons = await screen.findAllByAltText(buttonAlt);
        const button = buttons[rating - 1];

        await userEvent.click(button);

        expect(button).toHaveAccessibleName(expectedButtonNumber);
      });
    });
  });
});
