import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";

describe("Given an Layout component", () => {
  describe("When it is rendered and the user is logged", () => {
    const user: Partial<User> = {};

    const authStateHookMock: Partial<AuthStateHook> = [
      user as User,
      false,
      new Error(""),
    ];

    auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

    test("Then it should show a heading 'Drocer'", () => {
      const expectedHeading = "Drocer";

      render(
        <BrowserRouter>
          <Layout />
        </BrowserRouter>,
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
        <BrowserRouter>
          <Layout />
        </BrowserRouter>,
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
