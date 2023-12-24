import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import { auth } from "../../firebase";
import useRecordsApi from "../../hooks/useRecordsApi";
import { useAppSelector } from "../../store";
import {
  loadSelectedRecordActionCreator,
  modifyRecordActionCreator,
} from "../../store/records/recordsSlice";
import { Record } from "../../types";
import "./RecordDetailPage.scss";

const RecordDetailPage = (): React.ReactElement => {
  const record = useAppSelector((state) => state.recordsState.selectedRecord);
  const [user, isLoadingAuth] = useAuthState(auth);
  const isLoadingUi = useAppSelector((state) => state.uiState.isLoading);
  const { getRecordById, modifyRecord } = useRecordsApi();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (user && id) {
      (async () => {
        const selectedRecord = await getRecordById(id);

        if (selectedRecord) {
          dispatch(loadSelectedRecordActionCreator(selectedRecord));
        }
      })();
    }
  }, [dispatch, getRecordById, id, user]);

  const handleRating = async (ratingNumber: number) => {
    if (record) {
      const rateUpdate: Partial<Record> = {
        rating: ratingNumber,
      };
      const modifiedRecord = await modifyRecord(record.id, rateUpdate);

      if (modifiedRecord) {
        dispatch(modifyRecordActionCreator(modifiedRecord));
      }
    }
  };

  return !isLoadingAuth && !isLoadingUi && record ? (
    <>
      <Helmet>
        <title>{`Drocer - ${record.record} record from ${record.artist}`}</title>
        <meta
          name="description"
          content={`Record information from ${record.artist}'s record ${record.record}`}
        />
      </Helmet>
      <article className="record-detail">
        <img
          src={record.cover}
          alt={`${record.artist}'s cover for ${record.record}`}
          className="record-detail__cover-image"
          width="210"
          height="210"
        />
        <img
          src="../images/vinyl.webp"
          alt={"Black vinyl"}
          className="record-detail__cover-vinyl"
          width="210"
          height="210"
        />
        <div className="record-detail__information">
          <h2 className="record-detail__artist">{record.artist}</h2>
          <h3 className="record-detail__record_year">{`${record.record}, ${record.releaseDate}`}</h3>
          <Rating
            value={record.rating}
            actionOnClick={handleRating}
            isFormElement={false}
          />
          <p className="record-detail__description">{record.description}</p>
          <ul>
            <li>
              <span className="record-detail__list-title">Length</span>
              <span className="record-detail__list-value">{record.length}</span>
            </li>
            <li>
              <span className="record-detail__list-title">Label</span>
              <span className="record-detail__list-value">{record.label}</span>
            </li>
            <li>
              <span className="record-detail__list-title">Genre</span>
              <span className="record-detail__list-value">{record.genres}</span>
            </li>
          </ul>
        </div>
      </article>
    </>
  ) : (
    <></>
  );
};

export default RecordDetailPage;
