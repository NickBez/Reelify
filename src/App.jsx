// App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MoviesByGenre from "./components/MoviesByGenre";
import MovieDescription from "./components/MovieDescription";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";

function App() {
  const [query, setQuery] = useState(""); // Search query state
  const [bookmarkedMovies, setBookmarkedMovies] = useState(
    JSON.parse(localStorage.getItem("bookmarkedMovies")) || [] // Load bookmarks from localStorage
  );

  // Update localStorage when the bookmarkedMovies state changes
  useEffect(() => {
    localStorage.setItem("bookmarkedMovies", JSON.stringify(bookmarkedMovies));
  }, [bookmarkedMovies]);

  // Function to toggle bookmark status for a movie
  const toggleBookmark = (movie) => {
    setBookmarkedMovies((prevBookmarks) => {
      if (prevBookmarks.some((m) => m.id === movie.id)) {
        return prevBookmarks.filter((m) => m.id !== movie.id); // Remove bookmark
      } else {
        return [...prevBookmarks, movie]; // Add bookmark
      }
    });
  };

  return (
    <Router>
      <Header query={query} setQuery={setQuery} />
      <Routes>
        <Route
          path="/"
          element={
            <MoviesByGenre
              query={query}
              bookmarkedMovies={bookmarkedMovies}
              toggleBookmark={toggleBookmark}
            />
          }
        />
        <Route
          path="/movie/:movieId"
          element={
            <MovieDescription
              bookmarkedMovies={bookmarkedMovies}
              toggleBookmark={toggleBookmark}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchResults
              query={query}
              bookmarkedMovies={bookmarkedMovies}
              toggleBookmark={toggleBookmark}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
