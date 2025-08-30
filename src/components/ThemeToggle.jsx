import React, { useEffect, useState } from "react";

function ThemeToggle() {
  // Get the current theme from localStorage or default to dark mode
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    // Apply the current theme to the body
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // Save the theme to localStorage
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button onClick={toggleTheme} aria-label="Toggle dark/light mode">
      {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
}

export default ThemeToggle;
