import { render, screen } from "@testing-library/react";
import NewRecordForm from "./NewRecordForm";
import AddRecordPage from "../../pages/AddRecordPage/AddRecordPage";

describe("Given a NewRecordForm component", () => {
  describe("When it's rendered", () => {
    test("Then it should show an 'Artist', 'Record', 'Release Date', 'Rating 1/5', 'Description', 'Length', 'Label', 'Genres', and a 'Image URL' fields", () => {
      const artistInputLabel = "Artist";
      const recordInputLabel = "Record";
      const releaseDateInputLabel = "Release Date";
      const ratingInputLabel = "Rating 1/5";
      const descriptionInputLabel = "Description";
      const lengthInputLabel = "Length";
      const labelInputLabel = "Label";
      const genresInputLabel = "Genres";
      const imageUrlInputLabel = "Image URL";

      render(<NewRecordForm />);

      const artistInput = screen.getByLabelText(artistInputLabel);
      const recordInput = screen.getByLabelText(recordInputLabel);
      const releaseDateInput = screen.getByLabelText(releaseDateInputLabel);
      const ratingInput = screen.getByLabelText(ratingInputLabel);
      const descriptionInput = screen.getByLabelText(descriptionInputLabel);
      const lengthInput = screen.getByLabelText(lengthInputLabel);
      const labelInput = screen.getByLabelText(labelInputLabel);
      const genresInput = screen.getByLabelText(genresInputLabel);
      const imageUrlInput = screen.getByLabelText(imageUrlInputLabel);

      expect(artistInput).toBeInTheDocument();
      expect(recordInput).toBeInTheDocument();
      expect(releaseDateInput).toBeInTheDocument();
      expect(ratingInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
      expect(lengthInput).toBeInTheDocument();
      expect(labelInput).toBeInTheDocument();
      expect(genresInput).toBeInTheDocument();
      expect(imageUrlInput).toBeInTheDocument();
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
});
