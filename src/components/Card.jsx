import { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../carousel.css";

function Card({ movie, className = "movie-card" }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className={className}
      aria-label={`View details for ${movie.title}`}
      title={movie.title}
    >
      <img
        src={movie.poster}
        alt={`${movie.title} poster`}
        loading="lazy"
        decoding="async"
      />
    </Link>
  );
}

Card.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default memo(Card);
