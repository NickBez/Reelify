import Logo from "./Logo";
import Search from "./Search";

function Header({ query, setQuery }) {
  return (
    <header>
      <Logo />
      <Search query={query} setQuery={setQuery} />
    </header>
  );
}

export default Header;
