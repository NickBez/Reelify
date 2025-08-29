import { useState } from "react";
import Header from "./components/Header";
import MoviesByGenre from "./components/MoviesByGenre";
import Footer from "./components/Footer";

function App() {
  const [query, setQuery] = useState("");

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <MoviesByGenre query={query} />
      <Footer />
    </>
  );
}

export default App;
