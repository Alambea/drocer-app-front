import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Given an App component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a heading 'Drocer'", () => {
      const expectedHeading = "Drocer";

      render(<App></App>);

      const heading = screen.getByRole("heading", {
        level: 1,
        name: expectedHeading,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show an image with an alternative text 'Drocer's app logo'", () => {
      const expectedAltText = "Drocer's app logo";

      render(<App></App>);

      const image = screen.getByAltText(expectedAltText);

      expect(image).toBeInTheDocument();
    });
  });
});
