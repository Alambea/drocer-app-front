import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { User } from "firebase/auth/cordova";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";

describe("Given an App component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a heading 'Drocer'", () => {
      const expectedHeading = "Drocer";

      render(
        <BrowserRouter>
          <App></App>
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", {
        level: 1,
        name: expectedHeading,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show an image with an alternative text 'Drocer's app logo'", () => {
      const expectedAltText = "Drocer's app logo";

      render(
        <BrowserRouter>
          <App></App>
        </BrowserRouter>,
      );
      const image = screen.getByAltText(expectedAltText);

      expect(image).toBeInTheDocument();
    });

    describe("And the user 'Ana' is logged", () => {
      test("Then it should show two links with the text 'Add' and 'Records'", () => {
        const expectedAddText = /add/i;
        const expectedRecordsText = /records/i;
        const user: Partial<User> = { displayName: "Ana" };

        const authStateHookMock: Partial<AuthStateHook> = [
          user as User,
          false,
          new Error(""),
        ];

        auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
        render(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
        );

        const addLink = screen.getByRole("link", { name: expectedAddText });
        const recordsLink = screen.getByRole("link", {
          name: expectedRecordsText,
        });

        expect(addLink).toBeInTheDocument();
        expect(recordsLink).toBeInTheDocument();
      });
    });
  });
});
