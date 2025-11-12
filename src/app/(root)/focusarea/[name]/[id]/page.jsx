import React from "react";
import Image from "next/image";
import { focusDetailsList } from "@/components/ourfouceArea/FocusItems";


const FocusArea = async ({ params }) => {

  const { name, id } = await params;
  console.log(id)

  const focusDetails = focusDetailsList.find((item) => item.id == id);

  // Handle case where focusDetails is not found
  if (!focusDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600">Focus area not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-400 to-emerald-200 text-white">
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  {focusDetails.title}
                </h1>
              </div>

              <p className="text-xl text-green-100 leading-relaxed">
                {focusDetails.description}
              </p>

              {/* Impact Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6">
                {focusDetails.impact.stats.map((stat, index) => (
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
                    <div className="text-6xl mb-4">
                      {focusDetails.title === "Education" && "📚"}
                      {focusDetails.title === "Culture" && "🎭"}
                      {focusDetails.title === "Health" && "🏥"}
                      {focusDetails.title === "Sports" && "⚽"}
                      {focusDetails.title === "Conservation" && "🌿"}
                    </div>
                    <p className="text-xl font-semibold">
                      {focusDetails.title}
                    </p>
                    <p className="text-green-100 mt-2">
                      Making a difference in Bangladesh
                    </p>
                  </div>
                </div>
                {/* Uncomment when you have actual images */}
                <Image
                  src={focusDetails.heroImage}
                  alt={`${focusDetails.title} in action`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {focusDetails.ourWork.title}
            </h2>
            <p className="text-xl text-gray-600">
              Our ongoing initiatives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {focusDetails.ourWork.initiatives.map((initiative, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden bg-emerald-200">
                  {initiative.image ? (
                    <Image
                      src={initiative.image}
                      alt={initiative.title}
                      fill

                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-emerald-600">
                      <div className="text-center">
                        <div className="text-4xl mb-2">
                          {index === 0 && "📚"}
                          {index === 1 && "🎨"}
                          {index === 2 && "💡"}
                        </div>
                        <p className="text-sm font-semibold">
                          {initiative.title}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                  </div>
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
      <section className="py-16 bg-white flex justify-center items-center">
        <div className="container mx-auto px-4 justify-center items-center">
          <div className="grid grid-cols-1 justify-center items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {focusDetails.futurePlans.title}
              </h2>
              <div className="space-y-4">
                {focusDetails.futurePlans.plans.map((plan, index) => (
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



          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Join Our {focusDetails.title} Initiative
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Together, we can make a significant impact in {focusDetails.title.toLowerCase()} across Bangladesh.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl">
                Volunteer Now
              </button>
              <button className="px-8 py-4 bg-emerald-800 text-white rounded-lg font-semibold hover:bg-emerald-900 transition-colors duration-300">
                Donate to Support
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FocusArea;