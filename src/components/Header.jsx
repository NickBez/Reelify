import React from "react";
import Search from "./Search";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle"; // Import the ThemeToggle component

function Header({ query, setQuery }) {
  return (
    <header className="header">
      <Logo setQuery={setQuery} />
      <Search query={query} setQuery={setQuery} />
      <ThemeToggle /> {/* Add the theme toggle button */}
    </header>
  );
}

export default Header;
