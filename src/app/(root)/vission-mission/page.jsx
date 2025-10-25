import React from "react";
import { 
  FaLightbulb, 
  FaEye, 
  FaRocket, 
  FaGraduationCap, 
  FaLeaf, 
  FaShieldAlt, 
  FaUsers,
  FaHeart,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn
} from "react-icons/fa";

const VisionMissionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-300 to-green-300 py-12 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-5"> </div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4 shadow-lg backdrop-blur-sm">
                <FaLightbulb className="w-10 h-10  text-black" />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-white mb-2">BWDO</h1>
                <div className="w-16 h-1 bg-white bg-opacity-50 mx-auto rounded-full"></div>
              </div>
            </div>
            <h2 className="text-2xl font-light text-white opacity-90 mt-4 tracking-wide">
              Vision, Mission & Values
            </h2>
          </div>
        </div>

        <div className="p-10 space-y-16">
          {/* Vision Section */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4 pb-4">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center shadow-sm">
                <FaEye className="w-7 h-7 text-blue-500" />
              </div>
              <div>
                <h3 className="text-3xl font-semibold text-gray-800">Our Vision</h3>
                <div className="w-12 h-0.5 bg-blue-400 mt-2 rounded-full"></div>
              </div>
            </div>
            <div className="bg-blue-25 rounded-2xl p-8 border border-blue-100 shadow-sm">
              <p className="text-lg text-gray-700 leading-relaxed text-justify">
                BWDO envisions a society free from all forms of exploitation and 
                discrimination, where every child has the opportunity for education, and every 
                youth has the opportunity to realise their potential.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4 pb-4">
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center shadow-sm">
                <FaRocket className="w-7 h-7 text-green-500" />
              </div>
              <div>
                <h3 className="text-3xl font-semibold text-gray-800">Our Mission</h3>
                <div className="w-12 h-0.5 bg-green-400 mt-2 rounded-full"></div>
              </div>
            </div>
            <div className="bg-green-25 rounded-2xl p-8 border border-green-100 shadow-sm">
              <p className="text-lg text-gray-700 leading-relaxed text-justify">
                To bring about substantial improvement in the lives of underprivileged children 
                and youth living in poverty, illiteracy, and social inequality through quality 
                education and youth empowerment.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section className="space-y-8">
            <div className="flex items-center space-x-4 pb-4">
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center shadow-sm">
                <FaHeart className="w-7 h-7 text-purple-500" />
              </div>
              <div>
                <h3 className="text-3xl font-semibold text-gray-800">Our Values</h3>
                <div className="w-12 h-0.5 bg-purple-400 mt-2 rounded-full"></div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Innovation */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-blue-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <FaLightbulb className="w-6 h-6 text-blue-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">Innovation</h4>
                </div>
                <p className="text-gray-600 leading-relaxed text-justify">
                  BWDO supports and encourages continuous research and development in five 
                  focus areas: education, gender, youth development, climate change, and 
                  governance, to ensure today's innovations become conventional tomorrow.
                </p>
              </div>

              {/* Learning */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-green-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <FaGraduationCap className="w-6 h-6 text-green-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">Learning</h4>
                </div>
                <p className="text-gray-600 leading-relaxed text-justify">
                  BWDO believes learning is fundamental to human flourishing and strives to 
                  support educational opportunities on every front, both with the tools we 
                  create and how we create them.
                </p>
              </div>

              {/* Sustainability */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-emerald-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <FaLeaf className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">Sustainability</h4>
                </div>
                <p className="text-gray-600 leading-relaxed text-justify">
                  To tackle the root causes of poverty and create sustainable change, BWDO 
                  takes a holistic approach, working alongside communities.
                </p>
              </div>

              {/* Integrity */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-amber-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                    <FaShieldAlt className="w-6 h-6 text-amber-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">Integrity</h4>
                </div>
                <p className="text-gray-600 leading-relaxed text-justify">
                  Integrity is one of our first core values and a foundation for others. With 
                  great passion, hard work, honesty, and unity, comes integrity.
                </p>
              </div>

              {/* Inclusivity */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-purple-200 md:col-span-2">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                    <FaUsers className="w-6 h-6 text-purple-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">Inclusivity</h4>
                </div>
                <p className="text-gray-600 leading-relaxed text-justify">
                  Inclusion and dignity are key values at BWDO. Our mission is to strive for 
                  excellence by respecting and valuing the differences that contribute to our 
                  strength and unity.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 py-8 px-8 border-t border-gray-200">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-5">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300 hover:bg-blue-50">
                <FaTwitter className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors" />
              </div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300 hover:bg-blue-50">
                <FaFacebookF className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors" />
              </div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300 hover:bg-blue-50">
                <FaLinkedinIn className="w-5 h-5 text-gray-600 hover:text-blue-700 transition-colors" />
              </div>
            </div>
            <p className="text-gray-500 text-sm font-light">
              Building a better future together
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMissionPage;