import Search from "./Search";
import Logo from "./Logo";

function Header({ query, setQuery }) {
  return (
    <header className="header">
      <Logo />
      <Search query={query} setQuery={setQuery} />
    </header>
  );
}

export default Header;
