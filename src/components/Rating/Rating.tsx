import "./Rating.scss";

interface RatingProps {
  value: number;
  className?: string;
  actionOnClick: (ratingNumber: number) => void;
}

const Rating = ({ value, actionOnClick }: RatingProps) => {
  return (
    <>
      {[...Array(5)].map((_star, index) => {
        index += 1;
        const starId = index;
        return (
          <label
            htmlFor={`rating${starId}`}
            key={`star${starId}`}
            className="rating-label"
          >
            <button
              id={`rating${starId}`}
              key={`star${starId}`}
              type="button"
              onClick={() => actionOnClick(index)}
              className="star-rating__button"
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
          </label>
        );
      })}
    </>
  );
};

export default Rating;
