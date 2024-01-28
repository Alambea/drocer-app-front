import { useEffect, useState } from "react";
import { Record } from "../../types";
import Button from "../Button/Button";
import Rating from "../Rating/Rating";
import "./RecordForm.scss";

interface RecordFormProps {
  actionOnSubmit: (record: Record) => void;
  recordToUpdate?: Record;
}

const RecordForm = ({
  actionOnSubmit,
  recordToUpdate,
}: RecordFormProps): React.ReactElement => {
  const [canSubmit, setCanSubmit] = useState(false);

  const emptyRecordData: Omit<Record, "id"> = {
    artist: "",
    record: "",
    releaseDate: 0,
    rating: 0,
    description: "",
    length: "",
    label: "",
    genres: "",
    cover: "",
  };

  const initialRecordData = recordToUpdate ?? emptyRecordData;

  const [updatedRecord, setUpdatedRecord] =
    useState<Omit<Record, "id">>(initialRecordData);

  const updateRecord = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setUpdatedRecord((updatedRecord) => ({
      ...updatedRecord,
      [event.target.id]: event.target.value,
    }));
  };

  const handleRating = (num: number) => {
    setUpdatedRecord({ ...updatedRecord, rating: num });
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    actionOnSubmit(updatedRecord as Record);
  };

  useEffect(() => {
    setCanSubmit(
      Object.values(updatedRecord).every((value) => {
        return Boolean(value);
      }),
    );
  }, [updatedRecord]);

  return (
    <form className="record-form" onSubmit={submit}>
      <div className="record-form__group">
        <label htmlFor="artist" className="record-form__label">
          Artist
        </label>
        <input
          type="text"
          id="artist"
          className="record-form__input"
          value={updatedRecord.artist}
          onChange={updateRecord}
          aria-required="true"
        />
      </div>
      <div className="record-form__group">
        <label htmlFor="record" className="record-form__label">
          Record
        </label>
        <input
          type="text"
          id="record"
          className="record-form__input"
          value={updatedRecord.record}
          onChange={updateRecord}
          aria-required="true"
        />
      </div>
      <div className="record-form__group">
        <label htmlFor="releaseDate" className="record-form__label">
          Release Year
        </label>
        <input
          type="number"
          id="releaseDate"
          className="record-form__input"
          min="1500"
          max="2023"
          value={
            updatedRecord.releaseDate === 0 ? "" : updatedRecord.releaseDate
          }
          onChange={updateRecord}
          aria-required="true"
        />
      </div>
      <div className="record-form__group">
        <span className="record-form__label record-form__label--rating">
          {`Rating ${updatedRecord.rating}/5`}
        </span>
        <Rating
          value={updatedRecord.rating}
          actionOnClick={handleRating}
          isFormElement={true}
        />
      </div>
      <div className="record-form__group">
        <label htmlFor="description" className="record-form__label">
          Description
        </label>
        <textarea
          id="description"
          className="record-form__input record-form__input--textarea"
          maxLength={400}
          value={updatedRecord.description}
          onChange={updateRecord}
          aria-required="true"
        />
      </div>
      <div className="record-form__group">
        <label htmlFor="length" className="record-form__label">
          Length
        </label>
        <input
          type="text"
          id="length"
          className="record-form__input"
          value={updatedRecord.length}
          onChange={updateRecord}
          aria-required="true"
        />
      </div>
      <div className="record-form__group">
        <label htmlFor="label" className="record-form__label">
          Label
        </label>
        <input
          type="text"
          id="label"
          className="record-form__input"
          value={updatedRecord.label}
          onChange={updateRecord}
          aria-required="true"
        />
      </div>
      <div className="record-form__group">
        <label htmlFor="genres" className="record-form__label">
          Genres
        </label>
        <input
          type="text"
          id="genres"
          className="record-form__input"
          value={updatedRecord.genres}
          onChange={updateRecord}
          aria-required="true"
        />
      </div>
      <div className="record-form__group">
        <label htmlFor="cover" className="record-form__label">
          Image URL
        </label>
        <input
          type="url"
          id="cover"
          className="record-form__input"
          value={updatedRecord.cover}
          onChange={updateRecord}
          aria-required="true"
        />
      </div>
      <Button className="solid-light-wide" type="submit" disabled={!canSubmit}>
        {recordToUpdate ? "Modify" : "Add"}
      </Button>
    </form>
  );
};

export default RecordForm;
