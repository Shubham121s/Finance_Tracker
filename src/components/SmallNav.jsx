"use client";

import Image from "next/image";
import React, { useState } from "react";
import NavItems from "./NavItems";

export default function SmallNav() {
  // State to control the visibility of the menu
  const [show, setShow] = useState(false);

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setShow((prevShow) => !prevShow);
  };

  return (
    <div className="md:hidden relative">
      {/* Menu icon container */}
      <div 
        onClick={toggleMenu} 
        className="flex justify-center rounded cursor-pointer p-2 transition-transform duration-300 transform hover:scale-110"
      >
        <Image
          src="/menu.svg"  // Path to the menu icon
          alt="menu"  // Alt text for the image
          width={30}  // Width of the menu icon
          height={30}  // Height of the menu icon
          style={{
            // Invert colors and adjust brightness/contrast for better visibility
            filter: "invert(100%) sepia(5%) saturate(7478%) hue-rotate(306deg) brightness(116%) contrast(104%)",
          }}
        />
      </div>
      
      {/* Dropdown menu for smaller screens */}
      <div 
        className={`fixed top-16 right-4 w-3/4 sm:w-2/6 bg-gray-800 p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${show ? "scale-100 opacity-100" : "scale-75 opacity-0 pointer-events-none"}`}
      >
        <NavItems />  {/* Navigation items */}
      </div>
    </div>
  );
}
