import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Card from "./Card";

function MoviesByGenre({ query, bookmarkedMovies, toggleBookmark }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");

        const url =
          query.length > 0
            ? `https://wookie.codesubmit.io/movies?q=${query}`
            : "https://wookie.codesubmit.io/movies";

        const res = await fetch(url, {
          headers: { Authorization: "Bearer Wookie2021" },
        });

        if (!res.ok) throw new Error("Failed to fetch movies");

        const data = await res.json();
        setMovies(data.movies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  if (loading) return <p className="loading">Loading Movies...</p>;
  if (error) return <p>{error}</p>;
  const hasBookmarkedMovies = bookmarkedMovies.length > 0;

  if (query.length >= 3) {
    if (movies.length === 0) return <p>No movies found for "{query}"</p>;

    return (
      <div>
        {hasBookmarkedMovies && (
          <section className="carousel-container">
            <h2>Bookmarked Movies</h2>
            <Carousel
              movies={bookmarkedMovies}
              title="Bookmarked Movies"
              bookmarkedMovies={bookmarkedMovies}
              toggleBookmark={toggleBookmark}
            />
          </section>
        )}
        <div className="movie-cards-container">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              bookmarkedMovies={bookmarkedMovies}
              toggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      </div>
    );
  }

  const genres = [...new Set(movies.flatMap((m) => m.genres))];

  return (
    <section className="main">
      {hasBookmarkedMovies && (
        <section className="carousel-container">
          <Carousel
            movies={bookmarkedMovies}
            title="Bookmarked Movies"
            bookmarkedMovies={bookmarkedMovies}
            toggleBookmark={toggleBookmark}
          />
        </section>
      )}
      {genres.map((genre) => {
        const genreMovies = movies.filter((m) => m.genres.includes(genre));
        return (
          <Carousel
            key={genre}
            movies={genreMovies}
            title={genre}
            bookmarkedMovies={bookmarkedMovies}
            toggleBookmark={toggleBookmark}
          />
        );
      })}
    </section>
  );
}

export default MoviesByGenre;
