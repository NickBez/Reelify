import { useRef } from "react";
import Card from "./Card";

function Carousel({ movies, title }) {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.firstChild.offsetWidth + 12; // card width + gap
      trackRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  const showArrows = movies.length > 5;

  return (
    <div className="genre-section">
      {title && <h2 className="genre-title">{title}</h2>}
      <div className="carousel">
        {showArrows && (
          <button className="arrow left" onClick={() => scroll("left")}>
            ‹
          </button>
        )}
        <div className="carousel-track" ref={trackRef}>
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
        {showArrows && (
          <button className="arrow right" onClick={() => scroll("right")}>
            ›
          </button>
        )}
      </div>
    </div>
  );
}

export default Carousel;
