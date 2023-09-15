import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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
import { recordMock, recordsMock } from "../../mocks/recordsMock";

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

const userEventConfig = { delay: null };

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
      authHook.useIdToken = vi.fn().mockReturnValue([user]);

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

    describe("When it's rendered, the user is logged and the path is '/add-new-record' and the user types 'FKA Twigs', 'LP1', 2014, 4, 'LP1 is the debut studio...', '40:46', 'Young Turks', 'Avant-pop, electronic, art pop R&B, trip hop' and 'http://example.com/image.png' on each input and clicks on the 'Add' button it shpuld be enabled", () => {
      test("Then it should show a heading 'Records'", async () => {
        const initialPath = paths.addRecord;
        const textButton = "Add";
        const expectedHeading = "Records";

        const artistInputLabel = "Artist";
        const recordInputLabel = "Record";
        const releaseDateInputLabel = "Release Year";
        const ratingInputLabel = "Rating 0/5";
        const descriptionInputLabel = "Description";
        const lengthInputLabel = "Length";
        const labelInputLabel = "Label";
        const genresInputLabel = "Genres";
        const coverInputLabel = "Image URL";

        const typedArtist = recordMock.artist;
        const typedRecord = recordMock.record;
        const typedReleaseDate = recordMock.releaseDate;
        const selectedRating = recordMock.rating;
        const typedDescription = recordMock.description;
        const typedLength = recordMock.length;
        const typedLabel = recordMock.label;
        const typedGenres = recordMock.genres;
        const typedCover = recordMock.cover;

        const user: Partial<User> = {};
        const authStateHookMock: Partial<AuthStateHook> = [user as User];

        authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={[initialPath]}>
              <React.Suspense>
                <App />
              </React.Suspense>
            </MemoryRouter>
          </Provider>,
        );

        const artistInput = await screen.findByLabelText(artistInputLabel);
        const recordInput = await screen.findByLabelText(recordInputLabel);
        const releaseDateInput = await screen.findByLabelText(
          releaseDateInputLabel,
        );
        const ratingInput = await screen.findByLabelText(ratingInputLabel);
        const descriptionInput = await screen.findByLabelText(
          descriptionInputLabel,
        );
        const lengthInput = await screen.findByLabelText(lengthInputLabel);
        const labelInput = await screen.findByLabelText(labelInputLabel);
        const genresInput = await screen.findByLabelText(genresInputLabel);
        const coverInput = await screen.findByLabelText(coverInputLabel);

        await userEvent.type(artistInput, typedArtist, userEventConfig);
        await userEvent.type(recordInput, typedRecord, userEventConfig);
        await userEvent.type(releaseDateInput, typedReleaseDate.toString(), {
          delay: null,
        });
        await fireEvent.change(ratingInput, {
          target: { value: selectedRating },
        });
        await userEvent.type(
          descriptionInput,
          typedDescription,
          userEventConfig,
        );
        await userEvent.type(lengthInput, typedLength, userEventConfig);
        await userEvent.type(labelInput, typedLabel, userEventConfig);
        await userEvent.type(genresInput, typedGenres, userEventConfig);
        await userEvent.type(coverInput, typedCover, userEventConfig);

        const button = screen.getByRole("button", { name: textButton });

        await userEvent.click(button);

        const heading = await screen.findByRole("heading", {
          name: expectedHeading,
        });

        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe("When it is rendered and the user isn't logged", () => {
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

    describe("And the user clicks on the button 'Sign in'", () => {
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

    describe("And the user tries to enter to '/records' page", () => {
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

        const heading = await screen.findByRole("heading", {
          name: headingText,
        });

        expect(heading).toBeInTheDocument();
      });
    });
  });
});
