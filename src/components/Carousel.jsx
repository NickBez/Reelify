import { useEffect, useRef, useState, useCallback } from "react";
import Card from "./Card";

function Carousel({ movies, title }) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;

    const overflow = scrollWidth > clientWidth + 1;
    setHasOverflow(overflow);

    setCanLeft(overflow && scrollLeft > 0);
    setCanRight(overflow && scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(id);
  }, [movies, measure]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => measure();
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    window.addEventListener("resize", measure);

    const imgLoadHandler = () => measure();
    const imgs = el.querySelectorAll("img");
    imgs.forEach((img) => {
      if (!img.complete)
        img.addEventListener("load", imgLoadHandler, { once: true });
    });

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const scroll = (direction) => {
    const el = trackRef.current;
    if (!el) return;

    const first = el.firstElementChild;
    const step = first?.getBoundingClientRect?.().width
      ? first.getBoundingClientRect().width + 12
      : el.clientWidth * 0.9;

    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <section className="genre-section">
      {title && (
        <h2 className="genre-title" role="heading" aria-level="2">
          {title}
        </h2>
      )}

      <div className="carousel">
        {hasOverflow && (
          <button
            type="button"
            className="arrow left"
            onClick={() => scroll("left")}
            aria-label={`Scroll left through ${title ?? "movies"}`}
            disabled={!canLeft}
          >
            ‹
          </button>
        )}

        <div className="carousel-track" ref={trackRef}>
          {movies.map((movie) => (
            <article key={movie.id} className="movie-card">
              <Card movie={movie} />
            </article>
          ))}
        </div>

        {hasOverflow && (
          <button
            type="button"
            className="arrow right"
            onClick={() => scroll("right")}
            aria-label={`Scroll right through ${title ?? "movies"}`}
            disabled={!canRight}
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
}

export default Carousel;
