import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { setupStore } from "../../store";
import AddRecordPage from "./AddRecordPage";
import { recordMock, recordsMock } from "../../mocks/recordsMock";

describe("Given a AddRecordPage page", () => {
  describe("When it's rendered", () => {
    test("Then it should show a heading 'Add a new record'", async () => {
      const expectedTitle = "Add a new record";
      const store = setupStore({ recordsState: { records: recordsMock } });

      render(
        <Provider store={store}>
          <React.Suspense>
            <AddRecordPage />
          </React.Suspense>
        </Provider>,
      );

      const heading = await screen.findByRole("heading", {
        name: expectedTitle,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the user types 'FKA Twigs', 'LP1', 2014, 4, 'LP1 is the debut studio...', '40:46', 'Young Turks', 'Avant-pop, electronic, art pop R&B, trip hop' and 'http://example.com/image.png' on each input and clicks on the 'Add' button it shpuld be enabled", () => {
    test("Then the Add button should be enabled", async () => {
      const textButton = "Add";

      const artistInputLabel = "Artist";
      const recordInputLabel = "Record";
      const releaseDateInputLabel = "Release Date";
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

      render(<AddRecordPage />);

      const artistInput = screen.getByLabelText(artistInputLabel);
      const recordInput = screen.getByLabelText(recordInputLabel);
      const releaseDateInput = screen.getByLabelText(releaseDateInputLabel);
      const ratingInput = screen.getByLabelText(ratingInputLabel);
      const descriptionInput = screen.getByLabelText(descriptionInputLabel);
      const lengthInput = screen.getByLabelText(lengthInputLabel);
      const labelInput = screen.getByLabelText(labelInputLabel);
      const genresInput = screen.getByLabelText(genresInputLabel);
      const coverInput = screen.getByLabelText(coverInputLabel);

      await userEvent.type(artistInput, typedArtist);
      await userEvent.type(recordInput, typedRecord);
      await userEvent.type(releaseDateInput, typedReleaseDate.toString());
      await fireEvent.change(ratingInput, {
        target: { value: selectedRating },
      });
      await userEvent.type(descriptionInput, typedDescription);
      await userEvent.type(lengthInput, typedLength);
      await userEvent.type(labelInput, typedLabel);
      await userEvent.type(genresInput, typedGenres);
      await userEvent.type(coverInput, typedCover);

      const button = screen.getByRole("button", { name: textButton });

      await userEvent.click(button);

      expect(button).not.toBeDisabled();
    });
  });
});
