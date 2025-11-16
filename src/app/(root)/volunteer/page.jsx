"use client";

import React, { useState } from "react";

const VolunteerPage = () => {
  const [formData, setFormData] = useState({
    region: "Volunteer",
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          region: "Volunteer",
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        alert("There was an error submitting your application. Please try again.");
      }
    } catch (error) {
      alert("There was an error submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessMessage = () => {
    setSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {/* Success Message */}
      {success && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto sm:max-w-md mx-auto z-50 bg-green-50 border border-green-200 rounded-xl shadow-lg p-4 animate-fade-in">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-green-800">
                Application submitted successfully!
              </p>
              <p className="mt-1 text-sm text-green-600">
                Thank you for your interest in volunteering! We'll contact you within 24 hours.
              </p>
            </div>
            <button
              onClick={closeSuccessMessage}
              className="ml-4 flex-shrink-0 text-green-400 hover:text-green-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 🌟 Enhanced Hero Section */}
      <section
        className="relative h-[70vh] flex items-center justify-center text-center bg-cover bg-fixed bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/70"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Volunteer With <span className="text-yellow-400">Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join our community of changemakers and create lasting impact together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#signup"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Your Journey
            </a>
            <a
              href="#opportunities"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Explore Roles
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 💬 Enhanced Why Volunteer Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-yellow-500 font-semibold text-lg mb-2 block">MAKE A DIFFERENCE</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Volunteer With <span className="text-blue-600">Us?</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "👥",
                title: "Build Community",
                desc: "Connect with like-minded individuals and build meaningful relationships"
              },
              {
                icon: "💡",
                title: "Learn Skills",
                desc: "Develop new abilities and gain valuable experience for your career"
              },
              {
                icon: "❤️",
                title: "Make Impact",
                desc: "See tangible results from your efforts and change lives directly"
              },
              {
                icon: "🌟",
                title: "Personal Growth",
                desc: "Challenge yourself and discover new passions and purposes"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📝 Enhanced Volunteer Form */}
      <section id="signup" className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-green-500 font-semibold text-lg mb-2 block">JOIN US</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Make a <span className="text-green-600">Difference?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and we'll help you find the perfect volunteer opportunity
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              {/* Form Side */}
              <div className="md:w-2/3 p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Area of Interest *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select an area</option>
                      <option>Teaching & Mentorship</option>
                      <option>Community Health</option>
                      <option>Event Coordination</option>
                      <option>Environmental Care</option>
                      <option>Tech Support</option>
                      <option>Elderly Care</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Tell us about yourself</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="What motivates you to volunteer? Any relevant experience?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-green-300 disabled:to-blue-300 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl disabled:hover:shadow-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      "Join Our Volunteer Team"
                    )}
                  </button>
                </form>
              </div>

              {/* Info Side */}
              <div className="md:w-1/3 bg-gradient-to-br from-green-500 to-blue-500 text-white p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6">Why Join Us?</h3>
                <ul className="space-y-4">
                  {[
                    "Flexible scheduling around your availability",
                    "Training and ongoing support provided",
                    "Make real impact in your community",
                    "Meet amazing like-minded people",
                    "Gain valuable experience and skills",
                    "References and certification available"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-xl">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 p-4 bg-white/20 rounded-xl">
                  <p className="text-sm">
                    💌 <strong>We'll contact you within 24 hours</strong> to discuss the next steps and find the perfect role for you!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default VolunteerPage;