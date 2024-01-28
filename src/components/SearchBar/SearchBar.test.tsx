import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Given a SearchBar component", () => {
  const expectedLabelText = /search/i;
  const expectedInputContent = "head";
  const actionOnSubmit = vi.fn();

  describe("When it is rendered", () => {
    test("Then it should show a 'Search' input", () => {
      render(<SearchBar actionOnSubmit={actionOnSubmit} />);

      const searchInput = screen.getByLabelText(expectedLabelText);

      expect(searchInput).toBeInTheDocument();
    });

    test("Then it should show a button with an alt text 'Magnifying glass icon'", () => {
      const expectedSearchButtonAlt = "Magnifying glass icon";

      render(<SearchBar actionOnSubmit={actionOnSubmit} />);

      const button = screen.getByRole("button", {
        name: expectedSearchButtonAlt,
      });

      expect(button).toBeInTheDocument();
    });
  });

  describe("When it is rendered with a current query 'head'", () => {
    test("Then the input should have the received value 'head'", () => {
      render(
        <SearchBar
          actionOnSubmit={actionOnSubmit}
          currentQuery={expectedInputContent}
        />,
      );

      const searchInput = screen.getByLabelText(expectedLabelText);

      expect(searchInput).toHaveValue(expectedInputContent);
    });
  });
});
