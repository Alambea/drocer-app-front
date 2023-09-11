import React from "react";
import { Record } from "../../types";
import "./RecordCard.scss";

interface RecordCardProps {
  record: Record;
  recordPosition: number;
}

const RecordCard = ({
  record: { artist, record, releaseDate, cover },
  recordPosition,
}: RecordCardProps): React.ReactElement => {
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
      <div className="record__information">
        <h2 className="record__title">{artist}</h2>
        <span className="record__record-release-date">{`${record}, ${releaseDate}`}</span>
      </div>
    </article>
  );
};

export default RecordCard;
