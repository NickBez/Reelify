import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Card from "../components/Card.jsx";

const movie = { id: "1", title: "Inception", poster: "inception.jpg" };

test("renders poster inside a link", () => {
  render(
    <MemoryRouter>
      <Card movie={movie} />
    </MemoryRouter>
  );

  const img = screen.getByRole("img", { name: /inception/i });
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute("src", "inception.jpg");
});
