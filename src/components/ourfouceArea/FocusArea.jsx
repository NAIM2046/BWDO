"use client";
import { ArrowRight } from "lucide-react";
import { focusAreas } from "./FocusItems";

const FocusArea = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-8 lg:mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl text-blue-700 text-base font-semibold mb-2 shadow-lg">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            Our Focus Areas
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Enhanced Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {/* Enhanced Featured Header Card */}
          <div className="lg:col-span-1 xl:col-span-1">
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white rounded-3xl p-8 lg:p-10 shadow-2xl shadow-blue-500/20 h-full flex flex-col justify-center relative overflow-hidden group">
              {/* Animated Background Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-500"></div>

              <div className="space-y-6 relative z-10">
                <h3 className="text-2xl lg:text-3xl font-bold leading-tight group-hover:scale-105 transition-transform duration-300">
                  Creating Sustainable Impact Worldwide
                </h3>
                <p className="text-blue-100 text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                  Each focus area represents our commitment to addressing
                  critical needs and creating sustainable impact in communities
                  worldwide through carefully designed programs.
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Focus Area Cards */}
          {focusAreas.map((area, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-3xl p-6 lg:p-8 border border-gray-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden backdrop-blur-sm ${area.color}`}
            >
              {/* Enhanced Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`}
              ></div>

              {/* Animated Border Effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>

              {/* Enhanced Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 rounded-2xl bg-white/80 shadow-lg border border-gray-100 group-hover:scale-110  transition-all duration-300">
                    {area.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-200 group-hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-gray-800 transition-colors duration-300">
                  {area.title}
                </h3>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                  {area.description}
                </p>
              </div>

              {/* Enhanced Button */}
              <div className="relative z-10">
                <button className="group/btn w-full inline-flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl px-6 py-4 text-sm font-semibold text-gray-700 hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Bottom Section */}
      </div>
    </section>
  );
};

export default FocusArea;
