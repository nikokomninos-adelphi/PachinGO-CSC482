/**
 * home.tsx - the root route
 */

import type { Route } from "./+types/home";
import { Link } from "react-router";
import { FaPlay, FaSearch, FaWrench, FaInfoCircle } from "react-icons/fa";

import NavLoginOnly from "~/components/nav/NavLoginOnly";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PachinGO!" },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const Home = () => {
  return (
    <div className="bg-[url('/pattern2.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite] min-h-screen flex flex-col justify-center items-center text-[#352F36]">
      <div className="flex w-full justify-end mr-[5vw]">
        <NavLoginOnly />
      </div>
      <div className="m-2 p-20 grid grid-cols-2 gap-10 w-[90vw] h-[90vh] rounded-2xl bg-[#FFF] border-1 border-[#C1C1CC]">
        <div className="col-span-1 flex flex-col justify-center">
          {
            <img
              src="/logo_outline.png"
              alt="PachinGO! Logo, Large"
              className="mb-10 w-125"
            />
          }
          <h2 className="text-3xl mb-15 text-gray-600">
            A spiritual successor to <i>Peggle</i>, now featuring a level
            editor.
          </h2>
          <div className="flex flex-row">
            <Link
              to="/demo"
              className="flex justify-start items-center p-3 bg-[#343434] hover:bg-[#575e8f] drop-shadow-sm ease-linear duration-75 text-white rounded-md mb-5 mr-2 w-65 h-20 gap-2"
            >
              <FaPlay />
              <h1 className="text-lg">Play The Demo Levels</h1>
            </Link>
            <Link
              to="/search"
              className="flex justify-start items-center p-3 bg-[#343434] hover:bg-[#8f5757] drop-shadow-sm ease-linear duration-75 text-white rounded-md mb-5 w-65 h-20 gap-2"
            >
              <FaSearch />
              <h1 className="text-lg">Play User Created Levels</h1>
            </Link>
          </div>
          <div className="flex flex-row">
            <Link
              to="/"
              className="flex justify-start items-center p-3 bg-[#343434] hover:bg-[#8f5787] drop-shadow-sm ease-linear duration-75 text-white rounded-md mb-5 mr-2 w-65 h-20 gap-2"
            >
              <FaWrench />
              <h1 className="text-lg">Make Your Own Levels</h1>
            </Link>
            <Link
              to="/about"
              className="flex justify-start items-center p-3 bg-[#343434] hover:bg-neutral-500 drop-shadow-sm ease-linear duration-75 text-white rounded-md mb-5 w-65 h-20 gap-2"
            >
              <FaInfoCircle />
              <h1 className="text-lg">About The Project</h1>
            </Link>
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center items-center">
          <div className="bg-[#FAFAFA] flex flex-col justify-center items-center w-[100%] h-[100%] border-1 border-black rounded-xl">
            <h1>Future Gameplay GIF</h1>
            <h1>
              Will be a level with pegs that spell out <i>PachinGO!</i>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
