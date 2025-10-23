"use client";

import React, { useState, useEffect } from "react";
import { RxDoubleArrowUp } from "react-icons/rx";

const ButtonToUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll event to show/hide button
  const handleScroll = () => {
    setIsVisible(window.scrollY > 200);
  };

  // Scroll to top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  // Add event listener for scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 p-3 bg-gradient-to-br from-green-600 to-green-800 text-white rounded-full shadow-lg z-50 
        transition-all duration-500 ease-out cursor-pointer 
        hover:from-blue-600 hover:to-blue-800 hover:shadow-xl
        active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-10 pointer-events-none"
        }`}
      aria-label="Scroll to top"
    >
      <RxDoubleArrowUp
        className={`text-2xl transition-transform duration-300 ${
          isVisible ? "hover:scale-110 hover:-translate-y-0.5" : ""
        }`}
      />
    </button>
  );
};

export default ButtonToUp;
