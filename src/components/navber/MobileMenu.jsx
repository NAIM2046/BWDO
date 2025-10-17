"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronDown, Home, Info, Users, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "./navItems";
import DonateButton from "../ui/DonateButton";
import logo from "/public/FB_IMG_1760359831083-removebg-preview.png";
import Image from "next/image";

const MobileMenu = ({ isOpen, onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleSubmenu = (label) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  // Icon component renderer with fallback icons
  const renderIcon = (IconComponent, size = 20) => {
    if (!IconComponent) return null;
    return <IconComponent size={size} className="flex-shrink-0" />;
  };

  const getFallbackIcon = (label) => {
    const iconMap = {
      Home: Home,
      About: Info,
      Team: Users,
      Donate: Heart,
    };
    return iconMap[label] || null;
  };

  if (!isOpen && !isClosing) return null;

  return (
    <AnimatePresence>
      {(isOpen || isClosing) && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop with animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Menu Panel with slide animation */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl"
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <Image src={logo} height={60} width={60} alt="logo"></Image>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 group"
                  aria-label="Close menu"
                >
                  <X
                    size={24}
                    className="text-gray-600 group-hover:text-gray-800 transition-colors"
                  />
                </button>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="p-4 overflow-y-auto h-full pb-32">
              <nav className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    {item.type === "submenu" ? (
                      <div className="mb-1">
                        <button
                          onClick={() => toggleSubmenu(item.label)}
                          className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-green-50 active:bg-green-100 transition-all duration-200 group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                              {item.icon
                                ? renderIcon(item.icon)
                                : renderIcon(getFallbackIcon(item.label))}
                            </div>
                            <span className="font-semibold text-gray-900 text-left">
                              {item.label}
                            </span>
                          </div>
                          <ChevronDown
                            size={18}
                            className={`text-gray-500 transition-transform duration-300 ${
                              openSubmenu === item.label
                                ? "rotate-180 text-green-600"
                                : ""
                            }`}
                          />
                        </button>

                        {/* Animated Submenu Items */}
                        <AnimatePresence>
                          {openSubmenu === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="ml-4 mt-1 space-y-1 overflow-hidden"
                            >
                              {item.items.map((subItem, subIndex) => (
                                <motion.div
                                  key={subItem.href}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: subIndex * 0.1 }}
                                >
                                  <Link
                                    href={subItem.href}
                                    onClick={handleClose}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 group"
                                  >
                                    <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                                      {subItem.icon
                                        ? renderIcon(subItem.icon, 16)
                                        : renderIcon(
                                            getFallbackIcon(subItem.label),
                                            16
                                          )}
                                    </div>
                                    <span className="font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                                      {subItem.label}
                                    </span>
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={handleClose}
                        className="flex items-center gap-3 p-4 rounded-2xl hover:bg-green-50 active:bg-green-100 transition-all duration-200 group"
                      >
                        <div className="p-2 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                          {item.icon
                            ? renderIcon(item.icon)
                            : renderIcon(getFallbackIcon(item.label))}
                        </div>
                        <span className="font-semibold text-gray-900">
                          {item.label}
                        </span>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Support Section */}
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
                <div className="text-center">
                  <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-bold text-gray-900">Make a Difference</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Your support helps us continue our mission
                  </p>
                </div>
              </div>
            </div>

            {/* Sticky Donate Button */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-white/95 border-t border-gray-200">
              <DonateButton />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
