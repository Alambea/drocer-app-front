import "./Rating.scss";

interface RatingProps {
  value: number;
  className?: string;
  actionOnClick: (ratingNumber: number) => void;
  isFormElement: boolean;
}

const Rating = ({ value, actionOnClick, isFormElement }: RatingProps) => {
  return (
    <ul className="rating">
      {[...Array(5)].map((_star, index) => {
        index += 1;
        const starId = index;

        return (
          <li key={`li-${starId}`} className="rating__star-group">
            <button
              key={`button-star${starId}`}
              type="button"
              onClick={() => actionOnClick(index)}
              className="rating__button"
              {...(isFormElement && { id: `rating${starId}` })}
            >
              <img
                src={`/images/${
                  value >= index ? "star-solid.svg" : "star-outline.svg"
                }`}
                alt={`${
                  value >= index
                    ? `Solid star number ${index}`
                    : `Outlined star number ${index}`
                }`}
                width="25"
                height="23"
              />
            </button>
            {isFormElement && (
              <label
                htmlFor={`rating${starId}`}
                key={`label-star${starId}`}
                className="rating__label"
              >
                {index}
              </label>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Rating;
