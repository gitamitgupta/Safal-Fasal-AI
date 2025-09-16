import React, { useState } from "react";
import f1 from './../assets/images/f1.jpg';
import f2 from './../assets/images/f2.jpg';
import f3 from './../assets/images/f3.jpg';
import f4 from './../assets/images/f4.jpg';
import f5 from './../assets/images/f5.jpg';
const images = [
  f1,f2,f3,f4,f5
];
export default function Slideshow() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full overflow-hidden">
      <img
        src={images[current]}
        alt={`slide-${current}`}
        className="w-full h-[300px] object-cover"
      />
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-purple-700 bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-80 transition"
        aria-label="Previous Slide"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-purple-700 bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-80 transition"
        aria-label="Next Slide"
      >
        &#10095;
      </button>
    </div>
  );
}
