import { render, screen } from "@testing-library/react";
import RecordsListPage from "./RecordsListPage";

describe("Given a RecordsListPage page", () => {
  describe("When it is rendered", () => {
    test("Then it should show a heading 'Records'", () => {
      const expectedTitle = "Records";

      render(<RecordsListPage />);

      const heading = screen.getByRole("heading", { name: expectedTitle });

      expect(heading).toBeInTheDocument();
    });
  });
});
