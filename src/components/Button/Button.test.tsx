import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Given a Button component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a text 'Click here'", () => {
      const mockFunction = vi.fn();
      const buttonText = "Click here";

      render(
        <Button className="" actionOnClick={mockFunction}>
          {buttonText}
        </Button>,
      );

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toBeInTheDocument();
    });

    test("Then it should show an alt text 'Logo'", () => {
      const mockFunction = vi.fn();
      const buttonAlt = "Logo";

      render(
        <Button className="" actionOnClick={mockFunction}>
          <img src="come_logo.svg" alt="Logo" />
        </Button>,
      );

      const button = screen.getByRole("button", { name: buttonAlt });
      expect(button).toBeInTheDocument();
    });

    test("Then the received function should be called", async () => {
      const mockFunction = vi.fn();
      const buttonAlt = "Logo";

      render(
        <Button className="" actionOnClick={mockFunction}>
          <img src="come_logo.svg" alt="Logo" />
        </Button>,
      );

      const button = screen.getByRole("button", { name: buttonAlt });

      await userEvent.click(button);

      expect(mockFunction).toHaveBeenCalled();
    });
  });
});
