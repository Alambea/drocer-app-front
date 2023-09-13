import React from "react";
import { Record } from "../../types";
import Button from "../Button/Button";
import { useAppDispatch } from "../../store";
import { deleteRecordActionCreator } from "../../store/records/recordsSlice";
import "./RecordCard.scss";
import useRecordsApi from "../../hooks/useRecordsApi";

interface RecordCardProps {
  record: Record;
  recordPosition: number;
}

const RecordCard = ({
  record: { id, artist, record, releaseDate, cover },
  recordPosition,
}: RecordCardProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { deleteRecord } = useRecordsApi();

  const delteRecordById = async (id: string) => {
    await deleteRecord(id);
    dispatch(deleteRecordActionCreator(id));
  };

  return (
    <article className="record">
      <img
        src={cover}
        alt={`${artist}'s cover for ${record}`}
        className="record__cover-image"
        width="250"
        height="250"
        loading={recordPosition > 2 ? "lazy" : "eager"}
      />
      <Button
        className="record__button-icon"
        actionOnClick={() => {
          delteRecordById(id);
        }}
      >
        <img
          src="./images/delete_icon.svg"
          alt="Delete record"
          className="record__delete-icon"
          width="35"
          height="31"
          loading="eager"
        />
      </Button>
      <div className="record__information">
        <h2 className="record__title">{artist}</h2>
        <span className="record__record-release-date">{`${record}, ${releaseDate}`}</span>
      </div>
    </article>
  );
};

export default RecordCard;
