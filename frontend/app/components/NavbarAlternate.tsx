/**
 * NavbarAlternate.tsx - a component for an alternate
 * navbar, used in certain pages that do not need the
 * full navbar
 */

import { Link } from "react-router";

const NavbarAlternate = () => {
  return (
    <div className="drop-shadow-2xl tracking-tight">
      <nav className="h-12 flex flex-row justify-center items-center bg-[#11131D]">
        <div className="bg-[#3d4264] rounded-4xl p-0.5 ml-5">
          <Link to="/">
            <img
              src="/logo_small.png"
              alt="PachinGO! Logo, Small Version"
              className="w-8"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavbarAlternate;
