import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import MovieDescription from "../components/MovieDescription.jsx";

const movie = {
  id: "1",
  title: "Inception",
  poster: "inception.jpg",
  imdb_rating: 9,
  released_on: "2010-07-16T00:00:00",
  length: "2h 28m",
  director: "Christopher Nolan",
  cast: ["Leonardo DiCaprio"],
  overview: "A mind-bending thriller.",
};

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: async () => movie,
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders movie details", async () => {
  render(
    <MemoryRouter initialEntries={["/movie/1"]}>
      <Routes>
        <Route
          path="/movie/:movieId"
          element={
            <MovieDescription bookmarkedMovies={[]} toggleBookmark={() => {}} />
          }
        />
      </Routes>
    </MemoryRouter>
  );

  // findBy* waits, no need for waitFor
  expect(await screen.findByText(/Inception/i)).toBeInTheDocument();
  expect(screen.getByText(/Christopher Nolan/i)).toBeInTheDocument();
});
