import ButtonToUp from "@/components/ButtonTopUp/ButtonToUp";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/navber/Navber";
import React from "react";

const Homelayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col mx-auto max-w-[1400px] selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Skip to Content Link (Great for SEO & Accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:p-4 focus:text-emerald-600 focus:font-bold shadow-md rounded-b-lg ml-10"
      >
        Skip to content
      </a>

      {/* 2. Sticky Navbar wrapper (Optional but recommended for NGOs) */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <NavBar />
      </header>

      {/* 3. Main Content Area */}
      <main id="main-content" className="flex-grow outline-none">
        {children}
      </main>

      <Footer />

      {/* 4. Utility Components */}
      <ButtonToUp />
    </div>
  );
};

export default Homelayout;
