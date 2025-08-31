import { useNavigate } from "react-router-dom";

function Search({ query, setQuery }) {
  const navigate = useNavigate();
  const handleSearch = (e) => {
    const query = e.target.value;
    setQuery(query);
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={handleSearch}
    />
  );
}

export default Search;
