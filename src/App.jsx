// App.jsx
import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MoviesByGenre from "./components/MoviesByGenre";
import MovieDescription from "./components/MovieDescription";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";

// If you want route-based code splitting later, uncomment below and
// replace the direct imports above:
// import { lazy, Suspense } from "react";
// const Header = lazy(() => import("./components/Header"));
// const MoviesByGenre = lazy(() => import("./components/MoviesByGenre"));
// const MovieDescription = lazy(() => import("./components/MovieDescription"));
// const SearchResults = lazy(() => import("./components/SearchResults"));
// const Footer = lazy(() => import("./components/Footer"));

function App() {
  const [query, setQuery] = useState("");

  // Lazy + safe localStorage init (runs once)
  const [bookmarkedMovies, setBookmarkedMovies] = useState(() => {
    try {
      const raw = localStorage.getItem("bookmarkedMovies");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem(
        "bookmarkedMovies",
        JSON.stringify(bookmarkedMovies)
      );
    } catch {
      // ignore storage failures (private mode, etc.)
    }
  }, [bookmarkedMovies]);

  // Memoized toggle to avoid re-renders downstream
  const toggleBookmark = useCallback((movie) => {
    setBookmarkedMovies((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      return exists ? prev.filter((m) => m.id !== movie.id) : [...prev, movie];
    });
  }, []);

  return (
    <Router>
      {/* <Suspense fallback={<div className="loading">Loading…</div>}> */}
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
                // SearchResults reads the query from the URL;
                // these props are kept only if you plan to use them later
                bookmarkedMovies={bookmarkedMovies}
                toggleBookmark={toggleBookmark}
              />
            }
          />
        </Routes>
      </main>

      <Footer />
      {/* </Suspense> */}
    </Router>
  );
}

export default App;
