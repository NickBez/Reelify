function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Website footer">
      <p className="copyright">
        <small>
          &copy; {year} Reelify. Bringing movies to life. All rights reserved.
        </small>
      </p>
    </footer>
  );
}

export default Footer;
