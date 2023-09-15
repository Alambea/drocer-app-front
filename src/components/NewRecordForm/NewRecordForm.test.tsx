import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewRecordForm from "./NewRecordForm";
import AddRecordPage from "../../pages/AddRecordPage/AddRecordPage";
import { recordMock } from "../../mocks/recordsMock";

describe("Given a NewRecordForm component", () => {
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

  describe("When it's rendered", () => {
    test("Then it should show an 'Artist', 'Record', 'Release Date', 'Rating 0/5', 'Description', 'Length', 'Label', 'Genres', and a 'Image URL' fields", () => {
      render(<NewRecordForm />);

      const artistInput = screen.getByLabelText(artistInputLabel);
      const recordInput = screen.getByLabelText(recordInputLabel);
      const releaseDateInput = screen.getByLabelText(releaseDateInputLabel);
      const ratingInput = screen.getByLabelText(ratingInputLabel);
      const descriptionInput = screen.getByLabelText(descriptionInputLabel);
      const lengthInput = screen.getByLabelText(lengthInputLabel);
      const labelInput = screen.getByLabelText(labelInputLabel);
      const genresInput = screen.getByLabelText(genresInputLabel);
      const coverInput = screen.getByLabelText(coverInputLabel);

      expect(artistInput).toBeInTheDocument();
      expect(recordInput).toBeInTheDocument();
      expect(releaseDateInput).toBeInTheDocument();
      expect(ratingInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
      expect(lengthInput).toBeInTheDocument();
      expect(labelInput).toBeInTheDocument();
      expect(genresInput).toBeInTheDocument();
      expect(coverInput).toBeInTheDocument();
    });

    test("Then it should a button with the text 'Add'", () => {
      const expectedButtonText = "Add";

      render(<AddRecordPage />);

      const button = screen.getByRole("button", {
        name: expectedButtonText,
      });

      expect(button).toBeInTheDocument();
    });
  });

  describe("When the user types 'FKA Twigs', 'LP1', 2014, 4, 'LP1 is the debut studio album by English singer-songwriter FKA Twigs, released on 6 August 2014 by Young Turks. Production for the album is handled by FKA Twigs herself, alongside Emile Haynie, Arca, Cy An, Devonté Hynes, Clams Casino, Paul Epworth, Sampha and Tic.', '40:46', 'Young Turks', 'Avant-pop, electronic, art pop R&B, trip hop' and 'http://example.com/image.png' on each input", () => {
    test("Then the inputs should have the typed value", async () => {
      render(<NewRecordForm />);

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

      expect(artistInput).toHaveValue(typedArtist);
      expect(recordInput).toHaveValue(typedRecord);
      expect(releaseDateInput).toHaveValue(typedReleaseDate);
      expect(ratingInput).toHaveValue(selectedRating.toString());
      expect(descriptionInput).toHaveValue(typedDescription);
      expect(lengthInput).toHaveValue(typedLength);
      expect(labelInput).toHaveValue(typedLabel);
      expect(genresInput).toHaveValue(typedGenres);
      expect(coverInput).toHaveValue(typedCover);
    });
  });
});
