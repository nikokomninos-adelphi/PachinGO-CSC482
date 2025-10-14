/**
 * LoginBox.tsx - a component for the login box,
 * contains frontend logic for user login
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router";

const LoginBox = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  // Handles submitting a login attempt
  // Redirects the user to the home page if successful
  const submitLogin = async () => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/auth/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": "true" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.message === "Login successful") navigate("/");
    else setStatus(data.message);
  }

  return (
    <div className="mt-15 flex flex-col justify-center items-center text-[#352F36]">
      <img src="/logo.png" alt="PachinGO! Logo, Large" className="w-75" />
      <div className="mt-15 w-100 flex flex-col justify-center items-center bg-white drop-shadow-lg rounded-xl p-20">
        <h1 className="font-semibold text-2xl mb-10">Login</h1>
        <input
          type="text"
          name="username"
          placeholder="Username or Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="text-center w-75 p-2 mb-5 border-1 border-[#e1e1e8] rounded-lg drop-shadow-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-center w-75 p-2 mb-10 border-1 border-[#e1e1e8] rounded-lg drop-shadow-md"
        />
        <button
          type="submit"
          onClick={() => submitLogin()}
          className="text-md rounded-lg mb-10 pl-8 pr-8 pt-2 pb-2 border-1 border-[#e1e1e8] drop-shadow-md hover:bg-neutral-100 ease-linear duration-75"
        >
          Login
        </button>
        <h1 className={status ? "mb-10 text-red-400" : "hidden"}>
          {status}
        </h1>
        Don't have an account?
        <Link to="/register" className="underline">
          Register here
        </Link>
      </div>
    </div>

  )
}

export default LoginBox;
