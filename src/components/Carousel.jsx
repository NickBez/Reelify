import React, { useRef } from "react";
import Card from "./Card";

function Carousel({ movies, title }) {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.firstChild.offsetWidth + 12;
      trackRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  const showArrows = movies.length > 5;

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
            className="arrow left"
            onClick={() => scroll("left")}
            aria-label={`Scroll left through ${title} movies`}
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
            className="arrow right"
            onClick={() => scroll("right")}
            aria-label={`Scroll right through ${title} movies`}
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
}

export default Carousel;
