// Search.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Search({ query, setQuery }) {
  const navigate = useNavigate(); // To programmatically navigate

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value;
    setQuery(query); // Update the query state
    if (query) {
      // Navigate to the /search page with the query parameter
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={handleSearch} // Trigger search and navigation
    />
  );
}

export default Search;
