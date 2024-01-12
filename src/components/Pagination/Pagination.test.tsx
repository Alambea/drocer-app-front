import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";
import { Provider } from "react-redux";
import { recordsMock } from "../../mocks/recordsMock";
import { setupStore } from "../../store";
import { BrowserRouter } from "react-router-dom";

describe("Given a Pagination component", () => {
  describe("When it is rendered receives an empty string as a currentPage and a limitPerPage 4 and there're 4 records in the store", () => {
    test("Then it should show links containing 'next' and 'Previous'", () => {
      const expectedNextLink = /next/i;
      const expectedPreviousLink = /previous/i;
      const currentPage = "";
      const limitPerPage = 4;

      const store = setupStore({
        recordsState: { records: recordsMock, recordCount: recordsMock.length },
      });

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Pagination currentPage={currentPage} limitPerPage={limitPerPage} />
          </Provider>
        </BrowserRouter>,
      );

      const nextLink = screen.getByRole("link", { name: expectedNextLink });
      const previousLink = screen.getByRole("link", {
        name: expectedPreviousLink,
      });

      expect(nextLink).toBeInTheDocument();
      expect(previousLink).toBeInTheDocument();
    });
  });

  describe("When it is rendered receives a currentPage '1' and a limitPerPage 4 and there're 4 records in the store", () => {
    test("Then it shouldn't show a link containing 'next' neither 'Previous'", () => {
      const expectedNextLink = /next/i;
      const expectedPreviousLink = /previous/i;
      const currentPage = "1";
      const limitPerPage = 4;

      const store = setupStore({
        recordsState: { records: recordsMock, recordCount: recordsMock.length },
      });

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Pagination currentPage={currentPage} limitPerPage={limitPerPage} />
          </Provider>
        </BrowserRouter>,
      );

      const nextLink = screen.queryByRole("link", { name: expectedNextLink });
      const previousLink = screen.queryByRole("link", {
        name: expectedPreviousLink,
      });

      expect(nextLink).not.toBeInTheDocument();
      expect(previousLink).not.toBeInTheDocument();
    });
  });

  describe("When it is rendered receives a currentPage '1' and a limitPerPage 2 and there're 4 records in the store", () => {
    test("Then it should show links containing 'next', '1' and '2' and not show a link containing 'previous'", () => {
      const expectedNextLink = /next/i;
      const expectedPreviousLink = /previous/i;
      const expectedPageOne = /go to page 1/i;
      const expectedPageTwo = /go to page 2/i;
      const currentPage = "1";
      const limitPerPage = 2;

      const store = setupStore({
        recordsState: {
          records: recordsMock,
          recordCount: recordsMock.length - 1,
        },
      });

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Pagination currentPage={currentPage} limitPerPage={limitPerPage} />
          </Provider>
        </BrowserRouter>,
      );

      const nextLink = screen.getByRole("link", { name: expectedNextLink });
      const pageOneLink = screen.getByRole("link", {
        name: expectedPageOne,
      });
      const pageTwoLink = screen.getByRole("link", {
        name: expectedPageTwo,
      });
      const previousLink = screen.queryByRole("link", {
        name: expectedPreviousLink,
      });

      expect(nextLink).toBeInTheDocument();
      expect(previousLink).not.toBeInTheDocument();
      expect(pageOneLink).toBeInTheDocument();
      expect(pageTwoLink).toBeInTheDocument();
    });
  });

  describe("When it is rendered receives a currentPage '2' and a limitPerPage 2 and there're 4 records in the store", () => {
    test("Then it should show links containing 'previous', '1' and '2' and not show a link containing 'next'", () => {
      const expectedNextLink = /next/i;
      const expectedPreviousLink = /previous/i;
      const expectedPageOne = /go to page 1/i;
      const expectedPageTwo = /go to page 2/i;
      const currentPage = "2";
      const limitPerPage = 2;

      const store = setupStore({
        recordsState: {
          records: recordsMock,
          recordCount: recordsMock.length,
        },
      });

      render(
        <BrowserRouter>
          <Provider store={store}>
            <Pagination currentPage={currentPage} limitPerPage={limitPerPage} />
          </Provider>
        </BrowserRouter>,
      );

      const nextLink = screen.queryByRole("link", { name: expectedNextLink });
      const pageOneLink = screen.getByRole("link", {
        name: expectedPageOne,
      });
      const pageTwoLink = screen.getByRole("link", {
        name: expectedPageTwo,
      });
      const previousLink = screen.getByRole("link", {
        name: expectedPreviousLink,
      });

      expect(nextLink).not.toBeInTheDocument();
      expect(previousLink).toBeInTheDocument();
      expect(pageOneLink).toBeInTheDocument();
      expect(pageTwoLink).toBeInTheDocument();
    });
  });
});
