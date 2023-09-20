import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Rating from "./Rating";

describe("Given a Rating component", () => {
  describe("When it is rendered with a value of 5", () => {
    test("Then it should show five buttons with the alt text 'Solid star number X'", () => {
      const value = 5;
      const isFormElement = false;
      const actionOnClick = vi.fn();

      render(
        <Rating
          value={value}
          isFormElement={isFormElement}
          actionOnClick={actionOnClick}
        />,
      );

      const numberOfButtons = screen.getAllByRole("button");

      numberOfButtons.forEach((element, index) => {
        expect(element).toHaveAccessibleName(`Solid star number ${index + 1}`);
      });
    });
  });

  describe("When it is rendered with a value of 0", () => {
    test("Then it should show five buttons with the alt text 'Solid star number X'", () => {
      const value = 0;
      const isFormElement = false;
      const actionOnClick = vi.fn();

      render(
        <Rating
          value={value}
          isFormElement={isFormElement}
          actionOnClick={actionOnClick}
        />,
      );

      const numberOfButtons = screen.getAllByRole("button");

      numberOfButtons.forEach((element, index) => {
        expect(element).toHaveAccessibleName(
          `Outlined star number ${index + 1}`,
        );
      });
    });
  });

  describe("When it is rendered with a value of 0 and the user clicks on the third", () => {
    test("Then it should show three buttons with the alt text 'Solid star number X' and two with 'Outlined star number X'", async () => {
      const value = 0;
      const isFormElement = false;
      const actionOnClick = vi.fn();
      const buttonNumberToClick = 3;

      render(
        <Rating
          value={value}
          isFormElement={isFormElement}
          actionOnClick={actionOnClick}
        />,
      );

      const numberOfButtons = screen.getAllByRole("button");

      const buttonToClick = numberOfButtons[buttonNumberToClick];

      await userEvent.click(buttonToClick);

      expect(actionOnClick).toHaveBeenCalled();
    });
  });
});
