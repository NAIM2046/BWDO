import ButtonToUp from "@/components/ButtonTopUp/ButtonToUp";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/navber/Navber";
import React from "react";

const Homelayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ButtonToUp></ButtonToUp>
    </div>
  );
};

export default Homelayout;
