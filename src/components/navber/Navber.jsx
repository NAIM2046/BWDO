"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/public/FB_IMG_1760359831083.jpg";
import { navItems } from "./navItems";
import MobileMenu from "./MobileMenu";
import DonateButton from "../ui/DonateButton";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMouseEnter = (label) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setActiveSubmenu(label);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveSubmenu(null);
    }, 500);
    setHoverTimeout(timeout);
  };

  const handleSubmenuEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleSubmenuLeave = () => {
    setActiveSubmenu(null);
  };

  const renderIcon = (IconComponent, size = 18) => {
    if (!IconComponent) return null;
    return <IconComponent size={size} />;
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50 py-2 px-3 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <Image
                  src={logo}
                  alt="Logo"
                  width={65}
                  height={65}
                  className="object-contain transition-transform duration-300 group-hover:scale-105 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-4 xl:mx-8">
              <div className="flex items-center space-x-2 xl:space-x-4 2xl:space-x-6">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.type === "submenu" ? (
                      <div className="relative">
                        <div
                          className={`px-3 py-2 xl:px-4 xl:py-2 rounded-2xl flex items-center gap-1 font-semibold cursor-pointer transition-all duration-300 text-sm xl:text-base ${
                            activeSubmenu === item.label
                              ? "bg-primary text-green-700 shadow-md scale-105"
                              : "hover:bg-gray-100 hover:text-primary"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-500 ${
                              activeSubmenu === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </div>

                        {/* Smooth Animated Submenu */}
                        <AnimatePresence>
                          {activeSubmenu === item.label && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.98 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="absolute top-full left-0 mt-2 w-56 xl:w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                              onMouseEnter={handleSubmenuEnter}
                              onMouseLeave={handleSubmenuLeave}
                            >
                              {item.items.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className="flex rounded-xl p-2 items-center gap-3 px-4 py-3 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200 group"
                                >
                                  {renderIcon(subItem.icon)}
                                  <span className="font-semibold text-gray-700 group-hover:text-primary text-sm xl:text-base">
                                    {subItem.label}
                                  </span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`px-3 py-2 xl:px-4 xl:py-2 hover:text-green-600 rounded-2xl font-bold flex items-center gap-2 transition-all duration-300 text-sm xl:text-base ${
                          activeSubmenu === item.label
                            ? "bg-primary shadow-md scale-105"
                            : "hover:text-primary hover:text-green-600"
                        }`}
                      >
                        {item.icon && renderIcon(item.icon)}
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Donate Button */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <DonateButton />
            </div>

            {/* Tablet Menu & Toggle */}
            <div className="flex items-center gap-4">
              {/* Donate Button - Tablet only */}
              <div className="hidden md:flex lg:hidden items-center flex-shrink-0">
                <DonateButton />
              </div>

              {/* Mobile Toggle */}
              <div className="lg:hidden flex items-center">
                <button
                  className="text-primary hover:text-secondary transition-all duration-300 p-2 rounded-lg hover:bg-gray-100 transform hover:scale-105"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle menu"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </>
  );
};

export default NavBar;
