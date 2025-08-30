import Search from "./Search";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

function Header({ query, setQuery }) {
  return (
    <header className="header" role="banner" aria-label="Site header">
      <section className="header-content">
        <Logo setQuery={setQuery} />
        <Search query={query} setQuery={setQuery} />
        <ThemeToggle aria-label="Toggle between light and dark mode" />
      </section>
    </header>
  );
}

export default Header;
