import { render, screen } from "@testing-library/react";
import RecordCard from "./RecordCard";
import { recordMock } from "../../mocks/recordsMock";
import { Provider } from "react-redux";
import { store } from "../../store";

const recordPosition = 1;

describe("Given a RecordCard component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a heading 'FKA Twigs'", () => {
      const headingText = "FKA Twigs";

      render(
        <Provider store={store}>
          <RecordCard record={recordMock} recordPosition={recordPosition} />,
        </Provider>,
      );

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show an image with an alternative text 'FKA Twigs's cover for LP1'", () => {
      const imgAltText = `${recordMock.artist}'s cover for ${recordMock.record}`;

      render(
        <Provider store={store}>
          <RecordCard record={recordMock} recordPosition={recordPosition} />,
        </Provider>,
      );

      const image = screen.getByAltText(imgAltText);

      expect(image).toBeInTheDocument();
    });

    test("Then it should show a text 'LP1, 2014'", () => {
      const albumReleaseDateText = `${recordMock.record}, ${recordMock.releaseDate}`;

      render(
        <Provider store={store}>
          <RecordCard record={recordMock} recordPosition={recordPosition} />,
        </Provider>,
      );

      const textElement = screen.getByText(albumReleaseDateText);

      expect(textElement).toBeInTheDocument();
    });

    test("Then it should show a button with an alternative text 'Delete record'", () => {
      const buttonIconAltText = "Delete record";

      render(
        <Provider store={store}>
          <RecordCard record={recordMock} recordPosition={recordPosition} />,
        </Provider>,
      );

      const imageIcon = screen.getByAltText(buttonIconAltText);

      expect(imageIcon).toBeInTheDocument();
    });
  });
});
