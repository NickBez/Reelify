import { Link } from "react-router-dom";
function Logo() {
  return (
    <div className="logo">
      <Link to="/" className="logo-link">
        <span role="img" aria-label="popcorn">
          🍿
        </span>
        <h1>Reelify</h1>
      </Link>
    </div>
  );
}

export default Logo;
