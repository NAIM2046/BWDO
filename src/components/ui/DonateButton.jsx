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
      className="
        /* Base Styles */
        inline-flex items-center justify-center
        px-4 py-3 md:px-4 md:py-4 lg:px-8 lg:py-4
        bg-gradient-to-r from-green-500 to-emerald-600 
        hover:from-green-600 hover:to-emerald-700
        active:from-green-700 active:to-emerald-800
        text-white font-semibold md:font-bold
        rounded-xl md:rounded-2xl
        shadow-lg hover:shadow-xl active:shadow-lg
        transform hover:scale-105 active:scale-95
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50
        relative overflow-hidden
        group
        w-full lg:w-auto
        min-h-[50px] md:min-h-[60px]
        
        /* Responsive text sizing */
        text-sm md:text-base lg:text-lg
      "
      aria-label="Make a donation"
    >
      {/* Animated background shine effect */}
      <span
        className="
          absolute inset-0 
          bg-gradient-to-r from-transparent via-white/30 to-transparent 
          -skew-x-12 transform translate-x-[-150%] 
          group-hover:translate-x-[150%] 
          transition-transform duration-1000 ease-out
        "
      />

      {/* Pulsing glow effect */}
      <span
        className="
          absolute inset-0 
          rounded-xl md:rounded-2xl
          bg-gradient-to-r from-green-400/20 to-emerald-500/20
          animate-pulse
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        "
      />

      {/* Button content */}
      <span className="relative flex items-center gap-2 md:gap-3">
        {/* Animated heart icon */}
        <span
          className="
            text-base md:text-lg lg:text-xl
            group-hover:scale-110 group-active:scale-95
            transition-transform duration-300
            animate-heartbeat
          "
        >
          ❤️
        </span>

        {/* Text with responsive sizing */}
        <span className="whitespace-nowrap">Donate</span>
      </span>

      {/* Ripple effect on click */}
      <span
        className="
          absolute inset-0 
          bg-white/20 
          rounded-xl md:rounded-2xl
          scale-0 
          group-active:scale-100 
          opacity-0 group-active:opacity-100
          transition-transform duration-300
        "
      />
    </button>
  );
};

export default DonateButton;
