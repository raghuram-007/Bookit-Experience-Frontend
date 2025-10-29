import React, { useState } from "react";
import deliote from "../assets/deliote.png"; // update path if your logo is elsewhere

const Header: React.FC = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      {/* ================= HEADER ================= */}
      <header className="bg-white backdrop-blur-sm border-b border-gray-200 shadow-lg sticky top-0 z-50 w-full">
        <div className="mx-auto flex items-center justify-between py-4 px-6">
          {/* Left - Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <img
                src={deliote}
                alt="Highway Delite Logo"
                className="w-12 h-12 rounded-full border-2 shadow-md group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute rounded-full blur opacity-25 group-hover:opacity-75 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Middle - Search Bar */}
          <div className="flex items-center bg-white border-2 border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-yellow-400 transition-all duration-300 w-1/2 max-w-xl focus-within:border-yellow-500 focus-within:shadow-lg overflow-hidden">
            <input
              type="text"
              placeholder="🔍 Search experiences..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow px-6 py-3 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-lg"
            />
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold px-8 py-3 transition-all duration-200 hover:shadow-lg transform hover:scale-105">
              Search
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
