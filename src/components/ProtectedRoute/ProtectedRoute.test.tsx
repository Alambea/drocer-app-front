import { render, screen } from "@testing-library/react";
import { paths } from "../../routers/paths";
import { MemoryRouter } from "react-router-dom";
import App from "../App/App";
import authHook, { AuthStateHook } from "react-firebase-hooks/auth";
import { setupStore } from "../../store";
import { Provider } from "react-redux";

describe("Given a ProtectedRoute component", () => {
  describe("When the user isn't logged and try to enter to '/records' page", () => {
    test("Then it should redirect to /home and show a heading 'Welcome'", async () => {
      const initialPath = paths.records;
      const headingText = "Welcome";
      const store = setupStore({ recordsState: { records: [] } });

      const authStateHookMock: Partial<AuthStateHook> = [null];

      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={[initialPath]}>
            <App />
          </MemoryRouter>
        </Provider>,
      );

      const heading = await screen.findByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });
});
