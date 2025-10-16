import NavBar from "@/components/navber/Navber";
import React from "react";

const Homelayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default Homelayout;
