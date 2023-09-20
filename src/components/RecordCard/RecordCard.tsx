import React from "react";
import { NavLink } from "react-router-dom";
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

  const delteRecordById = async (id: string) => {
    await deleteRecord(id);
    dispatch(deleteRecordActionCreator(id));
  };

  const handleRating = async (ratingNumber: number) => {
    const rateUpdate: Partial<Record> = {
      rating: ratingNumber,
    };
    const modifiedRecord = await modifyRecord(id, rateUpdate);

    dispatch(modifyRecordActionCreator(modifiedRecord));
  };

  return (
    <article className="record">
      <Button
        className="record__button-icon"
        actionOnClick={() => {
          delteRecordById(id);
        }}
      >
        <img
          src="/images/delete_icon.svg"
          alt="Delete record"
          className="record__delete-icon"
          width="35"
          height="31"
        />
      </Button>
      <NavLink
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
      </NavLink>
      <div className="record__information">
        <h2 className="record__title">{artist}</h2>
        <span className="record__record-release-date">{`${record}, ${releaseDate}`}</span>
      </div>
      <Rating
        value={rating}
        actionOnClick={handleRating}
        isFormElement={false}
      />
    </article>
  );
};

export default RecordCard;
