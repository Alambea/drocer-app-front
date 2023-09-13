import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

describe("Given a NotFoundPage page", () => {
  describe("When it is rendered", () => {
    test("Then it should show a heading '404 Page Not Found'", () => {
      const headingText = "404 Page Not Found";

      render(
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", {
        name: headingText,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show a text 'Oops, this page doesn’t exist'", () => {
      const text = "Oops, this page doesn’t exist";

      render(
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>,
      );

      const textElement = screen.getByText(text);

      expect(textElement).toBeInTheDocument();
    });

    test("Then it should show a Link 'Back to list'", () => {
      const anchorText = "Back to list";

      render(
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>,
      );

      const link = screen.getByRole("link", {
        name: anchorText,
      });

      expect(link).toBeInTheDocument();
    });
  });
});
