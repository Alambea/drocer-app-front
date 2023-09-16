import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppSelector } from "../../store";
import useRecordsApi from "../../hooks/useRecordsApi";
import { auth } from "../../firebase";
import { loadSelectedRecordActionCreator } from "../../store/records/recordsSlice";
import "./RecordDetailPage.scss";

const RecordDetailPage = (): React.ReactElement => {
  const record = useAppSelector((state) => state.recordsState.selectedRecord);
  const [user, isLoadingAuth] = useAuthState(auth);
  const isLoadingUi = useAppSelector((state) => state.uiState.isLoading);
  const { getRecordById } = useRecordsApi();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [rating, setRating] = useState(record?.rating);

  useEffect(() => {
    if (user && id) {
      (async () => {
        const selectedRecord = await getRecordById(id as string);

        if (selectedRecord) {
          dispatch(loadSelectedRecordActionCreator(selectedRecord));
        }
      })();
    }
  }, [dispatch, getRecordById, id, user]);

  const rateRecord = () => {
    setRating(rating);
  };

  return !isLoadingAuth && !isLoadingUi && record ? (
    <article className="record-detail">
      <img
        src={record.cover}
        alt={`${record.artist}'s cover for ${record.record}`}
        className="record-detail__cover-image"
        width="210"
        height="210"
      />
      <img
        src="..//images/vinyl.webp"
        alt={"Black vinyl"}
        className="record-detail__cover-vinyl"
        width="210"
        height="210"
      />
      <div className="record-detail__information">
        <h2 className="record-detail__artist">{record.artist}</h2>
        <h3 className="record-detail__record_year">{`${record.record},${record.releaseDate}`}</h3>
        <input
          type="range"
          id="rating"
          min="0"
          max="5"
          step="1"
          className="record-detail__rating"
          value={rating}
          onChange={rateRecord}
          disabled={true}
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
  ) : (
    <></>
  );
};

export default RecordDetailPage;
