"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Award,
  PlayCircle,
  X,
  ChevronLeft,
  Share2,
  Heart,
} from "lucide-react";

export default function ProjectDetail({ projectData }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: projectData.title,
        text: projectData.content[1]?.text || "",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section - Responsive Heights */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
        <Image
          src={projectData?.coverImage}
          alt={projectData?.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-green-500 text-white text-xs sm:text-sm font-semibold rounded-full mb-2 sm:mb-4">
              {projectData?.category}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 leading-tight">
              {projectData.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-white/90 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="line-clamp-1">
                  {formatDate(projectData.startDate)} -{" "}
                  {formatDate(projectData.endDate)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-500 rounded-full text-xs sm:text-sm font-medium">
                  {projectData.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="space-y-6 sm:space-y-8">
          {/* Content Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
            {projectData.content.map((item, index) => {
              if (item.type === "Heading") {
                return (
                  <h2
                    key={index}
                    className="text-xl sm:text-2xl font-bold text-gray-800 mt-4 sm:mt-6 mb-3 sm:mb-4 first:mt-0"
                  >
                    {item.text}
                  </h2>
                );
              } else if (item.type === "Paragraph") {
                return (
                  <p
                    key={index}
                    className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6"
                  >
                    {item.text}
                  </p>
                );
              }
              return null;
            })}
          </div>

          {/* Video Section */}
          {projectData.videoId && (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                Project Video
              </h2>
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
                <iframe
                  className="w-full h-full rounded-lg sm:rounded-xl"
                  src={`https://www.youtube.com/embed/${projectData.videoId}`}
                  title="Project video"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Gallery Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
              Project Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {projectData.galleryImages?.map((image, index) => (
                <div
                  key={index}
                  className="relative h-40 sm:h-48 md:h-56 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                      View Full Size
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal - Full Screen */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 p-2 hover:bg-white/10 rounded-full"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <div className="relative w-full h-full max-w-6xl max-h-full">
            <Image
              src={selectedImage}
              alt="Gallery preview"
              fill
              className="object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
