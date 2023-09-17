import { render, screen } from "@testing-library/react";
import RecordCard from "./RecordCard";
import { recordMock } from "../../mocks/recordsMock";
import { Provider } from "react-redux";
import { store } from "../../store";
import { BrowserRouter } from "react-router-dom";

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

    test("Then it should show a button with an alternative text 'Delete record'", () => {
      const buttonIconAltText = "Delete record";
      const isLazy = false;

      render(
        <Provider store={store}>
          <BrowserRouter>
            <RecordCard record={recordMock} isLazy={isLazy} />,
          </BrowserRouter>
        </Provider>,
      );

      const imageIcon = screen.getByAltText(buttonIconAltText);

      expect(imageIcon).toBeInTheDocument();
    });
  });
});
