import Link from "next/link";
import React from "react";

import {
  FaEye,
  FaBullseye,
  FaUsers,
  FaHandsHelping,
  FaHeart,
  FaGlobeAmericas,
  FaSeedling,
} from "react-icons/fa";
export const metadata = {
  title: "About BWDO | Our Vision, Mission & Impact",
  description:
    "Learn about Brotherhood Welfare and Development Organization (BWDO). We are dedicated to youth empowerment, social justice, and building a world beyond discrimination.",
  openGraph: {
    title: "About BWDO | Brotherhood Welfare and Development Organization",
    description: "Empowering youth and promoting equality across the globe.",
    images: ["/og-about.jpg"], // Ensure this exists in your public folder
  },
};
const AboutVisionMissionPage = () => {
  const data = [
    {
      id: 1,
      icon: FaGlobeAmericas,
      vision:
        "To create a world beyond discrimination, where humanity stands united in brotherhood, embracing equality and compassion for all.",
      mission:
        "Our mission is to initiate positive change within our community, and gradually expand our efforts nationwide and globally. We strive to build a more inclusive and unified world, starting from the ground up and reaching out to every corner of the globe.",
      color: "green",
    },
    {
      id: 2,
      icon: FaHeart,
      vision:
        "To build a joyful and harmonious world where everyone lives in peace and unity, transcending religious and professional identities to embrace our shared humanity.",
      mission:
        "Our mission is to foster happiness and inclusivity within our community, and to extend this spirit of unity across the nation and the world. We aim to create a world where all individuals live peacefully, connect meaningfully, and thrive together",
      color: "blue",
    },
    {
      id: 3,
      icon: FaUsers,
      vision:
        "To build a community where volunteers feel valued, empowered, and united in a culture of care, respect, and positive engagement.",
      mission:
        "To ensure the well-being, respect, and empowerment of every volunteer by fostering a supportive and friendly environment that inspires growth, collaboration, and meaningful social contribution.",
      color: "purple",
    },
    {
      id: 4,
      icon: FaSeedling,
      vision:
        "To build a future where empowered youth lead with kindness, empathy, and purpose, keeping our shared dreams alive and working collectively for the well-being of people and the planet.",
      mission:
        "To nurture and unite a new generation of compassionate, culturally aware, and responsible individuals who uphold humanity, protect the earth, and take ownership in creating a just and sustainable future through active volunteerism and solidarity.",
      color: "emerald",
    },
    {
      id: 5,
      icon: FaHandsHelping,
      vision:
        "To create a just and equitable world where every individual enjoys dignity, equality, and human rights, free from the barriers of poverty and discrimination.",
      mission:
        "To raise awareness and inspire action against poverty, inequality, and social injustice by engaging youth and volunteers in community-driven initiatives, awareness campaigns, and advocacy programs. Through our ongoing projects and outreach, BWDO has worked to promote equal opportunities, uphold human rights, and empower marginalized groups to build a more inclusive society.",
      color: "orange",
    },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BWDO",
    description:
      "Brotherhood Welfare and Development Organization is a non-profit dedicated to equality and youth empowerment.",
    url: "https://www.bwdobd.com/vision-mission",
  };

  const colorClasses = {
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: "text-green-600",
      accent: "text-green-700",
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "text-blue-600",
      accent: "text-blue-700",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      icon: "text-purple-600",
      accent: "text-purple-700",
    },
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      icon: "text-emerald-600",
      accent: "text-emerald-700",
    },
    orange: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      icon: "text-orange-600",
      accent: "text-orange-700",
    },
  };

  return (
    <section className="relative py-8 sm:py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Mobile-optimized Background */}
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center bg-no-repeat sm:bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')",
        }}
      />

      {/* Stronger Overlay for Mobile Readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-blue-900/85 to-purple-900/90 sm:from-green-900/80 sm:via-blue-900/70 sm:to-purple-900/80"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/95 backdrop-blur-sm rounded-full shadow-lg mb-4 sm:mb-6 border border-white/50">
            <FaHandsHelping className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg px-2">
            About <span className="text-green-300">BWDO</span>
          </h1>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto mb-4 sm:mb-6 rounded-full shadow-lg"></div>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-medium px-2 sm:px-0">
            Brotherhood Welfare and Development Organization (BWDO) is a
            non-profit dedicated to promoting equality, empowering youth, and
            building a peaceful, compassionate, and inclusive society.
          </p>
        </div>

        {/* Mission & Vision Cards - Mobile Optimized */}
        <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {data.map((item) => {
            const colors = colorClasses[item.color];
            const IconComponent = item.icon;

            return (
              <div
                key={item.id}
                className={`relative rounded-xl sm:rounded-2xl shadow-lg border border-white/30 bg-white/98 backdrop-blur-sm p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden`}
              >
                {/* Header with Icon - Mobile Optimized */}
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white shadow-md group-hover:scale-105 transition-transform duration-300 border ${colors.border}`}
                    >
                      <IconComponent
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.icon}`}
                      />
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-gray-500">
                      0{item.id}
                    </span>
                  </div>
                </div>

                {/* Vision Section - Mobile Optimized */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                      <FaEye
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${colors.icon}`}
                      />
                    </div>
                    <h3
                      className={`text-base sm:text-lg font-bold ${colors.accent}`}
                    >
                      Vision
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                    {item.vision}
                  </p>
                </div>

                {/* Mission Section - Mobile Optimized */}
                <div>
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                      <FaBullseye
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${colors.icon}`}
                      />
                    </div>
                    <h3
                      className={`text-base sm:text-lg font-bold ${colors.accent}`}
                    >
                      Mission
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                    {item.mission}
                  </p>
                </div>

                {/* Bottom Border Effect */}
                <div
                  className={`absolute bottom-0 left-0 w-0 h-1 ${colors.bg.replace("50", "500")} group-hover:w-full transition-all duration-500 ease-out`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action - Mobile Optimized */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            href={"/volunteer"}
            className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-lg sm:rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-green-700 hover:to-blue-700 border border-white/20"
          >
            Join Our Mission
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutVisionMissionPage;
