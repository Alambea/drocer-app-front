import { useState, useEffect } from "react";
import { Record } from "../../types";
import Button from "../Button/Button";
import "./NewRecordForm.scss";

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
        />
      </div>
      <div className="new-record__group">
        <label htmlFor="rating" className="new-record__label">
          Rating {newRecord.rating}/5
        </label>
        <input
          type="range"
          id="rating"
          min="0"
          max="5"
          step="1"
          className="new-record__input"
          value={newRecord.rating}
          onChange={addNewRecord}
        />
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
        ></textarea>
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
        />
      </div>
      <Button className="new-record__button" disabled={!canSubmit}>
        Add
      </Button>
    </form>
  );
};

export default NewRecordForm;
