// src/tests/ThemeToggle.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "../components/ThemeToggle.jsx";

test("toggles between dark and light mode", () => {
  render(<ThemeToggle />);

  // Accessible name comes from aria-label
  const btn = screen.getByRole("button", { name: /toggle dark\/light mode/i });

  expect(document.body).toHaveAttribute("data-theme", "dark");

  fireEvent.click(btn);
  expect(document.body).toHaveAttribute("data-theme", "light");

  fireEvent.click(btn);
  expect(document.body).toHaveAttribute("data-theme", "dark");
});
