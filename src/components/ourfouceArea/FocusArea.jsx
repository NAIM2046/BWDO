"use client";
import { ArrowRight } from "lucide-react";
import { focusAreas } from "./FocusItems";
import { motion } from "framer-motion";
import Link from "next/link";

const FocusArea = () => {
  // Animation variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 mx-auto lg:p-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-lg border border-blue-200/60 rounded-2xl text-blue-800 text-lg font-semibold mb-6 shadow-lg shadow-blue-100/50 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-500 transform hover:-translate-y-1">
            {/* Animated dots */}
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>

            {/* Main text with gradient */}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold text-xl">
              Our Focus Areas
            </span>

            {/* Animated dots */}
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>

          {/* Optional: Animated underline */}
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Grid Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0 }}
        >
          {/* Featured Header Card */}
          <motion.div
            className="lg:col-span-1 xl:col-span-1 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white rounded-3xl p-8 lg:p-10 shadow-2xl shadow-blue-500/20 h-full flex flex-col justify-center relative overflow-hidden group"
            variants={cardVariants}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-500"></div>

            <div className="space-y-6 relative z-10">
              <h3 className="text-2xl lg:text-3xl font-bold leading-tight group-hover:scale-105 transition-transform duration-300">
                Creating Sustainable Impact Worldwide
              </h3>
              <p className="text-blue-100 text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                Each focus area represents our commitment to addressing critical
                needs and creating sustainable impact in communities worldwide
                through carefully designed programs.
              </p>
            </div>
          </motion.div>

          {/* Focus Area Cards */}
          {focusAreas.map((area, index) => (
            <motion.div
              key={index}
              className={`group relative bg-white rounded-3xl p-6 lg:p-8 border border-gray-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden backdrop-blur-sm ${area.color}`}
              variants={cardVariants}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`}
              ></div>
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>

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

              <div className="relative z-10">
                <Link href={`/focusarea/${area.title}/${area.id}`} className="group/btn w-full inline-flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl px-6 py-4 text-sm font-semibold text-gray-700 hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FocusArea;
