import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import {
  Auth,
  GithubAuthProvider,
  GoogleAuthProvider,
  User,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import authHook, {
  AuthStateHook,
  IdTokenHook,
} from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import App from "./App";
import { paths } from "../../routers/paths";
import { setupStore } from "../../store";
import {
  oceanRecordMock,
  portisheadRecordMock,
  radioheadRecordApiMock,
  radioheadRecordMock,
  recordMock,
  recordsMock,
} from "../../mocks/recordsMock";
import { server } from "../../mocks/server";
import { modifyHandlers } from "../../mocks/handlers";

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
  describe("When it is rendered and the user is logged", () => {
    test("Then it should show a heading 'Drocer'", () => {
      const expectedHeading = "Drocer";
      const user: Partial<User> = {};
      const authStateHookMock: Partial<AuthStateHook> = [user as User];

      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
      const store = setupStore({
        recordsState: { records: recordsMock, recordCount: recordsMock.length },
      });

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
      const store = setupStore({
        recordsState: { records: recordsMock, recordCount: recordsMock.length },
      });

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

      const store = setupStore({
        recordsState: { records: recordsMock, recordCount: recordsMock.length },
      });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>,
      );

      const addLink = screen.getByRole("link", {
        name: expectedAddText,
      });
      const recordsLink = screen.getByRole("link", {
        name: expectedRecordsText,
      });

      expect(addLink).toBeInTheDocument();
      expect(recordsLink).toBeInTheDocument();
    });

    describe("And the user clicks on the button 'Logout'", () => {
      test("Then the received button's function should be called on click", async () => {
        const initialPath = paths.records;
        const buttonText = /logout/i;

        const user: Partial<User> = {};
        const authStateHookMock: Partial<AuthStateHook> = [user as User];
        authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

        const store = setupStore({
          recordsState: {
            records: recordsMock,
            recordCount: recordsMock.length,
          },
        });

        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={[initialPath]}>
              <App />
            </MemoryRouter>
          </Provider>,
        );

        const button = await screen.getByRole("button", { name: buttonText });

        await userEvent.click(button);

        expect(signOut).toHaveBeenCalled();
      });
    });

    describe("And the path is '/records and the user click on the Radiohead's cover image'", () => {
      test("Then it should show a heading 'Records'", async () => {
        const initialPath = paths.records;
        const expectedHeading = "Radiohead";

        const user: Partial<User> = {
          getIdToken: vi.fn().mockResolvedValue("token"),
        };

        const idTokenHookMock: Partial<IdTokenHook> = [user as User];
        const authStateHookMock: Partial<AuthStateHook> = [user as User];

        authHook.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);
        authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

        const store = setupStore({
          recordsState: {
            records: recordsMock,
            recordCount: recordsMock.length,
          },
        });

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

    describe("And the path is '/records/search?query=head", () => {
      test("Then it should show two headings 'Radiohead' and 'Portishead' and not show 'The Ocean'", async () => {
        const textToSearch = "head";
        const searchButtonAlt = "Magnifying glass icon";

        // const initialPath = `${paths.records}/search?query=${textToSearch}`;
        const initialPath = `${paths.records}`;
        const recordsToShow = [radioheadRecordMock, portisheadRecordMock];
        const recordsToNotShow = oceanRecordMock;

        const user: Partial<User> = {
          getIdToken: vi.fn().mockResolvedValue("token"),
        };

        const idTokenHookMock: Partial<IdTokenHook> = [user as User];
        const authStateHookMock: Partial<AuthStateHook> = [user as User];

        authHook.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);
        authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

        const store = setupStore({
          recordsState: {
            records: recordsMock,
            recordCount: recordsMock.length,
          },
        });

        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={[initialPath]}>
              <App />
            </MemoryRouter>
          </Provider>,
        );

        const searchInput = await screen.findByLabelText("Search");

        await userEvent.type(searchInput, textToSearch);

        const searchButton = screen.getByRole("button", {
          name: searchButtonAlt,
        });

        await userEvent.click(searchButton);

        const heading = await screen.queryByRole("heading", {
          name: recordsToNotShow.artist,
        });

        recordsToShow.forEach((recodToShow) => {
          const heading = screen.getByRole("heading", {
            name: recodToShow.artist,
          });

          expect(heading).toBeInTheDocument();
        });

        expect(heading).not.toBeInTheDocument();
      });
    });

    describe("And the path is '/add-new-record' and the user types 'FKA Twigs', 'LP1', 2014, 4, 'LP1 is the debut studio...', '40:46', 'Young Turks', 'Avant-pop, electronic, art pop R&B, trip hop' and 'http://example.com/image.png' on each input and clicks on the 'Add' button it should be enabled", () => {
      test("Then it should show a heading 'Records'", async () => {
        const initialPath = paths.addRecord;
        const textButton = "Add";
        const expectedHeading = "Records";
        const artistInputLabel = "Artist";
        const recordInputLabel = "Record";
        const releaseDateInputLabel = "Release Year";
        const descriptionInputLabel = "Description";
        const lengthInputLabel = "Length";
        const labelInputLabel = "Label";
        const genresInputLabel = "Genres";
        const coverInputLabel = "Image URL";
        const ratingButtonName = "Outlined star number 3";

        const typedArtist = recordMock.artist;
        const typedRecord = recordMock.record;
        const typedReleaseDate = recordMock.releaseDate;
        const typedDescription = recordMock.description;
        const typedLength = recordMock.length;
        const typedLabel = recordMock.label;
        const typedGenres = recordMock.genres;
        const typedCover = recordMock.cover;

        const userEventConfig = { delay: null };

        const user: Partial<User> = {
          getIdToken: vi.fn().mockResolvedValue("token"),
        };
        const authStateHookMock: Partial<AuthStateHook> = [user as User];
        const idTokenHookMock: Partial<IdTokenHook> = [user as User];

        authHook.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);
        authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

        const store = setupStore({
          recordsState: {
            records: recordsMock,
            recordCount: recordsMock.length,
          },
        });

        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={[initialPath]}>
              <App />
            </MemoryRouter>
          </Provider>,
        );

        const artistInput = await screen.findByLabelText(artistInputLabel);
        const recordInput = await screen.findByLabelText(recordInputLabel);
        const releaseDateInput = await screen.findByLabelText(
          releaseDateInputLabel,
        );
        const ratingAltImage = await screen.findByAltText(ratingButtonName);
        const ratingButton = await ratingAltImage.closest(".rating__button")!;
        const descriptionInput = await screen.findByLabelText(
          descriptionInputLabel,
        );
        const lengthInput = await screen.findByLabelText(lengthInputLabel);
        const labelInput = await screen.findByLabelText(labelInputLabel);
        const genresInput = await screen.findByLabelText(genresInputLabel);
        const coverInput = await screen.findByLabelText(coverInputLabel);

        await userEvent.type(artistInput, typedArtist, userEventConfig);
        await userEvent.type(recordInput, typedRecord, userEventConfig);
        await userEvent.type(
          releaseDateInput,
          typedReleaseDate.toString(),
          userEventConfig,
        );
        await userEvent.click(ratingButton, userEventConfig);
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

    describe("And the path is '/records and the user click on the Radiohead's cover image'", () => {
      test("Then it should show a text 'Self-released'", async () => {
        const initialPath = paths.records;
        const expectedText = "Self-released";

        const user: Partial<User> = {
          getIdToken: vi.fn().mockResolvedValue("token"),
        };

        const idTokenHookMock: Partial<IdTokenHook> = [user as User];
        authHook.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);

        const authStateHookMock: Partial<AuthStateHook> = [user as User];
        authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

        const store = setupStore({
          recordsState: {
            records: recordsMock,
            recordCount: recordsMock.length,
          },
        });

        render(
          <MemoryRouter initialEntries={[initialPath]}>
            <Provider store={store}>
              <App />
            </Provider>
          </MemoryRouter>,
        );

        const link = await screen.findByRole("link", {
          name: "Link to details about Radiohead's record In Rainbows",
        });

        await userEvent.click(link);

        const recordLabel = await screen.findByText(expectedText);

        expect(recordLabel).toBeInTheDocument();
      });
    });

    describe(`And the path is '${paths.modify}/${radioheadRecordApiMock._id}'`, () => {
      test(`Then it should show a heading "Modify ${radioheadRecordApiMock.artist}'s ${radioheadRecordApiMock.record} record"`, async () => {
        const expectedHeading = `Modify ${radioheadRecordApiMock.artist}'s ${radioheadRecordApiMock.record} record`;
        const recordId = radioheadRecordApiMock._id;
        const initialPath = `${paths.modify}/${recordId}`;

        const user: Partial<User> = {
          getIdToken: vi.fn().mockResolvedValue("token"),
        };

        const idTokenHookMock: Partial<IdTokenHook> = [user as User];
        authHook.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);

        const authStateHookMock: Partial<AuthStateHook> = [user as User];
        authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

        const store = setupStore({
          recordsState: {
            records: [],
            recordCount: 0,
            selectedRecord: recordMock,
          },
        });

        render(
          <MemoryRouter initialEntries={[initialPath]}>
            <Provider store={store}>
              <App />
            </Provider>
          </MemoryRouter>,
        );

        const heading = await screen.findByRole("heading", {
          level: 1,
          name: expectedHeading,
        });

        expect(heading).toBeInTheDocument();
      });

      describe(`And modifies ${radioheadRecordApiMock.artist}'s name and clicks on the Edit Button`, () => {
        test("Then it should show a 'Another Artist' heading", async () => {
          server.resetHandlers(...modifyHandlers);

          const expectedHeading = "Another Artist";
          const nameLabel = "Artist";
          const modifyButtonText = "Modify";
          const recordId = radioheadRecordApiMock._id;
          const initialPath = `${paths.modify}/${recordId}`;

          const user: Partial<User> = {
            getIdToken: vi.fn().mockResolvedValue("token"),
          };

          const idTokenHookMock: Partial<IdTokenHook> = [user as User];
          authHook.useIdToken = vi.fn().mockReturnValue(idTokenHookMock);

          const authStateHookMock: Partial<AuthStateHook> = [user as User];
          authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

          const store = setupStore({
            recordsState: {
              records: [],
              recordCount: 0,
              selectedRecord: recordMock,
            },
          });

          render(
            <MemoryRouter initialEntries={[initialPath]}>
              <Provider store={store}>
                <App />
              </Provider>
            </MemoryRouter>,
          );

          const artistInput = await screen.findByLabelText(nameLabel);
          await userEvent.type(artistInput, expectedHeading);

          const modifyButton = await screen.findByRole("button", {
            name: modifyButtonText,
          });
          await userEvent.click(modifyButton);

          const heading = await screen.findByRole("heading", {
            name: expectedHeading,
          });

          expect(heading).toBeInTheDocument();
        });
      });
    });
  });

  describe("When it is rendered and the user isn't logged", () => {
    test("Then it shouldn't show two links with the text 'Add' and 'Records'", () => {
      const expectedAddText = /add/i;
      const expectedRecordsText = /records/i;

      const authStateHookMock: Partial<AuthStateHook> = [null];
      authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const store = setupStore({
        recordsState: { records: recordsMock, recordCount: recordsMock.length },
      });

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

    describe("And the user clicks on the button containing 'sign in with github'", () => {
      test("Then the received button's function should be called on click with an instance of a GithubAuthProvider", async () => {
        const buttonText = /sign in with github/i;
        const authStateHookMock: Partial<AuthStateHook> = [null];

        authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

        const store = setupStore({
          recordsState: {
            records: recordsMock,
            recordCount: recordsMock.length,
          },
        });

        render(
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>,
        );

        const button = await screen.findByRole("button", { name: buttonText });

        await userEvent.click(button);

        expect(signInWithPopup).toHaveBeenCalledWith(
          expect.objectContaining({}),
          expect.any(GithubAuthProvider),
          expect.arrayContaining([]),
        );
      });
    });

    describe("And the user clicks on the button containing 'sign in with google'", () => {
      test("Then the received button's function should be called on click with an instance of a GoogleAuthProvider", async () => {
        const buttonText = /sign in with google/i;
        const authStateHookMock: Partial<AuthStateHook> = [null];

        authHook.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

        const store = setupStore({
          recordsState: {
            records: recordsMock,
            recordCount: recordsMock.length,
          },
        });

        render(
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>,
        );

        const button = await screen.findByRole("button", {
          name: buttonText,
        });

        await userEvent.click(button);

        expect(signInWithPopup).toHaveBeenCalledWith(
          expect.objectContaining({}),
          expect.any(GoogleAuthProvider),
          expect.arrayContaining([]),
        );
      });
    });

    describe("And the user tries to enter to '/records' page", () => {
      test("Then it should redirect to /home and show a heading 'Welcome'", async () => {
        const headingText = "Welcome";

        const store = setupStore({
          recordsState: { records: [], recordCount: 0 },
        });
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
