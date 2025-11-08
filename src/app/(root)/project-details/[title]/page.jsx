"use client";

import React, { useState } from 'react';
import { Calendar, Award, PlayCircle, X, ChevronLeft, Share2, Heart } from 'lucide-react';

const projectData = {
  title: "Quality Education for Rural Children",
  category: "Education",
  status: "Ongoing",
  startDate: "2024-02-15",
  endDate: "2025-06-30",
  coverImage: "https://images.unsplash.com/photo-1497636577773-f1231844b336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
  galleryImages: [
    "https://images.unsplash.com/photo-1497636577773-f1231844b336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2028&q=80"
  ],
  videoId: "75CEN62XR1g",
  content: [
    { type: "Heading", text: "Project Overview" },
    {
      type: "Paragraph",
      text: "This project aims to improve literacy among rural children in Bangladesh by providing access to quality education resources and infrastructure. We believe every child deserves the opportunity to learn and grow, regardless of their geographical location or economic background.",
    },
    { type: "Heading", text: "Objectives" },
    { 
      type: "Paragraph", 
      text: "Train 50 teachers and build learning centers in 5 rural communities to ensure sustainable educational development. Our goal is to reach over 1,000 children with quality education programs and learning materials." 
    },
    { type: "Heading", text: "Impact" },
    { 
      type: "Paragraph", 
      text: "Since our launch, we've seen a 45% increase in school attendance and a 60% improvement in literacy rates among participating communities. Our teacher training programs have equipped educators with modern teaching methodologies." 
    },
  ],
};

export default function ProjectDetailPage() {
  const [showVideo, setShowVideo] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [liked, setLiked] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: projectData.title,
        text: projectData.content[1]?.text || '',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation Bar */}
     

      {/* Hero Section - Responsive Heights */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
        <img 
          src={projectData.coverImage} 
          alt={projectData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-green-500 text-white text-xs sm:text-sm font-semibold rounded-full mb-2 sm:mb-4">
              {projectData.category}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 leading-tight">
              {projectData.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-white/90 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="line-clamp-1">{formatDate(projectData.startDate)} - {formatDate(projectData.endDate)}</span>
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
                    <h2 key={index} className="text-xl sm:text-2xl font-bold text-gray-800 mt-4 sm:mt-6 mb-3 sm:mb-4 first:mt-0">
                      {item.text}
                    </h2>
                  );
                } else if (item.type === "Paragraph") {
                  return (
                    <p key={index} className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
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
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Project Video</h2>
                 <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
                    <iframe
                      className="w-full h-full rounded-lg sm:rounded-xl"
                      src={`https://www.youtube.com/embed/${projectData.videoId}`}
                      title="Project video"
                      allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
              </div>
            )}

            {/* Gallery Section */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Project Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {projectData.galleryImages.map((image, index) => (
                  <div 
                    key={index}
                    className="relative h-40 sm:h-48 md:h-56 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
          <img 
            src={selectedImage} 
            alt="Gallery preview"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}