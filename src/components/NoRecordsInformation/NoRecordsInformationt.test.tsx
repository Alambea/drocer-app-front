import { render, screen } from "@testing-library/react";
import NoRecordsInformation from "./NoRecordsInformation";

describe("Given an NoRecordInformation component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a heading 'Add your first record'", () => {
      const headingText = "Add your first record";

      render(<NoRecordsInformation />);

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show an image with an alternative text 'Drocer's app logo'", () => {
      const altText = "Drocer's app logo";

      render(<NoRecordsInformation />);

      const image = screen.getByAltText(altText);

      expect(image).toBeInTheDocument();
    });
  });
});