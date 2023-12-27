import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { recordMock } from "../../mocks/recordsMock";
import { store } from "../../store";
import RecordCard from "./RecordCard";

describe("Given a RecordCard component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a heading 'FKA Twigs'", () => {
      const headingText = "FKA Twigs";
      const isLazy = false;

      render(
        <Provider store={store}>
          <BrowserRouter>
            <RecordCard record={recordMock} isLazy={isLazy} />,
          </BrowserRouter>
        </Provider>,
      );

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show an image with an alternative text 'FKA Twigs's cover for LP1'", () => {
      const imgAltText = `${recordMock.artist}'s cover for ${recordMock.record}`;
      const isLazy = true;

      render(
        <Provider store={store}>
          <BrowserRouter>
            <RecordCard record={recordMock} isLazy={isLazy} />,
          </BrowserRouter>
        </Provider>,
      );

      const image = screen.getByAltText(imgAltText);

      expect(image).toBeInTheDocument();
    });

    test("Then it should show a text 'LP1, 2014'", () => {
      const albumReleaseDateText = `${recordMock.record}, ${recordMock.releaseDate}`;
      const isLazy = false;

      render(
        <Provider store={store}>
          <BrowserRouter>
            <RecordCard record={recordMock} isLazy={isLazy} />,
          </BrowserRouter>
        </Provider>,
      );

      const textElement = screen.getByText(albumReleaseDateText);

      expect(textElement).toBeInTheDocument();
    });

    test("Then it should show a button with a text 'Delete'", () => {
      const buttonText = "Delete";
      const isLazy = false;

      render(
        <Provider store={store}>
          <BrowserRouter>
            <RecordCard record={recordMock} isLazy={isLazy} />,
          </BrowserRouter>
        </Provider>,
      );

      const deleteButton = screen.getByRole("button", { name: buttonText });

      expect(deleteButton).toBeInTheDocument();
    });
  });
});
