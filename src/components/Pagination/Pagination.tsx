import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import "./Pagination.scss";

interface PaginationProps {
  currentPage: string;
  limitPerPage: number;
}

const Pagination = ({ currentPage, limitPerPage }: PaginationProps) => {
  const { pathname } = useLocation();
  const recordCount = useAppSelector((state) => state.recordsState.recordCount);

  const [searchParams] = useSearchParams();

  const setUrl = (selectedPage: number) => {
    if (searchParams.has("page")) {
      searchParams.delete("page");
    }

    const urlParamsWithoutPage = searchParams.toString();
    const urlParamsWithPage = `${
      urlParamsWithoutPage ? urlParamsWithoutPage + "&" : ""
    }page=${selectedPage}`;

    return urlParamsWithPage;
  };

  const nextPage = currentPage ? +currentPage + 1 : 1;
  const previousPage = currentPage ? +currentPage - 1 : 1;
  const maxPages = Math.ceil(recordCount / limitPerPage);
  const initialPage = 1;

  return (
    <div className="pagination">
      {previousPage >= initialPage && (
        <Link
          to={{
            pathname: pathname,
            search: setUrl(previousPage),
          }}
          className="pagination__previous-page"
        >
          {"Previous"}
        </Link>
      )}
      <ul className="pagination__pages-list">
        {maxPages > 1 &&
          [...Array(maxPages)].map((_page, pageIndex) => {
            const pageNumber = pageIndex + 1;
            const pageId = `page${pageNumber}`;

            return (
              <li
                key={pageId}
                className={`pagination__page${
                  pageNumber === +currentPage ? "--active" : ""
                }`}
              >
                <Link
                  to={{
                    pathname: pathname,
                    search: setUrl(pageNumber),
                  }}
                  className={`pagination__page${
                    pageNumber === +currentPage ? " current" : " visuallyhidden"
                  }`}
                  aria-label={`Go to Page ${pageNumber}`}
                  {...(pageNumber === +currentPage && {
                    "aria-current": "page",
                  })}
                >
                  {pageNumber}
                </Link>
              </li>
            );
          })}
      </ul>
      {nextPage <= maxPages && (
        <Link
          to={{
            pathname: pathname,
            search: setUrl(nextPage),
          }}
          className="pagination__next-page"
        >
          {"Next"}
        </Link>
      )}
    </div>
  );
};

export default Pagination;
