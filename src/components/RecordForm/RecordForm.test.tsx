import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { recordMock } from "../../mocks/recordsMock";
import RecordForm from "./RecordForm";

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
  const ratingButtonName = "Outlined star number 3";
  const expectedRatingButtonName = "Solid star number 3";
  const buttonClass = ".rating__button";

  const typedArtist = recordMock.artist;
  const typedRecord = recordMock.record;
  const typedReleaseDate = recordMock.releaseDate;
  const typedDescription = recordMock.description;
  const typedLength = recordMock.length;
  const typedLabel = recordMock.label;
  const typedGenres = recordMock.genres;
  const typedCover = recordMock.cover;

  describe("When it's rendered", () => {
    test("Then it should show an 'Artist', 'Record', 'Release Year', 'Rating 0/5', 'Description', 'Length', 'Label', 'Genres', and a 'Image URL' fields", async () => {
      render(<RecordForm actionOnSubmit={mockSubmit} />);

      const artistInput = screen.getByLabelText(artistInputLabel);
      const recordInput = screen.getByLabelText(recordInputLabel);
      const releaseDateInput = screen.getByLabelText(releaseDateInputLabel);
      const ratingAltImage = await screen.findByAltText(ratingButtonName);
      const ratingButton = await ratingAltImage.closest(buttonClass);
      const descriptionInput = screen.getByLabelText(descriptionInputLabel);
      const lengthInput = screen.getByLabelText(lengthInputLabel);
      const labelInput = screen.getByLabelText(labelInputLabel);
      const genresInput = screen.getByLabelText(genresInputLabel);
      const coverInput = screen.getByLabelText(coverInputLabel);

      expect(artistInput).toBeInTheDocument();
      expect(recordInput).toBeInTheDocument();
      expect(releaseDateInput).toBeInTheDocument();
      expect(ratingButton).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
      expect(lengthInput).toBeInTheDocument();
      expect(labelInput).toBeInTheDocument();
      expect(genresInput).toBeInTheDocument();
      expect(coverInput).toBeInTheDocument();
    });

    test("Then it should a button with the text 'Add'", () => {
      const expectedButtonText = "Add";

      render(<RecordForm actionOnSubmit={mockSubmit} />);

      const button = screen.getByRole("button", {
        name: expectedButtonText,
      });

      expect(button).toBeInTheDocument();
    });

    test("Then the Add button should be disabled", async () => {
      const textButton = "Add";

      render(<RecordForm actionOnSubmit={mockSubmit} />);

      const button = screen.getByRole("button", { name: textButton });

      expect(button).toBeDisabled();
    });
  });

  describe("When the user types 'FKA Twigs', 'LP1', 2014, 4, 'LP1 is the debut studio...', '40:46', 'Young Turks', 'Avant-pop, electronic, art pop R&B, trip hop' and 'http://example.com/image.png' on each input", () => {
    test("Then the inputs should have the typed value", async () => {
      const userEventConfig = { delay: null };

      render(<RecordForm actionOnSubmit={mockSubmit} />);

      const artistInput = screen.getByLabelText(artistInputLabel);
      const recordInput = screen.getByLabelText(recordInputLabel);
      const releaseDateInput = screen.getByLabelText(releaseDateInputLabel);
      const ratingButtonImage = await screen.findByAltText(ratingButtonName);
      const ratingButton = await ratingButtonImage.closest(".rating__button")!;
      const descriptionInput = screen.getByLabelText(descriptionInputLabel);
      const lengthInput = screen.getByLabelText(lengthInputLabel);
      const labelInput = screen.getByLabelText(labelInputLabel);
      const genresInput = screen.getByLabelText(genresInputLabel);
      const coverInput = screen.getByLabelText(coverInputLabel);

      await userEvent.type(artistInput, typedArtist, userEventConfig);
      await userEvent.type(recordInput, typedRecord, userEventConfig);
      await userEvent.type(
        releaseDateInput,
        typedReleaseDate.toString(),
        userEventConfig,
      );
      await userEvent.click(ratingButton, userEventConfig);
      await userEvent.type(descriptionInput, typedDescription, userEventConfig);
      await userEvent.type(lengthInput, typedLength, userEventConfig);
      await userEvent.type(labelInput, typedLabel, userEventConfig);
      await userEvent.type(genresInput, typedGenres, userEventConfig);
      await userEvent.type(coverInput, typedCover, userEventConfig);

      const clickedStar = await screen.findByAltText(expectedRatingButtonName);

      expect(artistInput).toHaveValue(typedArtist);
      expect(recordInput).toHaveValue(typedRecord);
      expect(releaseDateInput).toHaveValue(typedReleaseDate);
      expect(clickedStar).toBeInTheDocument();
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

      render(<RecordForm actionOnSubmit={mockSubmit} />);

      const artistInput = screen.getByLabelText(artistInputLabel);
      const recordInput = screen.getByLabelText(recordInputLabel);
      const releaseDateInput = screen.getByLabelText(releaseDateInputLabel);
      const ratingButtonImage = await screen.findByAltText(ratingButtonName);
      const ratingButton = await ratingButtonImage.closest(buttonClass)!;
      const descriptionInput = screen.getByLabelText(descriptionInputLabel);
      const lengthInput = screen.getByLabelText(lengthInputLabel);
      const labelInput = screen.getByLabelText(labelInputLabel);
      const genresInput = screen.getByLabelText(genresInputLabel);
      const coverInput = screen.getByLabelText(coverInputLabel);

      await userEvent.type(artistInput, typedArtist, userEventConfig);
      await userEvent.type(recordInput, typedRecord, userEventConfig);
      await userEvent.click(ratingButton, userEventConfig);
      await userEvent.type(
        releaseDateInput,
        typedReleaseDate.toString(),
        userEventConfig,
      );
      await userEvent.click(ratingButton, userEventConfig);
      await userEvent.type(descriptionInput, typedDescription, userEventConfig);
      await userEvent.type(lengthInput, typedLength, userEventConfig);
      await userEvent.type(labelInput, typedLabel, userEventConfig);
      await userEvent.type(genresInput, typedGenres, userEventConfig);
      await userEvent.type(coverInput, typedCover, userEventConfig);

      const button = await screen.findByRole("button", { name: textButton });

      expect(button).not.toBeDisabled();
    });
  });
});
