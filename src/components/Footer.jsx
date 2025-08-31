function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Website footer">
      <p className="copyright">
        &copy; {year} Reelify. Bringing movies to life. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
