import { Link } from "react-router-dom";
import { paths } from "../../routers/paths";
import { useAppSelector } from "../../store";
import "./Pagination.scss";

interface PaginationProps {
  currentPage: string;
  limitPerPage: number;
}

const Pagination = ({ currentPage, limitPerPage: limit }: PaginationProps) => {
  const recordCount = useAppSelector((state) => state.recordsState.recordCount);

  const nextPage = currentPage ? +currentPage + 1 : 1;
  const previousPage = currentPage ? +currentPage - 1 : 1;
  const maxPages = Math.ceil(recordCount / limit);
  const initialPage = 1;

  return (
    <div className="pagination">
      {previousPage >= initialPage && (
        <Link
          to={{
            pathname: paths.records,
            search: `page=${previousPage}`,
          }}
          className="pagination__previous-page"
        >
          {"Previous"}
        </Link>
      )}
      <ul className="pagination__pages-list">
        {[...Array(maxPages)].map((_page, pageIndex) => {
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
                  pathname: paths.records,
                  search: `page=${pageNumber}`,
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
            pathname: paths.records,
            search: `page=${nextPage}`,
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
