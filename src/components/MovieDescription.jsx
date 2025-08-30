// MovieDescription.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParams to access URL params

function MovieDescription({ bookmarkedMovies, toggleBookmark }) {
  const { movieId } = useParams(); // Get the movieId from the URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const res = await fetch(
          `https://wookie.codesubmit.io/movies/${movieId}`,
          { headers: { Authorization: "Bearer Wookie2021" } }
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

  // Check if the movie is bookmarked
  const isBookmarked = bookmarkedMovies.some((m) => m.id === movie.id);

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

        {/* Bookmark toggle button */}
        <button onClick={() => toggleBookmark(movie)}>
          {isBookmarked ? "Remove from Bookmarks" : "Add to Bookmarks"}
        </button>
      </div>
    </div>
  );
}

export default MovieDescription;
