import React from "react";
import { Link } from "react-router-dom";
import useRecordsApi from "../../hooks/useRecordsApi";
import { paths } from "../../routers/paths";
import { useAppDispatch } from "../../store";
import {
  deleteRecordActionCreator,
  modifyRecordActionCreator,
} from "../../store/records/recordsSlice";
import { Record } from "../../types";
import Button from "../Button/Button";
import Rating from "../Rating/Rating";
import "./RecordCard.scss";

interface RecordCardProps {
  record: Record;
  isLazy: boolean;
}

const RecordCard = ({
  record: { id, artist, record, releaseDate, cover, rating },
  isLazy,
}: RecordCardProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { deleteRecord, modifyRecord } = useRecordsApi();

  const deleteRecordById = async (id: string) => {
    await deleteRecord(id);
    dispatch(deleteRecordActionCreator(id));
  };

  const handleRating = async (ratingNumber: number) => {
    const rateUpdate: Partial<Record> = {
      rating: ratingNumber,
    };
    const modifiedRecord = await modifyRecord(id, rateUpdate);

    if (modifiedRecord) {
      dispatch(modifyRecordActionCreator(modifiedRecord));
    }
  };

  return (
    <article className="record">
      <Link
        to={`${paths.records}/${id}`}
        aria-label={`Link to details about ${artist}'s record ${record}`}
      >
        <img
          src={cover}
          alt={`${artist}'s cover for ${record}`}
          className="record__cover-image"
          width="250"
          height="250"
          {...(isLazy && { loading: "lazy" })}
        />
      </Link>

      <div className="record__information">
        <h2 className="record__title">{artist}</h2>
        <span className="record__record-release-date">{`${record}, ${releaseDate}`}</span>
      </div>
      <Rating
        value={rating}
        actionOnClick={handleRating}
        isFormElement={false}
      />
      <div className="record__modifiers">
        <Link to={`${paths.modify}/${id}`} className="record__modify-link">
          Modify
        </Link>
        <Button
          className="solid-light"
          actionOnClick={() => {
            deleteRecordById(id);
          }}
        >
          Delete
        </Button>
      </div>
    </article>
  );
};

export default RecordCard;
