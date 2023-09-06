import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "./App";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { paths } from "../../routers/paths";

vi.mock("firebase/auth");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Given an App component", () => {
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
          <App />
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
          <App />
        </BrowserRouter>,
      );
      const image = screen.getByAltText(expectedAltText);

      expect(image).toBeInTheDocument();
    });

    test("Then it should show two links with the text 'Add' and 'Records'", () => {
      const expectedAddText = /add/i;
      const expectedRecordsText = /records/i;

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

    describe("And the user clicks on the 'Sign in' button", () => {
      test("Then it should show a heading Records", async () => {
        const signInButtonText = "Sign in";
        const expectedHeading = "Records";

        render(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
        );
        screen;

        const button = screen.getByRole("button", {
          name: signInButtonText,
        });

        await waitFor(async () => {
          await userEvent.click(button);
        });

        const heading = await screen.findByRole("heading", {
          name: expectedHeading,
        });

        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe("When the user is logged, it renders the records page '/records' and clicks the logout button", () => {
    const user: Partial<User> = {};

    const authStateHookMock: Partial<AuthStateHook> = [
      user as User,
      false,
      new Error(""),
    ];

    test("Then it should show a heading 'Welcome'", async () => {
      const initialPath = paths.records;
      const buttonText = /logout/i;
      const expectedHeading = "Welcome";

      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[initialPath]}>
          <App />
        </MemoryRouter>,
      );

      const button = screen.getByRole("button", { name: buttonText });

      await waitFor(async () => {
        await userEvent.click(button);
      });

      const heading = await screen.findByRole("heading", {
        name: expectedHeading,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When it is rendered and the user isn't logged", () => {
    const authStateHookMock: Partial<AuthStateHook> = [
      undefined,
      false,
      new Error(""),
    ];

    test("Then it shouldn't show two links with the text 'Add' and 'Records'", () => {
      const expectedAddText = /add/i;
      const expectedRecordsText = /records/i;

      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const addLink = screen.queryByRole("link", {
        name: expectedAddText,
      });
      const recordsLink = screen.queryByRole("link", {
        name: expectedRecordsText,
      });

      expect(addLink).not.toBeInTheDocument();
      expect(recordsLink).not.toBeInTheDocument();
    });
  });
});
