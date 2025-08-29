import { useEffect, useState } from "react";
import Carousel from "./Carousel";

function MoviesByGenre({ query }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("https://wookie.codesubmit.io/movies", {
          headers: { Authorization: "Bearer Wookie2021" },
        });
        const data = await res.json();
        setMovies(data.movies);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;

  // Search results
  if (query.length >= 3) {
    const filtered = movies.filter((m) =>
      m.title.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) return <p>No movies found for "{query}"</p>;

    return <Carousel movies={filtered} />;
  }

  // Otherwise, show genre carousels
  const genres = [...new Set(movies.flatMap((m) => m.genres))];

  return (
    <>
      {genres.map((genre) => {
        const genreMovies = movies.filter((m) => m.genres.includes(genre));
        return <Carousel key={genre} movies={genreMovies} title={genre} />;
      })}
    </>
  );
}

export default MoviesByGenre;
