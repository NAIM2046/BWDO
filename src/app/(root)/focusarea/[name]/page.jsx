import React from "react";
import Image from "next/image";

const EnvironmentFocus = () => {
  const focusData = {
    title: "Environmental Conservation",
    description:
      "Healthy living in Bangladesh is not facilitated by the environmental conditions. Human health, ecosystems, and economic growth in Bangladesh are being threatened by severe air, water, and noise pollution.",

    ourWork: {
      title: "Our Environmental Initiatives",
      initiatives: [
        {
          title: "Tree Plantation Programs",
          description:
            "Large-scale tree plantation drives to combat air pollution and increase green coverage",
          image: "/api/placeholder/500/300", // Fallback or local image
        },
        {
          title: "Area Cleanup Campaigns",
          description:
            "Cleaned multiple areas by removing rubbish and wastages from public spaces",
          image: "/api/placeholder/500/300",
        },
        {
          title: "COVID-19 Relief",
          description:
            "Distributed vast amount of masks, sanitizers, and hand gloves during pandemic",
          image: "/api/placeholder/500/300",
        },
        {
          title: "JU Swimming Pool Renovation",
          description:
            "Successfully cleaned and renovated the 28-year-old abandoned swimming pool of Jahangirnagar University",
          image: "/api/placeholder/500/300",
        },
        {
          title: "Awareness Through Art",
          description:
            "Cleaned JU central field and presented satirical performance art 'চলুন ময়লা করি' to raise environmental awareness",
          image: "/api/placeholder/500/300",
        },
        {
          title: "Community Engagement",
          description:
            "Active participation from local communities in environmental conservation activities",
          image: "/api/placeholder/500/300",
        },
      ],
    },

    highlightedKeys: [
      "Tree Plantation Drives",
      "Public Space Cleanup",
      "Environmental Awareness",
      "Infrastructure Renovation",
      "Community Engagement",
      "Waste Management",
    ],

    futurePlans: {
      title: "Future Plans",
      plans: [
        "Focus on keeping our surroundings clean",
        "Extend awareness programmes about waste management consequences",
        "Identify and revitalize abandoned areas",
        "Transform neglected places into healthy spaces",
        "Expand tree plantation programmes",
        "Launch more environmental projects",
      ],
    },

    impact: {
      title: "Our Impact",
      stats: [
        { value: "28-year", label: "Abandoned Pool Renovated" },
        { value: "Multiple", label: "Areas Cleaned" },
        { value: "Vast", label: "COVID Protection Distributed" },
        { value: "Growing", label: "Community Awareness" },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-emerald-800 text-white">
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div>
                <span className="inline-block px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-semibold mb-4">
                  Focus Area
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Environmental Conservation
                </h1>
              </div>

              <p className="text-xl text-green-100 leading-relaxed">
                {focusData.description}
              </p>

              {/* Impact Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6">
                {focusData.impact.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold">
                      {stat.value}
                    </div>
                    <div className="text-green-200 text-sm mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl bg-emerald-500">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🌿</div>
                    <p className="text-xl font-semibold">
                      Environmental Conservation
                    </p>
                    <p className="text-green-100 mt-2">
                      Making Bangladesh Greener & Cleaner
                    </p>
                  </div>
                </div>
                {/* Replace with your actual image path after config */}
                {/* <Image
                  src="/images/environment-hero.jpg"
                  alt="Environmental conservation in action"
                  fill
                  className="object-cover"
                  priority
                /> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlighted Key Points */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Key Focus Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive approach to environmental conservation and
              community awareness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusData.highlightedKeys.map((key, index) => (
              <div
                key={index}
                className="group p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-300 hover:transform hover:-translate-y-1"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">✓</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{key}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {focusData.ourWork.title}
            </h2>
            <p className="text-xl text-gray-600">
              Tangible actions we've taken to improve Bangladesh's environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {focusData.ourWork.initiatives.map((initiative, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden bg-emerald-200">
                  <div className="w-full h-full flex items-center justify-center text-emerald-600">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🌱</div>
                      <p className="text-sm font-semibold">
                        {initiative.title}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  {/* Replace with your actual image after config */}
                  {/* <Image
                    src={initiative.image}
                    alt={initiative.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  /> */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {initiative.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Plans Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {focusData.futurePlans.title}
              </h2>
              <div className="space-y-4">
                {focusData.futurePlans.plans.map((plan, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-white text-sm">→</span>
                    </div>
                    <p className="text-gray-700 text-lg group-hover:text-green-600 transition-colors">
                      {plan}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Plans Visual */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-400 to-emerald-600">
              <div className="w-full h-full flex items-center justify-center text-white p-8">
                <div className="text-center">
                  <div className="text-6xl mb-6">🌱</div>

                  <p className="text-green-100 text-lg">
                    Creating sustainable, clean communities across Bangladesh
                    through collective action and environmental stewardship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Join Our Environmental Movement
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Together, we can combat pollution and create a healthier
              environment for all Bangladeshis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl">
                Volunteer for Cleanup
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300">
                Support Our Mission
              </button>
              <button className="px-8 py-4 bg-emerald-800 text-white rounded-lg font-semibold hover:bg-emerald-900 transition-colors duration-300">
                Join Awareness Program
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnvironmentFocus;
