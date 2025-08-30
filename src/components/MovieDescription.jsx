import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

function MovieDescription({
  bookmarkedMovies = [],
  toggleBookmark = () => {},
}) {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovieDetails() {
      try {
        setError("");
        setMovie(null);

        const res = await fetch(
          `https://wookie.codesubmit.io/movies/${movieId}`,
          {
            headers: { Authorization: "Bearer Wookie2021" },
            signal: controller.signal,
          }
        );

        if (!res.ok) throw new Error(`Failed to fetch movie (${res.status})`);
        const data = await res.json();

        // Some APIs wrap detail as object or { movie: {...} }. Handle both.
        const m = data?.movie ?? data;
        setMovie(m);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message || "Something went wrong fetching this movie.");
      }
    }

    fetchMovieDetails();
    return () => controller.abort();
  }, [movieId]);

  if (error) return <p className="error">{error}</p>;
  if (!movie) return <p className="loading">Loading Movie...</p>;

  // ---- Presentational helpers ----
  const year = movie.released_on
    ? new Date(movie.released_on).getFullYear()
    : "";
  const length = movie.length || "";
  const castList = Array.isArray(movie.cast) ? movie.cast.join(", ") : "";

  // Normalize directors: "A,B" -> "A, B"; if already spaced, keep as is
  const directorText = (() => {
    const d = movie.director || "";
    if (!d) return "";
    // If it contains commas without following space, normalize, else keep.
    return d.includes(",")
      ? d
          .split(",")
          .map((s) => s.trim())
          .join(", ")
      : d;
  })();

  const isBookmarked = bookmarkedMovies.some((m) => m.id === movie.id);

  return (
    <div className="movie-description">
      <div className="poster-column">
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="details-column">
        <h2>
          {movie.title}{" "}
          {typeof movie.imdb_rating === "number"
            ? `(${movie.imdb_rating} / 10)`
            : ""}
        </h2>

        <p>
          {year}
          {year && (length || directorText) ? " | " : ""}
          {length}
          {length && directorText ? " | " : ""}
          {directorText}
        </p>

        {castList && (
          <p>
            <strong>Cast:</strong> {castList}
          </p>
        )}

        <h3>Movie Description:</h3>
        <p>{movie.overview || "No description available."}</p>

        <button
          type="button"
          aria-pressed={isBookmarked}
          onClick={() => toggleBookmark(movie)}
        >
          {isBookmarked ? "Remove from Bookmarks" : "Add to Bookmarks"}
        </button>
      </div>
    </div>
  );
}

MovieDescription.propTypes = {
  bookmarkedMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  toggleBookmark: PropTypes.func,
};

export default MovieDescription;
