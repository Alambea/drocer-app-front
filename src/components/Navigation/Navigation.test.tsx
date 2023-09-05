import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";

describe("Given a Navigation component", () => {
  describe("When it's rendered", () => {
    test("Then it should show two links with the text 'Add' and 'Records'", () => {
      const expectedAddText = /add/i;
      const expectedRecordsText = /records/i;

      render(<Navigation />);

      const addLink = screen.getByRole("link", { name: expectedAddText });
      const recordsLink = screen.getByRole("link", {
        name: expectedRecordsText,
      });

      expect(addLink).toBeInTheDocument();
      expect(recordsLink).toBeInTheDocument();
    });

    test("Then it should show a button with the text 'Logout'", () => {
      const expectedLogoutButton = /logout/i;

      render(<Navigation />);

      const button = screen.getByRole("button", {
        name: expectedLogoutButton,
      });

      expect(button).toBeInTheDocument();
    });

    test("Then it should show the alternative text 'Add icon', 'Vinyl icon', 'Logout icon', ", () => {
      const expectedAddImgAlt = "Add icon";
      const expectedVinylImgAlt = "Vinyl icon";
      const expectedLogoutImgAlt = "Logout icon";

      render(<Navigation />);

      const addImage = screen.getByAltText(expectedAddImgAlt);
      const vinylImage = screen.getByAltText(expectedVinylImgAlt);
      const logoutImage = screen.getByAltText(expectedLogoutImgAlt);

      expect(addImage).toBeInTheDocument();
      expect(vinylImage).toBeInTheDocument();
      expect(logoutImage).toBeInTheDocument();
    });
  });
});
