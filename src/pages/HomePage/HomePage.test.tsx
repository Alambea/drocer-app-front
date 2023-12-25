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

    test("Then it should show a text 'Select a sign in method to access to your favorite records'", () => {
      const text = "Select a sign in method to access to your favorite records";

      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>,
      );

      const textElement = screen.getByText(text);

      expect(textElement).toBeInTheDocument();
    });

    test("Then it should show a button containing 'Sign with github'", () => {
      const buttonText = /sign in with github/i;

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

    test("Then it should show a button containing 'sign in with google'", () => {
      const buttonText = /sign in with google/i;

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
