// SearchResults.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "./Card"; // Import Card component to display movie details

function SearchResults({ bookmarkedMovies, toggleBookmark }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Access the query parameter from the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q"); // Get the value of 'q' from the URL

  useEffect(() => {
    if (searchQuery) {
      async function fetchMovies() {
        setIsLoading(true);
        setError("");
        try {
          const res = await fetch(
            `https://wookie.codesubmit.io/movies?q=${searchQuery}`,
            {
              headers: { Authorization: "Bearer Wookie2021" },
            }
          );
          const data = await res.json();

          // Ensure the response contains the 'movies' key
          if (data.movies && Array.isArray(data.movies)) {
            setMovies(data.movies); // Set movies to the 'movies' key in the response
          } else {
            setMovies([]); // If no valid movies found, set an empty array
            setError("No valid movies found.");
          }
        } catch (err) {
          setError("Error fetching data: " + err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovies();
    }
  }, [searchQuery]);

  if (isLoading) return <p>Loading search results...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Search Results for: "{searchQuery}"</h2>
      {movies.length === 0 ? (
        <p>No movies found for "{searchQuery}".</p>
      ) : (
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
      )}
    </div>
  );
}

export default SearchResults;
