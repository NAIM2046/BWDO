import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Brand Section */}
          <div className="lg:col-span-1 flex flex-col items-center md:items-start">
            {/* Logo Section - Centered */}
            <div className="mb-4 flex flex-col items-center md:items-start w-full">
              <div className="mb-3 flex justify-center md:justify-start lg:ml-5">
                <Logo />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-xl font-bold text-white mb-1">
                  Brotherhood Welfare
                </h2>
                <h2 className="text-xl font-bold text-white mb-1">
                  and Development Organization
                </h2>
                <p className="text-blue-400 font-semibold text-sm">
                  Non-Profit Organization
                </p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed max-w-md text-center md:text-left">
              Dedicated to creating positive change in communities through
              education, healthcare, and sustainable development initiatives.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <FaFacebookF className="w-4 h-4" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-400 text-gray-300 hover:text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <FaTwitter className="w-4 h-4" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-pink-600 text-gray-300 hover:text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <FaInstagram className="w-4 h-4" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-700 text-gray-300 hover:text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <FaLinkedinIn className="w-4 h-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start py-10">
            <h3 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                >
                  Our Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/get-involved"
                  className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                >
                  Get Involved
                </Link>
              </li>
              <li>
                <Link
                  href="/volunteer"
                  className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                >
                  Blog & News
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="flex flex-col items-center md:items-start py-10">
            <h3 className="text-lg font-semibold mb-6 text-white">
              Our Programs
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/education"
                  className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                >
                  Education
                </Link>
              </li>
              <li>
                <Link
                  href="/healthcare"
                  className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                >
                  Healthcare
                </Link>
              </li>
              <li>
                <Link
                  href="/environment"
                  className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                >
                  Environment
                </Link>
              </li>
              <li>
                <Link
                  href="/women-empowerment"
                  className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                >
                  Women Empowerment
                </Link>
              </li>
              <li>
                <Link
                  href="/disaster-relief"
                  className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                >
                  Disaster Relief
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start py-10">
            <h3 className="text-lg font-semibold mb-6 text-white">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start max-w-xs">
                <FaMapMarkerAlt className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 Charity Street, Hope City, HC 12345
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <FaPhone className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <FaEnvelope className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@bwdo.org</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6 w-full max-w-xs">
              <h4 className="text-sm font-semibold mb-3 text-white text-center md:text-left">
                Stay Updated
              </h4>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-gray-800 text-white rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg sm:rounded-r-lg sm:rounded-l-none transition-colors duration-300 text-sm font-medium whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Brotherhood Welfare and
              Development Organization. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center space-x-4 md:space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xs md:text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xs md:text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/disclaimer"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xs md:text-sm"
              >
                Disclaimer
              </Link>
              <div className="text-green-500 flex items-center text-xs md:text-sm">
                <FaHeart className="h-3 w-3 mr-1" />
                Registered Non-Profit Charity
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
