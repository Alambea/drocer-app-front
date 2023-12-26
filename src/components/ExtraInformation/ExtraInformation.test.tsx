import { render, screen } from "@testing-library/react";
import ExtraInformation from "./ExtraInformation";

describe("Given an NoRecordInformation component", () => {
  describe("When it's rendered", () => {
    const headingText = "Add your first record";

    test("Then it should show a heading 'Add your first record'", () => {
      render(<ExtraInformation text={headingText} />);

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });
});
