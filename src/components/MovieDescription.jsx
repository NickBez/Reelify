import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MovieDescription({ query }) {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const res = await fetch(
          `https://wookie.codesubmit.io/movies/${movieId}`,
          {
            headers: { Authorization: "Bearer Wookie2021" },
          }
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie details", err);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-description">
      <div className="poster-column">
        <img src={movie.poster} alt={movie.title} />
      </div>
      <div className="details-column">
        <h2>
          {movie.title} ({movie.imdb_rating} / 10)
        </h2>
        <p>
          {movie.released_on.substring(0, 4)} | {movie.length} |{" "}
          {movie.director}
        </p>
        <p>
          <strong>Cast:</strong> {movie.cast.join(", ")}
        </p>
        <h3>Movie Description:</h3>
        <p>{movie.overview}</p>

        {/* If there's a search query, display it */}
        {query && <h3>Search Results for: {query}</h3>}
      </div>
    </div>
  );
}

export default MovieDescription;
