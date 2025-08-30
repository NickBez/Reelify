import React, { useRef } from "react";
import Card from "./Card";

function Carousel({ movies, title }) {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    const el = trackRef.current;
    if (!el) return;

    const first = el.firstElementChild;
    const step = first?.getBoundingClientRect?.().width
      ? first.getBoundingClientRect().width + 12 // card width + gap
      : el.clientWidth * 0.9; // fallback

    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  const showArrows = Array.isArray(movies) && movies.length > 5;

  return (
    <section className="genre-section">
      {title && (
        <h2 className="genre-title" role="heading" aria-level="2">
          {title}
        </h2>
      )}

      <div className="carousel">
        {showArrows && (
          <button
            type="button"
            className="arrow left"
            onClick={() => scroll("left")}
            aria-label={`Scroll left through ${title ?? "movies"}`}
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

        {showArrows && (
          <button
            type="button"
            className="arrow right"
            onClick={() => scroll("right")}
            aria-label={`Scroll right through ${title ?? "movies"}`}
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
}

export default Carousel;
