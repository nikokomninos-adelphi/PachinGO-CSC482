/**
 * Footer.tsx - a component for a reusable footer
 */

import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="h-10 bg-[#FAFAFA] border-t-1 border-t-[#E1E1EE] p-5 flex flex-row justify-center items-center gap-5">
      <Link to="/">
        <img
          src="/logo_small.png"
          alt="PachinGO! Logo, Small Version"
          className="w-6"
        />
      </Link>

      <Link
        to="/demo"
        className="font-semibold text-xs hover:text-neutral-400 ease-linear duration-75"
      >
        Demo Levels
      </Link>

      <Link
        to="/search"
        className="font-semibold text-xs hover:text-neutral-400 ease-linear duration-75"
      >
        User Levels
      </Link>

      <Link
        to="/editor"
        className="font-semibold text-xs hover:text-neutral-400 ease-linear duration-75"
      >
        Level Editor
      </Link>
    </div>
  );
};

export default Footer;
