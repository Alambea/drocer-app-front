import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet";
import { useNavigate, useSearchParams } from "react-router-dom";
import ExtraInformation from "../../components/ExtraInformation/ExtraInformation";
import Pagination from "../../components/Pagination/Pagination";
import RecordsList from "../../components/RecordList/RecordsList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { auth } from "../../firebase";
import useRecordsApi from "../../hooks/useRecordsApi";
import { paths } from "../../routers/paths";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  loadRecordCountActionCreator,
  loadRecordsActionCreator,
} from "../../store/records/recordsSlice";
import { preloadImage } from "../../utils/preloadImage";
import "./RecordsListPage.scss";

const RecordsListPage = (): React.ReactElement => {
  const [user, isLoadingAuth] = useAuthState(auth);
  const navigate = useNavigate();
  const isLoadingUi = useAppSelector((state) => state.uiState.isLoading);
  const records = useAppSelector((state) => state.recordsState.records);
  const recordCount = useAppSelector((state) => state.recordsState.recordCount);
  const { getRecords } = useRecordsApi();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  let currentPage = searchParams.get("page");
  const currentQuery = searchParams.get("query") ?? "";

  const hasRecords = records.length > 0;
  const noRecordsFoundText =
    recordCount === 0 ? "Add your first record" : "You don't have more records";

  const limitPerPage = 12;

  if (!currentPage) {
    currentPage = "1";
  }

  useEffect(() => {
    if (user && currentPage && +currentPage > 0) {
      (async () => {
        const offset = (+currentPage - 1) * limitPerPage;

        const recordsData = await getRecords(
          limitPerPage,
          offset,
          currentQuery,
        );

        if (recordsData?.records && recordsData.records.length > 0) {
          dispatch(loadRecordsActionCreator(recordsData.records));
          dispatch(loadRecordCountActionCreator(recordsData.recordCount));

          preloadImage(recordsData.records[0].cover);
        }
      })();
    }
  }, [currentPage, dispatch, getRecords, user, currentQuery]);

  const handleSearch = async (querySearch: string) => {
    navigate({
      pathname: paths.records + paths.search,
      search: `query=${querySearch}`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Drocer - Records</title>
        <meta name="description" content="List of all your records" />
      </Helmet>
      {hasRecords
        ? !isLoadingAuth && (
            <>
              <h1 className="records-page__title">Records</h1>
              {user && (
                <SearchBar
                  actionOnSubmit={handleSearch}
                  currentQuery={currentQuery}
                />
              )}

              <RecordsList />
              <Pagination
                currentPage={currentPage}
                limitPerPage={limitPerPage}
              />
            </>
          )
        : !isLoadingUi &&
          !isLoadingAuth && (
            <ExtraInformation text={noRecordsFoundText}>
              <img
                src="/images/empty_records.svg"
                alt="Empty record"
                width="165"
                height="114"
              />
            </ExtraInformation>
          )}
    </>
  );
};

export default RecordsListPage;
