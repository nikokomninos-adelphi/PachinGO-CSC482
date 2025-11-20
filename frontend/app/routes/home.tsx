/**
 * home.tsx - the root route
 */

import type { Route } from "./+types/home";
import { Link } from "react-router";
import {
  FaPlay,
  FaSearch,
  FaWrench,
  FaInfoCircle,
  FaMoneyBillWave,
} from "react-icons/fa";

import NavLoginOnly from "~/components/nav/NavLoginOnly";
import { IoMail } from "react-icons/io5";
import { useEffect } from "react";
import Logo from "~/components/nav/Logo";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PachinGO!" },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const Home = () => {
  return (
    <div className="bg-[url('/pattern2.svg')] dark:bg-[url('/pattern2_dark.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite] min-h-screen flex flex-col justify-center items-center">
      <div className="flex w-full justify-end mr-[5vw]">
        <NavLoginOnly />
      </div>
      <div className="m-2 p-20 grid grid-cols-2 gap-10 w-[90vw] h-[90vh] rounded-2xl bg-[var(--color-bg)] border-1 border-[var(--color-border-alt)]">
        <div className="col-span-1 flex flex-col justify-center">
          <div className="mb-10">
            <Logo width={100} />
          </div>
          <h2 className="text-3xl mb-15 text-[var(--color-text-alt)]">
            A spiritual successor to <i>Peggle</i>, now featuring a level
            editor.
          </h2>
          <div className="flex flex-row">
            <Link
              to="/demo"
              className="flex justify-start items-center p-3 bg-[var(--color-hero-button)] hover:bg-[#575e8f] ease-linear duration-75 text-[var(--color-bg-alt)] dark:text-[var(--color-text)] rounded-md mb-5 mr-2 w-65 h-20 gap-2"
            >
              <FaPlay />
              <h1 className="text-lg">Play The Demo Levels</h1>
            </Link>

            <Link
              to="/search"
              className="flex justify-start items-center p-3 bg-[var(--color-hero-button)] hover:bg-[#8f5757] ease-linear duration-75 text-[var(--color-bg-alt)] dark:text-[var(--color-text)] rounded-md mb-5 w-65 h-20 gap-2"
            >
              <FaSearch />
              <h1 className="text-lg">Play User Created Levels</h1>
            </Link>
          </div>
          <div className="flex flex-row">
            <Link
              to="/editor"
              className="flex justify-start items-center p-3 bg-[var(--color-hero-button)] hover:bg-[#8f5787] ease-linear duration-75 text-[var(--color-bg-alt)] dark:text-[var(--color-text)] rounded-md mb-5 mr-2 w-65 h-20 gap-2"
            >
              <FaWrench />
              <h1 className="text-lg">Make Your Own Levels</h1>
            </Link>

            <Link
              to="/about"
              className="flex justify-start items-center p-3 bg-[var(--color-hero-button)] hover:bg-neutral-500 ease-linear duration-75 text-[var(--color-bg-alt)] dark:text-[var(--color-text)] rounded-md mb-5 w-65 h-20 gap-2"
            >
              <FaInfoCircle />
              <h1 className="text-lg">About The Project</h1>
            </Link>
          </div>
          <div className="flex flex-row">
            <Link
              to="https://docs.google.com/forms/d/e/1FAIpQLScM2HxSCttdwolVOBKbx0y5S_n04KVshtFBkdbr9Q_ysmhAug/viewform?usp=dialog"
              target="_blank"
              className="flex justify-start items-center p-3 bg-[var(--color-hero-button)] hover:bg-neutral-500 ease-linear duration-75 text-[var(--color-bg-alt)] dark:text-[var(--color-text)] rounded-md mb-5 mr-2 w-65 h-20 gap-2"
            >
              <IoMail />
              <h1 className="text-lg">Contact Us</h1>
            </Link>

            <Link
              to="https://ko-fi.com/nikokomninos"
              target="_blank"
              className="flex justify-start items-center p-3 bg-[var(--color-hero-button)] hover:bg-[#4B9B6E] ease-linear duration-75 text-[var(--color-bg-alt)] dark:text-[var(--color-text)] rounded-md mb-5 w-65 h-20 gap-2"
            >
              <FaMoneyBillWave />
              <h1 className="text-lg">Support The Project</h1>
            </Link>
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center items-center">
          <div className="bg-[var(--color-bg-alt)] flex flex-col justify-center items-center w-[100%] h-[100%] border-1 border-[var(--color-border-alt)] rounded-xl">
            <h1>GIF Coming Soon!</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
