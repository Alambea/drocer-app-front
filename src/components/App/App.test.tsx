import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Auth, User, signInWithPopup, signOut } from "firebase/auth";
import authHook, {
  AuthStateHook,
  IdTokenHook,
} from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import App from "./App";
import { paths } from "../../routers/paths";
import { setupStore } from "../../store";
import { recordsMock } from "../../mocks/recordsMock";

beforeEach(() => {
  vi.clearAllMocks();
});

vi.mock("firebase/auth", async () => {
  const actual: Auth = await vi.importActual("firebase/auth");
  return {
    ...actual,
    signOut: vi.fn(),
    signInWithPopup: vi.fn(),
  };
});

describe("Given an App component", () => {
  const store = setupStore({ recordsState: { records: recordsMock } });

  describe("When it is rendered and the user is logged", () => {
    test("Then it should show a heading 'Drocer'", () => {
      const expectedHeading = "Drocer";
      const user: Partial<User> = {};
      const authStateHookMock: Partial<AuthStateHook> = [user as User];

      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>,
      );

      const heading = screen.getByRole("heading", {
        level: 1,
        name: expectedHeading,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show an image with an alternative text 'Drocer's app logo'", () => {
      const expectedAltText = "Drocer's app logo";
      const user: Partial<User> = {};
      const authStateHookMock: Partial<AuthStateHook> = [user as User];

      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>,
      );

      const image = screen.getByAltText(expectedAltText);

      expect(image).toBeInTheDocument();
    });

    test("Then it should show two links with the text 'Add' and 'Records'", async () => {
      const expectedAddText = /add/i;
      const expectedRecordsText = /records/i;
      const user: Partial<User> = {};
      const authStateHookMock: Partial<AuthStateHook> = [user as User];

      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
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

  describe("When it's rendered, the user is logged and clicks on the button 'Logout'", () => {
    test("Then the received button's function should be called on click", async () => {
      const initialPath = paths.records;
      const buttonText = /logout/i;

      const user: Partial<User> = {};
      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={[initialPath]}>
            <App />
          </MemoryRouter>
        </Provider>,
      );

      const button = await screen.findByRole("button", { name: buttonText });

      await userEvent.click(button);

      expect(signOut).toHaveBeenCalled();
    });
  });

  describe("When it's rendered, the user is logged and the path is '/home'", () => {
    test("Then it should show a heading 'Records'", async () => {
      const initialPath = paths.home;
      const expectedHeading = "Records";

      const user: Partial<User> = {
        getIdToken: vi.fn().mockResolvedValue("token"),
      };

      const idTokenHookMock: Partial<IdTokenHook> = [user as User];
      authHook.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);

      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={[initialPath]}>
            <App />
          </MemoryRouter>
        </Provider>,
      );

      const heading = await screen.findByRole("heading", {
        name: expectedHeading,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When it's rendered and the user isn't logged", () => {
    test("Then it shouldn't show two links with the text 'Add' and 'Records'", () => {
      const expectedAddText = /add/i;
      const expectedRecordsText = /records/i;

      const authStateHookMock: Partial<AuthStateHook> = [null];
      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>,
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

  describe("When it's rendered, the user isn't logged and clicks on the button 'Sign in'", () => {
    test("Then the received button's function should be called on click", async () => {
      const buttonText = "Sign in";
      const authStateHookMock: Partial<AuthStateHook> = [null];

      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>,
      );

      const button = await screen.findByRole("button", { name: buttonText });

      await userEvent.click(button);

      expect(signInWithPopup).toHaveBeenCalled();
    });
  });

  describe("When it's rendered, the user isn't logged and tries to enter to '/records' page", () => {
    test("Then it should redirect to /home and show a heading 'Welcome'", async () => {
      const headingText = "Welcome";

      const store = setupStore({ recordsState: { records: [] } });
      const authStateHookMock: Partial<AuthStateHook> = [null];
      const initialPath = paths.records;

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
