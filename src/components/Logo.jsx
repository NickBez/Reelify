import React from "react";
import { Link } from "react-router-dom"; // Link to navigate back to homepage
import "../carousel.css";

function Logo({ setQuery }) {
  // Handle click on logo to clear the search input
  const handleLogoClick = () => {
    setQuery(""); // Clear the search input
  };

  return (
    <div className="logo">
      <Link to="/" onClick={handleLogoClick} className="logo-link">
        <span role="img" aria-label="popcorn">
          🍿
        </span>
        <h1>Reelify</h1>
      </Link>
    </div>
  );
}

export default Logo;
