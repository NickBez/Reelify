import "../carousel.css";

function Card({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <p>{movie.title}</p>
    </div>
  );
}

export default Card;
