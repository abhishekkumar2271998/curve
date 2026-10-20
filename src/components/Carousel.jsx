import { useCallback, useEffect, useRef, useState } from 'react';

export default function Carousel({ slides = [], autoPlay = true, interval = 5000, loop = true }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const count = slides.length;

  const goTo = useCallback(
    (index) => {
      if (count === 0) return;
      if (loop) {
        setCurrent((index + count) % count);
      } else {
        setCurrent(Math.max(0, Math.min(index, count - 1)));
      }
    },
    [count, loop]
  );

  const next = useCallback(() => goTo(current + 1), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1), [goTo, current]);

  useEffect(() => {
    if (!autoPlay || paused || count < 2) return undefined;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, paused, count, interval, next]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) prev();
    if (delta < -50) next();
    touchStartX.current = null;
  };

  if (count === 0) return null;

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, index) => (
          <div
            key={slide.id ?? index}
            className="carousel-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            aria-hidden={index !== current}
          >
            {slide.image && <img src={slide.image} alt={slide.alt ?? ''} />}
            {slide.caption && <p className="carousel-caption">{slide.caption}</p>}
            {slide.content}
          </div>
        ))}
      </div>

      <button type="button" className="carousel-prev" onClick={prev} disabled={!loop && current === 0} aria-label="Previous slide">
        ‹
      </button>
      <button type="button" className="carousel-next" onClick={next} disabled={!loop && current === count - 1} aria-label="Next slide">
        ›
      </button>

      <div className="carousel-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.id ?? index}
            type="button"
            className={index === current ? 'carousel-dot active' : 'carousel-dot'}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === current}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
