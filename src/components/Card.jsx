import { Link } from "react-router-dom";
import "../carousel.css";

function Card({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img src={movie.poster} alt={movie.title} />
    </Link>
  );
}

export default Card;
