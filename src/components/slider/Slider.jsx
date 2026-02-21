"use client";

import React, { useState, useEffect } from "react";

const Slider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (slides.length > 0) {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }
  };

  const prevSlide = () => {
    if (slides.length > 0) {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto slide every 9 seconds
  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 9000);
      return () => clearInterval(interval);
    }
  }, [currentSlide, slides.length]);

  // Empty State
  if (slides.length === 0) {
    return (
      <div className="relative w-full h-[400px] sm:h-[400px] md:h-[400px] lg:h-[500px] xl:h-[600px] bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📷</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            No Slides Available
          </h3>
          <p className="text-gray-600 mb-4">Add some slides to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[400px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden bg-black">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides?.map((slide, index) => (
          <div
            key={slide._id}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className={`flex items-center justify-center h-full transition-all duration-1000 delay-200 ${
                index === currentSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-center text-white px-4 sm:px-6 max-w-2xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight font-poppins">
                  {slide.title}
                </h1>
                {slide.subtitle && (
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 sm:mb-4 text-blue-200 font-medium">
                    {slide.subtitle}
                  </p>
                )}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 leading-relaxed text-gray-100 font-light max-w-3xl mx-auto">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10 border border-white/20"
        aria-label="Previous slide"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10 border border-white/20"
        aria-label="Next slide"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125 shadow-lg"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-black/40 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm z-10 border border-white/20">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none" />
    </div>
  );
};

export default Slider;
