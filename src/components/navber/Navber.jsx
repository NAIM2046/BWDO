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
      <nav className="bg-white shadow-md sticky top-0 z-50 py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <Image
                  src={logo}
                  alt="Logo"
                  width={85}
                  height={85}
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center space-x-2 lg:space-x-4">
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
                          className={`px-4 py-2 rounded-2xl flex items-center gap-1 font-bold cursor-pointer transition-all duration-300 ${
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
                              className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
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
                                  <span className="font-bold text-gray-700 group-hover:text-primary ">
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
                        className={`px-4 py-2 hover:text-green-600 rounded-2xl font-medium flex items-center gap-2 transition-all duration-300 ${
                          activeSubmenu === item.label
                            ? "bg-primary  shadow-md scale-105"
                            : " hover:text-primary hover:text-green-600"
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
            <div className="hidden md:flex items-center flex-shrink-0">
              <DonateButton />
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center">
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
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </>
  );
};

export default NavBar;
