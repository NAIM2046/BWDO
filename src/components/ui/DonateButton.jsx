import React from "react";
import { useRouter } from "next/navigation";

const DonateButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/donate");
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 ease-out focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 hover:shadow-red-200 relative overflow-hidden group"
    >
      {/* Shine effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></span>

      {/* Text with animation */}
      <span className="relative flex items-center gap-2">
        <span className="group-hover:scale-110 transition-transform duration-300">
          ❤️
        </span>
        <span>Donate Now</span>
        <span className="group-hover:translate-x-1 transition-transform duration-300">
          →
        </span>
      </span>
    </button>
  );
};

export default DonateButton;
