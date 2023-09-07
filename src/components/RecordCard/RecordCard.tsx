import React from "react";
import { Record } from "../../types";

interface RecordCardProps {
  record: Record;
}

const RecordCard = ({
  record: { artist, record, releaseDate, cover },
}: RecordCardProps): React.ReactElement => {
  return (
    <article className="record">
      <img
        src={cover}
        alt={`${artist}'s cover for ${record}`}
        className="record__cover-image"
        width="250"
        height="250"
      />
      <div className="record__information">
        <h3 className="record__title">{artist}</h3>
        <span>{`${record}, ${releaseDate}`}</span>
      </div>
    </article>
  );
};

export default RecordCard;
