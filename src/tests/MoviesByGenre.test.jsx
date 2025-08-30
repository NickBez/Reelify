import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MoviesByGenre from "../components/MoviesByGenre.jsx";

const moviesPayload = {
  movies: [
    {
      id: "1",
      title: "Inception",
      poster: "inception.jpg",
      genres: ["Action"],
    },
    {
      id: "2",
      title: "The Dark Knight",
      poster: "tdk.jpg",
      genres: ["Action"],
    },
  ],
};

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: async () => moviesPayload,
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("shows movies grouped by genre", async () => {
  render(
    <MemoryRouter>
      <MoviesByGenre query="" bookmarkedMovies={[]} toggleBookmark={() => {}} />
    </MemoryRouter>
  );

  // Use findByRole on images (titles aren’t rendered as text in Card)
  expect(
    await screen.findByRole("img", { name: /inception/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("img", { name: /the dark knight/i })
  ).toBeInTheDocument();
});
