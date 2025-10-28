"use client";
import Image from "next/image";
import { Calendar, Folder, Clock, Play } from "lucide-react";
import { use } from "react";


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

export default function ProjectDetailsPage({ params }) {

    const { title } = use(params);
    console.log("Project Title from URL:", title);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'ongoing': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {projectData.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Folder className="w-4 h-4" />
                  <span className="font-medium">{projectData.category}</span>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(projectData.status)}`}>
                  {projectData.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Started: {formatDate(projectData.startDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Ends: {formatDate(projectData.endDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg mb-8">
          <Image
            src={projectData.coverImage}
            alt={projectData.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Content */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="space-y-6">
                {projectData.content.map((item, idx) => {
                  if (item.type === "Heading")
                    return (
                      <h2 key={idx} className="text-2xl font-semibold text-gray-900 pt-4 first:pt-0 border-t first:border-t-0 border-gray-100 first:border-none">
                        {item.text}
                      </h2>
                    );
                  if (item.type === "Paragraph")
                    return (
                      <p key={idx} className="text-gray-700 leading-relaxed text-lg">
                        {item.text}
                      </p>
                    );
                  return null;
                })}
              </div>
            </div>

            {/* Video Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-6 bg-blue-600 rounded-full"></div>
                <h3 className="text-xl font-semibold text-gray-900">Project Video</h3>
              </div>
              
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-900">
                <iframe
                  src={`https://www.youtube.com/embed/${projectData.videoId}`}
                  title="Project Video"
                  className="w-full h-full"
                  allowFullScreen
                />
                <div className="absolute inset-0 pointer-events-none border-2 border-white/10 rounded-xl"></div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Gallery */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-6 bg-green-600 rounded-full"></div>
                <h3 className="text-xl font-semibold text-gray-900">Gallery</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {projectData.galleryImages.map((img, i) => (
                  <div 
                    key={i} 
                    className="relative w-full h-48 rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <Image 
                      src={img} 
                      alt={`Gallery image ${i + 1}`} 
                      fill 
                      className="object-cover transition-transform duration-300 group-hover:scale-105" 
                      sizes="(max-width: 768px) 100vw, 50vw" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-sm p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium text-gray-900">{projectData.category}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(projectData.status)}`}>
                    {projectData.status}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium text-gray-900 text-right">
                    {formatDate(projectData.startDate)}<br/>
                    to {formatDate(projectData.endDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}