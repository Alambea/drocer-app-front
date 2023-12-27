import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { recordMock } from "../../mocks/recordsMock";
import { BrowserRouter, Params } from "react-router-dom";
import { setupStore } from "../../store";
import ModifyRecordPage from "./ModifyRecordPage";

describe("Given a ModifyRecordPage page", () => {
  const store = setupStore({
    recordsState: { records: [], selectedRecord: recordMock },
    uiState: { isLoading: false },
  });

  vi.mock("react-router-dom", async () => {
    const actual: Readonly<Params<string>> = await vi.importActual(
      "react-router-dom",
    );
    return {
      ...actual,
      useParams: vi.fn().mockReturnValue({ id: recordMock.id }),
    };
  });

  describe(`When it is rendered with a '${recordMock.artist}' ${recordMock.id} id`, () => {
    test(`Then it should show a 'Modify ${recordMock.artist}'s ${recordMock.record} record' heading`, async () => {
      const expectedHeading = `Modify ${recordMock.artist}'s ${recordMock.record} record`;

      render(
        <Provider store={store}>
          <BrowserRouter>
            <ModifyRecordPage />;
          </BrowserRouter>
        </Provider>,
      );

      const heading = await screen.findByRole("heading", {
        level: 1,
        name: expectedHeading,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show a button 'Modify'", async () => {
      const expectedButtonText = "Modify";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <ModifyRecordPage />;
          </BrowserRouter>
        </Provider>,
      );

      const button = await screen.findByRole("button", {
        name: expectedButtonText,
      });

      expect(button).toBeInTheDocument();
    });

    test(`Then it should show '${recordMock.artist}', '${recordMock.record}', '${recordMock.releaseDate}', '${recordMock.rating}', '${recordMock.description}', '${recordMock.length}', '${recordMock.label}', '${recordMock.genres}', '${recordMock.cover} inside an input'`, async () => {
      const artistInputLabel = "Artist";
      const recordInputLabel = "Record";
      const releaseDateInputLabel = "Release Year";
      const descriptionInputLabel = "Description";
      const lengthInputLabel = "Length";
      const labelInputLabel = "Label";
      const genresInputLabel = "Genres";
      const coverInputLabel = "Image URL";

      const ratingButtonName = "Solid star number 3";

      const expectedTypedArtist = recordMock.artist;
      const expectedTypedRecord = recordMock.record;
      const expectedTypedReleaseDate = recordMock.releaseDate;
      const expectedTypedDescription = recordMock.description;
      const expectedTypedLength = recordMock.length;
      const expectedTypedLabel = recordMock.label;
      const expectedTypedGenres = recordMock.genres;
      const expectedTypedCover = recordMock.cover;

      render(
        <Provider store={store}>
          <BrowserRouter>
            <ModifyRecordPage />;
          </BrowserRouter>
        </Provider>,
      );

      const artistInput = await screen.findByLabelText(artistInputLabel);
      const recordInput = await screen.findByLabelText(recordInputLabel);
      const releaseDateInput = await screen.findByLabelText(
        releaseDateInputLabel,
      );
      const descriptionInput = await screen.findByLabelText(
        descriptionInputLabel,
      );
      const lengthInput = await screen.findByLabelText(lengthInputLabel);
      const labelInput = await screen.findByLabelText(labelInputLabel);
      const genresInput = await screen.findByLabelText(genresInputLabel);
      const coverInput = await screen.findByLabelText(coverInputLabel);

      const ratingAltImage = await screen.findByAltText(ratingButtonName);
      const ratingButton = await ratingAltImage.closest(".rating__button")!;

      expect(artistInput).toHaveValue(expectedTypedArtist);
      expect(recordInput).toHaveValue(expectedTypedRecord);
      expect(releaseDateInput).toHaveValue(expectedTypedReleaseDate);
      expect(descriptionInput).toHaveValue(expectedTypedDescription);
      expect(lengthInput).toHaveValue(expectedTypedLength);
      expect(labelInput).toHaveValue(expectedTypedLabel);
      expect(genresInput).toHaveValue(expectedTypedGenres);
      expect(coverInput).toHaveValue(expectedTypedCover);

      expect(ratingButton).toBeInTheDocument();
    });
  });
});
