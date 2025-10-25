"use client";
import React, { useState } from "react";
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn,
  FaTwitter,
  FaPaperPlane,
  FaClock,
  FaGlobe
} from "react-icons/fa";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create Gmail compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=contact@bwdo.org&su=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    // Open Gmail in new tab
    window.open(gmailUrl, '_blank');
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    
    alert("Redirecting to Gmail to send your message...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-4">
            Contact Us
          </h1>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form - Left Side */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mr-4 border border-blue-200/50">
                <FaPaperPlane className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Send us a Message</h2>
                <p className="text-slate-500 text-sm mt-1">We typically respond within 24 hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300/80 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200 bg-white/50"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300/80 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200 bg-white/50"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-semibold text-slate-700">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300/80 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200 bg-white/50"
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-slate-300/80 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200 bg-white/50 resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <FaPaperPlane className="w-4 h-4" />
                <span className="text-base">Send Message via Gmail</span>
              </button>

              <p className="text-xs text-slate-400 text-center pt-2">
                * Clicking send will open Gmail with your message pre-filled
              </p>
            </form>
          </div>

          {/* Contact Information - Right Side */}
          <div className="space-y-6 lg:space-y-8">
            {/* Contact Info Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-sm">
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mr-4 border border-emerald-200/50">
                  <FaEnvelope className="w-5 h-5 text-emerald-500" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Contact Information</h2>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors duration-200 border border-blue-200/50">
                    <FaMapMarkerAlt className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-800 mb-1">Our Address</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Dhaka, Savar, Bangladesh<br />
                      <span className="text-sm text-slate-500">Main Office Location</span>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors duration-200 border border-emerald-200/50">
                    <FaPhone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-800 mb-1">Phone Number</h3>
                    <p className="text-slate-600">+880 1234-567890</p>
                    <p className="text-slate-600 text-sm">+880 9876-543210 (Alternate)</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-violet-100 transition-colors duration-200 border border-violet-200/50">
                    <FaEnvelope className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-800 mb-1">Email Address</h3>
                    <p className="text-slate-600">contact@bwdo.org</p>
                    <p className="text-slate-600 text-sm">info@bwdo.org</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors duration-200 border border-amber-200/50">
                    <FaClock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-800 mb-1">Business Hours</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Sunday - Thursday: 9:00 AM - 6:00 PM<br />
                      <span className="text-sm text-slate-500">Friday - Saturday: Closed</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-6 border-t border-slate-200/60">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">Follow Us On Social Media</h3>
                <div className="flex justify-center space-x-3">
                  {[
                    { icon: FaFacebookF, color: "bg-blue-400 hover:bg-blue-500", href: "#" },
                    { icon: FaInstagram, color: "bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600", href: "#" },
                    { icon: FaLinkedinIn, color: "bg-blue-400 hover:bg-blue-500", href: "#" },
                    { icon: FaTwitter, color: "bg-sky-400 hover:bg-sky-500", href: "#" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center text-white transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg`}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-sm mt-10">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-rose-100 to-orange-100 rounded-xl flex items-center justify-center mr-4 border border-rose-200/50">
              <FaGlobe className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Find Us Here</h3>
          </div>
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl h-48 sm:h-56 flex items-center justify-center border-2 border-dashed border-slate-300/60">
            <div className="text-center text-slate-500">
              <FaMapMarkerAlt className="w-12 h-12 mx-auto mb-3 text-rose-300" />
              <p className="font-medium">Interactive Map</p>
              <p className="text-sm mt-1">Google Maps integration available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;