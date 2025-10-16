"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";

import { navItems } from "./navItems";
import DonateButton from "../ui/DonateButton";

const MobileMenu = ({ isOpen, onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (label) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  // Icon component renderer
  const renderIcon = (IconComponent, size = 18) => {
    if (!IconComponent) return null;
    return <IconComponent size={size} />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-4 overflow-y-auto h-full pb-24">
          <div className="space-y-2">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="border-b border-gray-100 last:border-b-0"
              >
                {item.type === "submenu" ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {item.icon && renderIcon(item.icon)}
                        <span className="font-medium text-gray-800">
                          {item.label}
                        </span>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          openSubmenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Submenu Items */}
                    {openSubmenu === item.label && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={onClose}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                          >
                            {renderIcon(subItem.icon)}
                            <span className="font-medium text-gray-700 group-hover:text-primary">
                              {subItem.label}
                            </span>
                            {subItem.badge && (
                              <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                {subItem.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {item.icon && renderIcon(item.icon)}
                    <span className="font-medium text-gray-800">
                      {item.label}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Donate Button */}
          <div className="absolute bottom-6 left-4 right-4">
            <DonateButton></DonateButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
