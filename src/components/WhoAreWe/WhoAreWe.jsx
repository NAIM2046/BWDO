"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaUsers,
  FaEye,
  FaBullseye,
  FaArrowRight,
  FaHandsHelping,
} from "react-icons/fa";

const WhoAreWe = () => {
  const [activeTab, setActiveTab] = useState("who");

  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40 -z-10"></div>

      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white shadow-md rounded-full mb-5 border border-green-200">
            <FaHandsHelping className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
            Brotherhood Welfare & Development Organization
          </h2>
          <p className="text-lg font-medium text-green-700 mb-2">
            Non-Profit • Empowerment • Humanity
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10 text-sm md:text-xl">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 shadow-md border border-gray-100 flex">
            <button
              onClick={() => setActiveTab("who")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === "who"
                ? "bg-green-600 text-white shadow-lg scale-105"
                : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                }`}
            >
              <FaUsers className="w-4 h-4" />
              Who We Are
            </button>

            <button
              onClick={() => setActiveTab("vision")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === "vision"
                ? "bg-green-600 text-white shadow-lg scale-105"
                : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                }`}
            >
              <FaEye className="w-4 h-4" />
              Vision & Mission
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/95 rounded-2xl p-8 sm:p-10 shadow-md border border-gray-100 transition-all duration-500">
          <div className="max-w-3xl mx-auto">
            {activeTab === "who" ? (
              <div className="space-y-6 text-center animate-fade-in">
                <div className="text-green-600 mb-2">
                  <FaUsers className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  We are a community-driven non-profit organization dedicated to
                  creating lasting positive change through education, healthcare,
                  and sustainable social development. Our network of youth and
                  volunteers work passionately to uplift marginalized communities,
                  promote equality, and build a compassionate, inclusive society.
                </p>
                <p className="text-gray-600 text-base mt-2 italic">
                  “Our strength lies in unity, compassion, and collaboration —
                  guiding us to empower individuals and transform lives.”
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
                {/* Vision */}
                <div className="bg-gradient-to-br from-green-50 to-green-100/70 p-6 rounded-xl border border-green-200 hover:shadow-md transition-all">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <FaEye className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800">
                      Our Vision
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    To create a just, compassionate, and unified world where
                    humanity rises above discrimination and division. We envision
                    a future of equality, dignity, and harmony — where empowered
                    youth lead with empathy and purpose for the well-being of
                    people and the planet.
                  </p>
                </div>

                {/* Mission */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/70 p-6 rounded-xl border border-blue-200 hover:shadow-md transition-all">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <FaBullseye className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-800">
                      Our Mission
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    To inspire and unite youth and volunteers in driving
                    community-led change that promotes equality, human rights, and
                    social justice. Through compassion and solidarity, we empower
                    communities and nurture responsible citizens for a more
                    inclusive and peaceful future.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <Link
            href="/vision-mission"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-800 shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Learn More
            <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;
