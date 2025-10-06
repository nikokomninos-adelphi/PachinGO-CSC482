import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="tracking-tight">
      <nav className="h-12 flex-row justify-between items-center bg-[#11131D] text-[#ebebeb] hidden sm:flex">
        <div className="bg-[#3d4264] rounded-4xl p-0.5 ml-5">
          <Link to="/">
            <img
              src="/logo_small.png"
              alt="PachinGO! Logo, Small Version"
              className="w-8"
            />
          </Link>
        </div>
        <div className="mr-5">
          <Link
            to="/login"
            className="font-light text-xs ml-3 mr-3 hover:text-neutral-400 ease-linear duration-75"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="font-light text-xs ml-3 mr-3 hover:text-neutral-400 ease-linear duration-75"
          >
            Register
          </Link>
        </div>
      </nav>
      <nav className=" h-75 sm:h-10 flex sm:flex-row flex-col justify-center items-center gap-5 bg-[#191B2A] text-[#f2f2f2]">
        <Link to="/">
          <img
            src="/logo_small.png"
            alt="PachinGO! Logo, Small Version"
            className="w-12 sm:hidden"
          />
        </Link>
        {/*<Link to="" className="font-light ml-3 mr-3 flex sm:hidden">
          Login
        </Link>
        <a href="" className="font-light ml-3 mr-3 flex sm:hidden">
          Register
        </a>*/}
        <Link
          to="/demo"
          className="flex group items-center gap-2 ml-2 hover:text-blue-300 ease-linear duration-75"
        >
          <img
            src="/peg_blue.png"
            alt="Home"
            className="w-3.5 group-hover:hidden ease-linear duration-75"
          />
          <img
            src="/peg_blue.png"
            alt="Home"
            className="w-3.5 hidden group-hover:flex brightness-150 ease-linear duration-75"
          />
          <h1 className="text-sm">Demo Levels</h1>
        </Link>

        <a
          href=""
          className="flex group items-center gap-2 ml-2 hover:text-orange-300 ease-linear duration-75"
        >
          <img
            src="/peg_orange.png"
            alt="Home"
            className="w-3.5 group-hover:hidden ease-linear duration-75"
          />
          <img
            src="/peg_orange.png"
            alt="Home"
            className="w-3.5 hidden group-hover:flex brightness-150 ease-linear duration-75"
          />
          <h1 className="text-sm">Search User Levels</h1>
        </a>

        <a
          href=""
          className="flex group items-center gap-2 ml-2 hover:text-purple-300 ease-linear duration-75"
        >
          <img
            src="/peg_purple.png"
            alt="Home"
            className="w-3.5 group-hover:hidden ease-linear duration-75"
          />
          <img
            src="/peg_purple.png"
            alt="Home"
            className="w-3.5 hidden group-hover:flex brightness-150 ease-linear duration-75"
          />
          <h1 className="text-sm">Level Editor</h1>
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
