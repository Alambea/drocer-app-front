import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Given a Header component", () => {
  describe("When it is rendered", () => {
    test("It should show a heading 'Drocer'", () => {
      const expectedHeading = "Drocer";

      render(<Header></Header>);

      const heading = screen.getByRole("heading", {
        level: 1,
        name: expectedHeading,
      });

      expect(heading).toBeInTheDocument();
    });

    test("It should show an alternative text 'Drocer's app logo'", () => {
      const expectedAltText = "Drocer's app logo";

      render(<Header></Header>);

      const image = screen.getByAltText(expectedAltText);

      expect(image).toBeInTheDocument();
    });
  });
});
