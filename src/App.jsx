import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MoviesByGenre from "./components/MoviesByGenre";
import MovieDescription from "./components/MovieDescription";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";

function App() {
  const [query, setQuery] = useState("");
  const [bookmarkedMovies, setBookmarkedMovies] = useState(() => {
    try {
      const raw = localStorage.getItem("bookmarkedMovies");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        localStorage.setItem(
          "bookmarkedMovies",
          JSON.stringify(bookmarkedMovies)
        );
      } catch (err) {
        console.error("Failed to save bookmarked Movies to local storage", err);
      }
    }
  }, [bookmarkedMovies]);

  const toggleBookmark = useCallback((movie) => {
    setBookmarkedMovies((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      return exists ? prev.filter((m) => m.id !== movie.id) : [...prev, movie];
    });
  }, []);

  return (
    <Router>
      <Header query={query} setQuery={setQuery} />
      <main className="main-content" role="main">
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
                bookmarkedMovies={bookmarkedMovies}
                toggleBookmark={toggleBookmark}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
