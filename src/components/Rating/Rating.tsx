import "./Rating.scss";

interface RatingProps {
  value: number;
  className?: string;
  actionOnClick: (ratingNumber: number) => void;
}

const Rating = ({ value, actionOnClick }: RatingProps) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_star, index) => {
        index += 1;
        return (
          <button
            id="rating"
            key={index}
            type="button"
            onClick={() => actionOnClick(index)}
            className="star-rating__button"
          >
            <img
              src={`/public/images/${
                value >= index ? "star-solid.svg" : "star-outline.svg"
              }`}
              alt={`${value >= index ? "Solid star" : "Outlined star"}`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
