/**
 * home.tsx - the root route
 */

import type { Route } from "./+types/home";
import { Link } from "react-router";
import { FaPlay, FaSearch, FaWrench, FaInfoCircle } from "react-icons/fa";

import NavLoginOnly from "~/components/NavLoginOnly";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PachinGO!" },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const Home = () => {
  return (
    <div className="bg-[url('./../../public/pattern2.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite] min-h-screen flex flex-col justify-center items-center text-[#352F36]">
      <NavLoginOnly />
      <div className="m-2 p-20 grid grid-cols-2 gap-10 w-[98vw] h-[96vh] rounded-2xl bg-[#FFF] border-1 border-[#C1C1CC]">
        <div className="col-span-1 flex flex-col justify-center">
          {<img src="/logo_outline.png" alt="PachinGO! Logo, Large" className="mb-10 w-125" />}
          {/*<h1 className="text-7xl font-semibold mb-5">PachinGO!</h1>*/}
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
              to="/"
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
            <h1>Will be a level with pegs that spell out <i>PachinGO!</i></h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

/*export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="p-15 tracking-tighter"></div>
      <div className="flex flex-col justify-center items-center">
        <img src="/logo.png" alt="PachinGO! Logo, Large" className="mb-10" />
        {/* <h1 className="text-7xl mb-10">PachinGO!</h1> }
        <h2 className="text-3xl mb-15 text-gray-600">
          A spiritual successor to <i>Peggle</i>, now featuring a level editor.
        </h2>
        <div className="flex flex-row justify-center items-center mb-30">
          <Link
            to="/demo"
            className="p-3 bg-[#575e8f] hover:bg-[#363a59] drop-shadow-lg ease-linear duration-75 text-white rounded-2xl ml-5 mr-5"
          >
            <h1 className="text-lg">Play The Official Demo Levels</h1>
          </Link>
          <Link
            to="/search"
            className="p-3 bg-[#8f5757] hover:bg-[#593636] drop-shadow-lg ease-linear duration-75 text-white rounded-2xl ml-5 mr-5"
          >
            <h1 className="text-lg">Play User Created Levels</h1>
          </Link>
          <Link
            to="/"
            className="p-3 bg-[#8f5787] hover:bg-[#593659] drop-shadow-lg ease-linear duration-75 text-white rounded-2xl ml-5 mr-5"
          >
            <h1 className="text-lg">Make Your Own Levels</h1>
          </Link>
        </div>
        <div className="flex justify-center items-center text-xl border-t-2 border-l-2 border-r-2 border-black w-200 h-100">
          Future Gameplay GIF
        </div>
      </div>
      <div className="flex flex-col bg-[#545578] text-white p-5 tracking-tighter">
        <h1 className="text-5xl mt-10 mb-10 text-center font-bold">
          What is PachinGO?
        </h1>
        <div className="flex flex-col text-center items-center text-gray-200 mb-10">
          <p className="text-lg mb-10 max-w-[50%]">
            <i>PachinGO!</i> is a spiritual successor to <s>EA's</s> PopCap's
            beloved franchise <i>Peggle</i>. The Peggle franchise has lay
            relatively dormant, with later entries straying further from the
            identity and solid gameplay that fans loved from both <i>Peggle</i>{" "}
            and <i>Peggle Nights</i>. <i>PachinGO!</i> aims to bring life back
            to the franchise, promising:
          </p>
          <ul className="text-lg text-center ml-10">
            <li className="mb-3">
              An artstyle akin to the original <i>Peggle</i>
            </li>
            <li className="mb-3">
              Demo levels featuring the core gameplay you know and love
            </li>
            <li className="mb-3">
              A fully-featured level editor, with the ability to upload and
              download user levels
            </li>
            <li className="mb-3">And much more down the line...</li>
          </ul>
        </div>
      </div>
      <div className="h-100">
        <h1 className="text-4xl text-center font-bold mt-10 mb-10">
          The Team Behind PachinGO!
        </h1>
        <div className="grid grid-cols-3">
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="flex w-40 h-40 justify-center items-center border-2 border-black text-2xl">
              nk
            </div>
            <p className="mt-10 text-xl">Nikolaos Komninos</p>
          </div>

          <div className="flex flex-col justify-center items-center mt-5">
            <div className="flex w-40 h-40 justify-center items-center border-2 border-black text-2xl">
              tp
            </div>
            <p className="mt-10 text-xl">Tahir Peele</p>
          </div>

          <div className="flex flex-col justify-center items-center mt-5">
            <div className="flex w-40 h-40 justify-center items-center border-2 border-black text-2xl">
              mvw
            </div>
            <p className="mt-10 text-xl">Michael Weiss</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}*/
