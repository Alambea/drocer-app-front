import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import { store } from "../../store";
import Layout from "./Layout";

describe("Given an Layout component", () => {
  describe("When it is rendered and the user is logged", () => {
    const user: Partial<User> = {};

    const authStateHookMock: Partial<AuthStateHook> = [user as User];

    auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

    test("Then it should show a heading 'Drocer'", () => {
      const expectedHeading = "Drocer";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </Provider>,
      );

      const heading = screen.getByRole("heading", {
        level: 1,
        name: expectedHeading,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show two links with the text 'Add' and 'Records'", async () => {
      const expectedAddText = /add/i;
      const expectedRecordsText = /records/i;

      render(
        <Provider store={store}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </Provider>,
      );
      const addLink = await screen.findByRole("link", {
        name: expectedAddText,
      });
      const recordsLink = await screen.findByRole("link", {
        name: expectedRecordsText,
      });

      expect(addLink).toBeInTheDocument();
      expect(recordsLink).toBeInTheDocument();
    });
  });
});
