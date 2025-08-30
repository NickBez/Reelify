import { Link } from "react-router-dom";

function Logo({ setQuery }) {
  const handleLogoClick = () => {
    setQuery(""); // Clear the search input
  };

  return (
    <h1 className="logo">
      <Link to="/" onClick={handleLogoClick} className="logo-link">
        <span role="img" aria-label="popcorn">
          🍿
        </span>{" "}
        Reelify
      </Link>
    </h1>
  );
}

export default Logo;
