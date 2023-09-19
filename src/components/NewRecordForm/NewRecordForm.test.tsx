import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { recordMock } from "../../mocks/recordsMock";
import NewRecordForm from "./NewRecordForm";

describe("Given a NewRecordForm component", () => {
  const mockSubmit = vi.fn();

  const artistInputLabel = "Artist";
  const recordInputLabel = "Record";
  const releaseDateInputLabel = "Release Year";
  const descriptionInputLabel = "Description";
  const lengthInputLabel = "Length";
  const labelInputLabel = "Label";
  const genresInputLabel = "Genres";
  const coverInputLabel = "Image URL";
  const rattingButtonName = /star number 3/i;

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
    test("Then it should show an 'Artist', 'Record', 'Release Year', 'Rating 0/5', 'Description', 'Length', 'Label', 'Genres', and a 'Image URL' fields", () => {
      render(<NewRecordForm actionOnSubmit={mockSubmit} />);

      const artistInput = screen.getByLabelText(artistInputLabel);
      const recordInput = screen.getByLabelText(recordInputLabel);
      const releaseDateInput = screen.getByLabelText(releaseDateInputLabel);
      const ratingInput = screen.getByRole("button", {
        name: rattingButtonName,
      });
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

      render(<NewRecordForm actionOnSubmit={mockSubmit} />);

      const button = screen.getByRole("button", {
        name: expectedButtonText,
      });

      expect(button).toBeInTheDocument();
    });

    test("Then the Add button should be disabled", async () => {
      const textButton = "Add";

      render(<NewRecordForm actionOnSubmit={mockSubmit} />);

      const button = screen.getByRole("button", { name: textButton });

      expect(button).toBeDisabled();
    });
  });

  describe("When the user types 'FKA Twigs', 'LP1', 2014, 4, 'LP1 is the debut studio...', '40:46', 'Young Turks', 'Avant-pop, electronic, art pop R&B, trip hop' and 'http://example.com/image.png' on each input", () => {
    test("Then the inputs should have the typed value", async () => {
      const userEventConfig = { delay: null };

      render(<NewRecordForm actionOnSubmit={mockSubmit} />);

      const artistInput = screen.getByLabelText(artistInputLabel);
      const recordInput = screen.getByLabelText(recordInputLabel);
      const releaseDateInput = screen.getByLabelText(releaseDateInputLabel);
      const ratingButton = screen.getByRole("button", {
        name: rattingButtonName,
      });
      const descriptionInput = screen.getByLabelText(descriptionInputLabel);
      const lengthInput = screen.getByLabelText(lengthInputLabel);
      const labelInput = screen.getByLabelText(labelInputLabel);
      const genresInput = screen.getByLabelText(genresInputLabel);
      const coverInput = screen.getByLabelText(coverInputLabel);

      await userEvent.type(artistInput, typedArtist, userEventConfig);
      await userEvent.type(recordInput, typedRecord, userEventConfig);
      await userEvent.type(releaseDateInput, typedReleaseDate.toString(), {
        delay: null,
      });
      await fireEvent.change(ratingButton, {
        target: { value: selectedRating },
      });
      await userEvent.type(descriptionInput, typedDescription, userEventConfig);
      await userEvent.type(lengthInput, typedLength, userEventConfig);
      await userEvent.type(labelInput, typedLabel, userEventConfig);
      await userEvent.type(genresInput, typedGenres, userEventConfig);
      await userEvent.type(coverInput, typedCover, userEventConfig);

      expect(artistInput).toHaveValue(typedArtist);
      expect(recordInput).toHaveValue(typedRecord);
      expect(releaseDateInput).toHaveValue(typedReleaseDate);
      expect(ratingButton).toHaveValue(selectedRating.toString());
      expect(descriptionInput).toHaveValue(typedDescription);
      expect(lengthInput).toHaveValue(typedLength);
      expect(labelInput).toHaveValue(typedLabel);
      expect(genresInput).toHaveValue(typedGenres);
      expect(coverInput).toHaveValue(typedCover);
    });
  });

  describe("When the user types 'FKA Twigs', 'LP1', 2014, 4, 'LP1 is the debut studio...', '40:46', 'Young Turks', 'Avant-pop, electronic, art pop R&B, trip hop' and 'http://example.com/image.png' on each input", () => {
    test("Then the Add button should be enabled", async () => {
      const textButton = "Add";
      const userEventConfig = { delay: null };

      render(<NewRecordForm actionOnSubmit={mockSubmit} />);

      const artistInput = screen.getByLabelText(artistInputLabel);
      const recordInput = screen.getByLabelText(recordInputLabel);
      const releaseDateInput = screen.getByLabelText(releaseDateInputLabel);
      const ratingButton = screen.getByRole("button", {
        name: rattingButtonName,
      });
      const descriptionInput = screen.getByLabelText(descriptionInputLabel);
      const lengthInput = screen.getByLabelText(lengthInputLabel);
      const labelInput = screen.getByLabelText(labelInputLabel);
      const genresInput = screen.getByLabelText(genresInputLabel);
      const coverInput = screen.getByLabelText(coverInputLabel);

      await userEvent.type(artistInput, typedArtist, userEventConfig);
      await userEvent.type(recordInput, typedRecord, userEventConfig);
      await userEvent.click(ratingButton, userEventConfig);
      await userEvent.type(releaseDateInput, typedReleaseDate.toString(), {
        delay: null,
      });
      // await userEvent.click(ratingButton, userEventConfig);
      await userEvent.type(descriptionInput, typedDescription, userEventConfig);
      await userEvent.type(lengthInput, typedLength, userEventConfig);
      await userEvent.type(labelInput, typedLabel, userEventConfig);
      await userEvent.type(genresInput, typedGenres, userEventConfig);
      await userEvent.type(coverInput, typedCover, userEventConfig);

      const button = await screen.findByRole("button", { name: textButton });
      screen.debug();
      expect(button).not.toBeDisabled();
    });
  });
});
