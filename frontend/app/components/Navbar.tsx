/**
 * Navbar.tsx - a component for the site's navbar
 */

import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FaPlay,
  FaSearch,
  FaWrench,
  FaInfoCircle,
  FaMoneyBillWave,
} from "react-icons/fa";

import NavLoginOnly from "./NavLoginOnly";

const Navbar = () => {
  return (
    <div>
      <div className="bg-[#FAFAFA] border-b-1 border-b-[#E1E1EE] p-1 mb-3">
        <div className="mr-[3vw]">
          <NavLoginOnly />
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-center-safe items-center gap-25 border-b-1 border-b-[#E1E1EE]">
          <Link to="/">
            <img
              src="/logo_outline.png"
              alt="PachinGO! Logo, Large"
              className="h-10 mb-3 hover:drop-shadow-lg ease-linear duration-150"
            />
          </Link>
          <div className="flex flex-row gap-3 mt-1 mb-3 border-1 border-[#E1E1EE] text-[#4B5563] font-semibold tracking-tight rounded-3xl p-3">
            <Link
              to="/search?term=Level&page=1"
              className="flex group items-center gap-2 ml-2 hover:text-blue-500 ease-linear duration-75 border-r-1 border-r-[#E1E1EE] pr-5"
            >
              <FaPlay size={10} />
              <h1 className="text-sm">Demo Levels</h1>
            </Link>

            <Link
              to="/search"
              className="flex group items-center gap-2 ml-2 hover:text-orange-500 ease-linear duration-75 border-r-1 border-r-[#E1E1EE] pr-5"
            >
              <FaSearch size={11} />
              <h1 className="text-sm">User Levels</h1>
            </Link>

            <Link
              to=""
              className="flex group items-center gap-2 ml-2 hover:text-purple-500 ease-linear duration-75"
            >
              <FaWrench size={12} />
              <h1 className="text-sm">Level Editor</h1>
            </Link>
          </div>
          <div className="flex flex-row justify-center items-center gap-2 mt-1 mb-3 border-1 border-[#E1E1EE] text-[#4B5563] font-semibold tracking-tight rounded-3xl p-3 text-sm">
            <Link
              to=""
              className="flex group items-center gap-2 ml-2 hover:text-gray-400 ease-linear duration-75 border-r-1 border-r-[#E1E1EE] pr-5"
            >
              <FaInfoCircle size={12} />
              <h1 className="text-sm">About</h1>
            </Link>

            <Link
              to=""
              className="flex group items-center gap-2 ml-2 hover:text-green-400 ease-linear duration-75"
            >
              <FaMoneyBillWave size={14} />
              <h1 className="text-sm">Donate</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
