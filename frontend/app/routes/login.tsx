import { useState } from "react";
import type { Route } from "../+types/root";
import { Link } from "react-router";

import NavbarAlternate from "~/components/NavbarAlternate";
import { SignIn } from "@clerk/react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - PachinGO!" },
    { name: "description", content: "Log into PachinGO!" },
  ];
}

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async () => {
    const res = fetch("http://localhost:3000/api/users/login", {
      method: "POST",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarAlternate />
      <div className="mt-30 flex flex-col justify-center items-center text-[#352F36]">
        <img src="/logo.png" alt="PachinGO! Logo, Large" className="w-75" />
        <div className="mt-20 w-100 flex flex-col justify-center items-center bg-white drop-shadow-lg rounded-xl p-20">
          <h1 className="font-semibold text-2xl mb-10">Login</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-center w-75 p-2 mb-5 border-1 border-[#e1e1e8] rounded-lg drop-shadow-md"
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-center w-75 p-2 mb-10 border-1 border-[#e1e1e8] rounded-lg drop-shadow-md"
          />
          <button
            type="submit"
            onClick={() => console.log(username + " " + password)}
            className="text-md rounded-lg mb-10 pl-8 pr-8 pt-2 pb-2 border-1 border-[#e1e1e8] drop-shadow-md hover:bg-neutral-100 ease-linear duration-75"
          >
            Login
          </button>
          Don't have an account?
          <Link to="/register" className="underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default login;
