"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
const PhotosPage = ({ photoGallery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  const prevImage = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? photoGallery.length - 1 : prev - 1,
    );

  const nextImage = () =>
    setCurrentIndex((prev) =>
      prev === photoGallery.length - 1 ? 0 : prev + 1,
    );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Photo Gallery
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our collection of stunning photographs. Click on any image to
          view it in full size.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {photoGallery?.map((photo, index) => (
          <div
            key={photo._id}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden cursor-pointer transform hover:-translate-y-2 relative"
            onClick={() => openModal(index)}
          >
            <div className="relative h-72 md:h-80 overflow-hidden">
              <Image
                src={photo.image}
                alt={"photo"}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />

              {/* Overlay with subtitle */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 flex items-end">
                <div className="p-4 w-full transform md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold text-lg drop-shadow-lg">
                    {photo.title}
                  </p>
                </div>
              </div>
              {/* View icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white bg-opacity-90 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3-3H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm">
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 z-10  bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-300 group"
            onClick={closeModal}
          >
            <svg
              className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Navigation Buttons */}
          <button
            className="absolute left-6 z-10  bg-opacity-20 hover:bg-opacity-30 rounded-full p-4 transition-all duration-300 group"
            onClick={prevImage}
          >
            <svg
              className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
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
            className="absolute right-6 z-10  bg-opacity-20 hover:bg-opacity-30 rounded-full p-4 transition-all duration-300 group"
            onClick={nextImage}
          >
            <svg
              className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
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

          {/* Image Container */}
          <div className="relative w-11/12 max-w-6xl h-[85vh] flex flex-col">
            <div className="relative flex-1 rounded-2xl overflow-hidden">
              <Image
                src={photoGallery[currentIndex].image}
                alt={"photo"}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                {photoGallery[currentIndex].alt}
              </h2>
              <p className="text-gray-300 text-lg">
                {photoGallery[currentIndex].title}
              </p>
            </div>
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
            Use ← → arrows to navigate • ESC to close
          </div>
        </div>
      )}

      {/* Loading state improvement */}
      <style jsx global>{`
        body {
          overflow: ${isOpen ? "hidden" : "unset"};
        }
      `}</style>
    </div>
  );
};

export default PhotosPage;
