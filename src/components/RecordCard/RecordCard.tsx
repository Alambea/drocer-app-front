import React from "react";
import { Record } from "../../types";
import Button from "../Button/Button";
import { useAppDispatch } from "../../store";
import { deleteRecordActionCreator } from "../../store/records/recordsSlice";
import "./RecordCard.scss";
import useRecordsApi from "../../hooks/useRecordsApi";
import { NavLink } from "react-router-dom";
import { paths } from "../../routers/paths";

interface RecordCardProps {
  record: Record;
  isLazy: boolean;
}

const RecordCard = ({
  record: { id, artist, record, releaseDate, cover },
  isLazy,
}: RecordCardProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { deleteRecord } = useRecordsApi();

  const delteRecordById = async (id: string) => {
    await deleteRecord(id);
    dispatch(deleteRecordActionCreator(id));
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
        <div className="record__information">
          <h2 className="record__title">{artist}</h2>
          <span className="record__record-release-date">{`${record}, ${releaseDate}`}</span>
        </div>
      </NavLink>
    </article>
  );
};

export default RecordCard;
