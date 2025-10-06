import type { Route } from "../+types/root";
import { Link } from "react-router";

import NavbarAlternate from "~/components/NavbarAlternate";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register - PachinGO!" },
    { name: "description", content: "Register for PachinGO!" },
  ];
}

const register = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarAlternate />
      <div className="mt-30 flex flex-col justify-center items-center text-[#352F36]">
        <img src="/logo.png" alt="PachinGO! Logo, Large" className="w-75" />
        <div className="mt-20 w-100 flex flex-col justify-center items-center bg-white drop-shadow-lg rounded-xl p-20">
          <h1 className="font-semibold text-2xl mb-10">Register</h1>
          <input
            id="email"
            type="text"
            placeholder="Email"
            className="text-center w-75 p-2 mb-5 border-1 border-[#e1e1e8] rounded-lg drop-shadow-md"
          />
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="text-center w-75 p-2 mb-5 border-1 border-[#e1e1e8] rounded-lg drop-shadow-md"
          />
          <input
            id="password"
            type="text"
            placeholder="Password"
            className="text-center w-75 p-2 mb-10 border-1 border-[#e1e1e8] rounded-lg drop-shadow-md"
          />
          <button className="text-md rounded-lg mb-10 pl-8 pr-8 pt-2 pb-2 border-1 border-[#e1e1e8] drop-shadow-md hover:bg-neutral-100 ease-linear duration-75">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default register;
