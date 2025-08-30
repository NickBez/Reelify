import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MoviesByGenre from "./components/MoviesByGenre";
import MovieDescription from "./components/MovieDescription";
import Footer from "./components/Footer";

function App() {
  const [query, setQuery] = useState("");

  return (
    <Router>
      <Header query={query} setQuery={setQuery} />
      <Routes>
        <Route path="/" element={<MoviesByGenre query={query} />} />
        <Route
          path="/movie/:movieId"
          element={<MovieDescription query={query} />}
        />{" "}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
