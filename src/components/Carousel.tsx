import React, { useRef, useState } from 'react';
import './Carousel.scss';

const Carousel: React.FC<{
  images: string[];
  step: number;
  itemWidth: number;
  frameSize: number;
  animationDuration: number;
}> = ({ images, step, itemWidth, frameSize, animationDuration }) => {
  const [offset, setOffset] = useState(0);
  const carouselListRef = useRef<HTMLUListElement>(null);

  const gap = 20;
  const maxNextTransform = -(images.length - frameSize) * (itemWidth + gap);

  const handleNextClick = () => {
    if (carouselListRef.current && offset > maxNextTransform) {
      const newOffset = Math.max(
        offset - step * (itemWidth + gap),
        maxNextTransform,
      );

      carouselListRef.current.style.transition = `transform ${animationDuration}ms ease`;
      carouselListRef.current.style.transform = `translateX(${newOffset}px)`;

      setOffset(newOffset);
    }
  };

  const handlePrevClick = () => {
    if (carouselListRef.current && offset < 0) {
      const newOffset = Math.min(offset + step * (itemWidth + gap), 0);

      carouselListRef.current.style.transition = `transform ${animationDuration}ms ease`;
      carouselListRef.current.style.transform = `translateX(${newOffset}px)`;

      setOffset(newOffset);
    }
  };

  return (
    <div
      className="Carousel"
      style={{ width: `${frameSize * (itemWidth + gap)}px` }}
    >
      <ul className="Carousel__list" ref={carouselListRef}>
        {images.map((image, index) => (
          <li key={index}>
            <img
              src={image}
              alt={`${index + 1}`}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handlePrevClick}
        className={`Carousel__button Carousel__button--prev ${offset === 0 ? 'Carousel__button--disabled' : ''}`}
      >
        &#9664;
      </button>
      <button
        type="button"
        onClick={handleNextClick}
        className={`Carousel__button Carousel__button--next ${offset === maxNextTransform ? 'Carousel__button--disabled' : ''}`}
      >
        &#9654;
      </button>
    </div>
  );
};

export default Carousel;
