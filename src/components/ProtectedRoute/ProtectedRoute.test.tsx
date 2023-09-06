import { render, screen } from "@testing-library/react";
import { paths } from "../../routers/paths";
import { MemoryRouter } from "react-router-dom";
import App from "../App/App";

describe("Given a ProtectedRoute component", () => {
  describe("When the user isn't logged and try to enter to '/records' page", () => {
    test("Then it should redirect to /home and show a heading 'Welcome'", () => {
      const initialPath = paths.records;
      const headingText = "Welcome";

      render(
        <MemoryRouter initialEntries={[initialPath]}>
          <App />
        </MemoryRouter>,
      );

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });
});
