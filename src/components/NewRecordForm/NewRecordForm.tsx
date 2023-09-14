import Button from "../Button/Button";
import "./NewRecordForm.scss";

const NewRecordForm = (): React.ReactElement => {
  return (
    <form className="new-record">
      <div className="new-record__group">
        <label htmlFor="artist" className="new-record__label">
          Artist
        </label>
        <input type="text" id="artist" className="new-record__input" />
      </div>
      <div className="new-record__group">
        <label htmlFor="record" className="new-record__label">
          Record
        </label>
        <input type="text" id="record" className="new-record__input" />
      </div>
      <div className="new-record__group">
        <label htmlFor="releaseDate" className="new-record__label">
          Release Date
        </label>
        <input
          type="number"
          id="releaseDate"
          className="new-record__input"
          min="1500"
          max="2023"
        />
      </div>
      <div className="new-record__group">
        <label htmlFor="rating" className="new-record__label">
          Rating 1/5
        </label>
        <input
          type="range"
          id="rating"
          min="0"
          max="5"
          step="1"
          className="new-record__input"
        />
      </div>
      <div className="new-record__group">
        <label htmlFor="description" className="new-record__label">
          Description
        </label>
        <textarea
          id="description"
          className="new-record__input new-record__input--textarea"
        ></textarea>
      </div>
      <div className="new-record__group">
        <label htmlFor="length" className="new-record__label">
          Length
        </label>
        <input type="text" id="length" className="new-record__input" />
      </div>
      <div className="new-record__group">
        <label htmlFor="label" className="new-record__label">
          Label
        </label>
        <input type="text" id="label" className="new-record__input" />
      </div>
      <div className="new-record__group">
        <label htmlFor="genres" className="new-record__label">
          Genres
        </label>
        <input type="text" id="genres" className="new-record__input" />
      </div>
      <div className="new-record__group">
        <label htmlFor="cover" className="new-record__label">
          Image URL
        </label>
        <input type="url" id="cover" className="new-record__input" />
      </div>
      <Button className="new-record__button" disabled={true}>
        Add
      </Button>
    </form>
  );
};

export default NewRecordForm;
