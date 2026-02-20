"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// Professional Next.js Icons
import {
  Users,
  Lightbulb,
  Heart,
  Star,
  CheckCircle2,
  Mail,
  Check,
  X,
  ChevronRight,
} from "lucide-react";

const VolunteerPage = () => {
  const [formData, setFormData] = useState({
    region: "Volunteer",
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          region: "Volunteer",
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert(
          "There was an error submitting your application. Please try again.",
        );
      }
    } catch (error) {
      alert(
        "There was an error submitting your application. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {/* 🟢 Success Message */}
      {success && (
        <div
          role="alert"
          className="fixed top-4 right-4 left-4 sm:left-auto sm:max-w-md mx-auto z-50 bg-green-50 border border-green-200 rounded-xl shadow-lg p-4 animate-fade-in"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-green-800">
                Application submitted successfully!
              </p>
              <p className="mt-1 text-sm text-green-600">
                Thank you for your interest! We'll contact you within 24 hours.
              </p>
            </div>
            <button
              onClick={() => setSuccess(false)}
              aria-label="Close message"
              className="ml-4 flex-shrink-0 text-green-400 hover:text-green-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 🌟 SEO Optimized Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
        {/* Next.js Image for better LCP & SEO */}
        <Image
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2070&q=80"
          alt="Volunteers working together in a community"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/70"></div>
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Volunteer With <span className="text-green-400">Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join our community of changemakers and create lasting impact
            together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#signup"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              Start Your Journey <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 💬 Why Volunteer Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-16">
            <span className="text-green-500 font-semibold text-lg mb-2 block uppercase tracking-wider">
              Make a difference
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Volunteer With <span className="text-green-600">Us?</span>
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-10 h-10 text-blue-500" />,
                title: "Build Community",
                desc: "Connect with like-minded individuals and build meaningful relationships.",
              },
              {
                icon: <Lightbulb className="w-10 h-10 text-yellow-500" />,
                title: "Learn Skills",
                desc: "Develop new abilities and gain valuable experience for your career.",
              },
              {
                icon: <Heart className="w-10 h-10 text-red-500" />,
                title: "Make Impact",
                desc: "See tangible results from your efforts and change lives directly.",
              },
              {
                icon: <Star className="w-10 h-10 text-green-500" />,
                title: "Personal Growth",
                desc: "Challenge yourself and discover new passions and purposes.",
              },
            ].map((item, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="mb-4 bg-gray-50 inline-block p-4 rounded-full">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 📝 Volunteer Form Section */}
      <section
        id="signup"
        className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-white to-gray-50 scroll-mt-10"
      >
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <span className="text-green-500 font-semibold text-lg mb-2 block uppercase tracking-wider">
              Join Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Make a{" "}
              <span className="text-green-600">Difference?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and we'll help you find the perfect
              volunteer opportunity.
            </p>
          </header>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              {/* Form Side */}
              <div className="md:w-2/3 p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-semibold text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-semibold text-gray-700 mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block font-semibold text-gray-700 mb-2"
                    >
                      Area of Interest *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    >
                      <option value="">Select an area</option>
                      <option value="Teaching & Mentorship">
                        Teaching & Mentorship
                      </option>
                      <option value="Community Health">Community Health</option>
                      <option value="Event Coordination">
                        Event Coordination
                      </option>
                      <option value="Environmental Care">
                        Environmental Care
                      </option>
                      <option value="Tech Support">Tech Support</option>
                      <option value="Elderly Care">Elderly Care</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-semibold text-gray-700 mb-2"
                    >
                      Tell us about yourself
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                      placeholder="What motivates you to volunteer? Any relevant experience?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-green-300 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
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
                    "Flexible scheduling",
                    "Training provided",
                    "Make real impact",
                    "Meet amazing people",
                    "Gain valuable experience",
                    "Certification available",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-green-200" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-4 bg-white/20 rounded-xl flex items-start gap-3">
                  <Mail className="w-6 h-6 flex-shrink-0 mt-1" />
                  <p className="text-sm">
                    <strong>We'll contact you within 24 hours</strong> to
                    discuss the next steps and find the perfect role!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </main>
  );
};

export default VolunteerPage;
