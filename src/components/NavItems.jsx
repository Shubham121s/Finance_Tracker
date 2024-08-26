"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function NavItems() {
  const pathname = usePathname();
  const router = useRouter();

  const handlePrefetch = (path) => {
    router.prefetch(path);
  };

  return (
    <div className="w-full md:w-auto" id="navbar-solid-bg">
      {/* Navigation items container */}
      <ul className="flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse mt-4 rounded-lg md:mt-0 bg-gray-800 md:bg-transparent border-gray-700 md:border-0">
        {/* Dashboard Link */}
        <li>
          <Link
            href="/"
            className={`block py-2 px-3 rounded transition-all duration-300 ${
              pathname === "/"
                ? "text-yellow-300 font-bold"
                : "text-white"
            } md:hover:text-yellow-300 hover:bg-gray-700 md:hover:bg-transparent`}
            prefetch={false}  // Disabling automatic prefetching
            onMouseEnter={() => handlePrefetch("/")}
          >
            Dashboard
          </Link>
        </li>
        {/* Transactions Link */}
        <li>
          <Link
            href="/transactions"
            className={`block py-2 px-3 rounded transition-all duration-300 ${
              pathname === "/transactions"
                ? "text-yellow-300 font-bold"
                : "text-white"
            } md:hover:text-yellow-300 hover:bg-gray-700 md:hover:bg-transparent`}
            prefetch={false}
            onMouseEnter={() => handlePrefetch("/transactions")}
          >
            Transactions
          </Link>
        </li>
        {/* Budget Link */}
        <li>
          <Link
            href="/budget"
            className={`block py-2 px-3 rounded transition-all duration-300 ${
              pathname === "/budget"
                ? "text-yellow-300 font-bold"
                : "text-white"
            } md:hover:text-yellow-300 hover:bg-gray-700 md:hover:bg-transparent`}
            prefetch={false}
            onMouseEnter={() => handlePrefetch("/budget")}
          >
            Budget
          </Link>
        </li>
        
      </ul>
    </div>
  );
}
