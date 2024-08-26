import Link from "next/link";
import React from "react";
import NavItems from "./NavItems";
import SmallNav from "./SmallNav";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-3xl font-extrabold text-white hover:text-yellow-300 transition-all duration-300">
            FinanceForge
          </span>
        </Link>

        <div className="hidden md:flex space-x-8">
          <NavItems />
        </div>

        <div className="md:hidden">
          <SmallNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

