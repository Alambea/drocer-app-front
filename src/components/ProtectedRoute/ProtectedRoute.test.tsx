import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import authHook, { AuthStateHook } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import App from "../App/App";
import { paths } from "../../routers/paths";
import { store } from "../../store";

describe("Given a ProtectedRoute component", () => {
  describe("When the user isn't logged and try to enter to '/records' page", () => {
    test("Then it should redirect to /home and show a heading 'Welcome'", async () => {
      const initialPath = paths.records;
      const headingText = "Welcome";

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
