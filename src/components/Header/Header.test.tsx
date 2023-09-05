import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

describe("Given a Header component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a heading 'Drocer'", () => {
      const expectedHeading = "Drocer";

      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", {
        level: 1,
        name: expectedHeading,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show an image with an alternative text 'Drocer's app logo'", () => {
      const expectedAltText = "Drocer's app logo";

      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
      );

      const image = screen.getByAltText(expectedAltText);

      expect(image).toBeInTheDocument();
    });
  });
});
