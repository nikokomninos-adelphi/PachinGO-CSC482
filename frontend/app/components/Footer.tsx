/**
 * Footer.tsx - a component for a reusable footer
 */

import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="h-100 sm:h-10 bg-[#11131D] p-5 flex flex-col sm:flex-row justify-center items-center gap-5 text-[#ebebeb]">
        <div className="bg-[#3d4264] rounded-4xl p-0.5 ml-5">
          <Link to="/">
            <img
              src="/logo_small.png"
              alt="PachinGO! Logo, Small Version"
              className="w-6"
            />
          </Link>
        </div>

      <Link
        to=""
        className="font-light text-xs hover:text-neutral-400 ease-linear duration-75"
      >
        Demo Levels
      </Link>

      <Link
        to=""
        className="font-light text-xs hover:text-neutral-400 ease-linear duration-75"
      >
        Search User Levels
      </Link>

      <Link
        to=""
        className="font-light text-xs hover:text-neutral-400 ease-linear duration-75"
      >
        Level Editor
      </Link>
    </div>
  );
};

export default Footer;
