"use client";
import React from "react";

const WhoAreWe = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-5xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Brotherhood Welfare and Development Organization
        </h2>
        <p className="text-lg text-gray-600 mb-2 font-semibold">
          Non-Profit Organization
        </p>

        {/* Description */}
        <p className="text-gray-700 text-base md:text-lg mb-4">
          Dedicated to creating positive change in communities through
          education, healthcare, and sustainable development initiatives.
        </p>

        {/* Call to Action */}
        <button className="px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 shadow-lg transition transform hover:scale-105">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default WhoAreWe;
