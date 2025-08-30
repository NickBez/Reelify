import { useEffect, useState } from "react";

function ThemeToggle() {
  // Initialize theme safely (guard against SSR / unavailable localStorage)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    // Apply theme to <body>
    document.body.setAttribute("data-theme", theme);

    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Fallback if storage is blocked (e.g. incognito/private mode)
      console.warn("Could not persist theme to localStorage");
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
    </button>
  );
}

export default ThemeToggle;
