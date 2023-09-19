import { useEffect, useState } from "react";
import { Record } from "../../types";
import Button from "../Button/Button";
import "./NewRecordForm.scss";
import Rating from "../Rating/Rating";

interface NewRecordFormProps {
  actionOnSubmit: (newRecord: Omit<Record, "id">) => void;
}

const NewRecordForm = ({
  actionOnSubmit,
}: NewRecordFormProps): React.ReactElement => {
  const [canSubmit, setCanSubmit] = useState(false);

  const initialRecordData: Omit<Record, "id"> = {
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

  const [newRecord, setNewRecord] =
    useState<Omit<Record, "id">>(initialRecordData);

  const addNewRecord = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNewRecord((newRecord) => ({
      ...newRecord,
      [event.target.id]: event.target.value,
    }));
  };

  const handleRating = (num: number) => {
    setNewRecord({ ...newRecord, rating: num });
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    actionOnSubmit(newRecord);
  };

  useEffect(() => {
    setCanSubmit(
      Object.values(newRecord).every((value) => {
        return Boolean(value);
      }),
    );
  }, [newRecord]);

  return (
    <form className="new-record" onSubmit={submit}>
      <div className="new-record__group">
        <label htmlFor="artist" className="new-record__label">
          Artist
        </label>
        <input
          type="text"
          id="artist"
          className="new-record__input"
          value={newRecord.artist}
          onChange={addNewRecord}
          aria-required="true"
        />
      </div>
      <div className="new-record__group">
        <label htmlFor="record" className="new-record__label">
          Record
        </label>
        <input
          type="text"
          id="record"
          className="new-record__input"
          value={newRecord.record}
          onChange={addNewRecord}
          aria-required="true"
        />
      </div>
      <div className="new-record__group">
        <label htmlFor="releaseDate" className="new-record__label">
          Release Year
        </label>
        <input
          type="number"
          id="releaseDate"
          className="new-record__input"
          min="1500"
          max="2023"
          value={newRecord.releaseDate === 0 ? "" : newRecord.releaseDate}
          onChange={addNewRecord}
          aria-required="true"
        />
      </div>
      <div className="new-record__group">
        <label htmlFor="rating" className="new-record__label">
          Rating {newRecord.rating}/5
          <Rating value={newRecord.rating} actionOnClick={handleRating} />
        </label>
      </div>
      <div className="new-record__group">
        <label htmlFor="description" className="new-record__label">
          Description
        </label>
        <textarea
          id="description"
          className="new-record__input new-record__input--textarea"
          maxLength={400}
          value={newRecord.description}
          onChange={addNewRecord}
          aria-required="true"
        />
      </div>
      <div className="new-record__group">
        <label htmlFor="length" className="new-record__label">
          Length
        </label>
        <input
          type="text"
          id="length"
          className="new-record__input"
          value={newRecord.length}
          onChange={addNewRecord}
          aria-required="true"
        />
      </div>
      <div className="new-record__group">
        <label htmlFor="label" className="new-record__label">
          Label
        </label>
        <input
          type="text"
          id="label"
          className="new-record__input"
          value={newRecord.label}
          onChange={addNewRecord}
          aria-required="true"
        />
      </div>
      <div className="new-record__group">
        <label htmlFor="genres" className="new-record__label">
          Genres
        </label>
        <input
          type="text"
          id="genres"
          className="new-record__input"
          value={newRecord.genres}
          onChange={addNewRecord}
          aria-required="true"
        />
      </div>
      <div className="new-record__group">
        <label htmlFor="cover" className="new-record__label">
          Image URL
        </label>
        <input
          type="url"
          id="cover"
          className="new-record__input"
          value={newRecord.cover}
          onChange={addNewRecord}
          aria-required="true"
        />
      </div>
      <Button
        className="new-record__button"
        type="submit"
        disabled={!canSubmit}
      >
        Add
      </Button>
    </form>
  );
};

export default NewRecordForm;
