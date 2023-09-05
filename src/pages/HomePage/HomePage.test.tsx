import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

describe("Given a HomePage page", () => {
  describe("When it is rendered", () => {
    test("Then it should show a heading 'Welcome'", () => {
      const headingText = "Welcome";

      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", {
        name: headingText,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show a text 'Access with your GitHub account to your favorite records'", () => {
      const text = "Access with your GitHub account to your favorite records";

      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>,
      );

      const textElement = screen.getByText(text);

      expect(textElement).toBeInTheDocument();
    });

    test("Then it should show a button 'Sign in'", () => {
      const buttonText = "Sign in";

      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>,
      );

      const button = screen.getByRole("button", {
        name: buttonText,
      });

      expect(button).toBeInTheDocument();
    });
  });
});
