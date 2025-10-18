/**
 * RegisterBox.tsx - a component for the registration box,
 * contains frontend logic for user registration
 */

import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { IoMdContact } from "react-icons/io";
import { MdPassword } from "react-icons/md";
import { MdEmail } from "react-icons/md";

const RegisterBox = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  // Handles submitting a registration
  // attempt. Redirects to login page
  // if successful
  const submitRegister = async () => {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/v1/auth/register",
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({ email, username, password }),
      },
    );
    const data = await res.json();
    if (data.message === "User registered successfully") navigate("/login");
    else setStatus(data.message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitRegister();
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen flex justify-center items-center text-[#352F36]">
      <div className="w-[90vw] h-[90vh] bg-[#FFF] rounded-2xl border-1 border-[#C1C1CC] grid grid-cols-3">
        <div className="col-span-1 flex flex-col p-10">
          <Link to="/" className="mb-5">
            <img
              src="/logo_outline.png"
              alt="PachinGO! Logo, Large"
              className="h-20 hover:drop-shadow-lg ease-linear duration-150"
            />
          </Link>
          <h1 className="mb-10 text-sm font-normal">Ready to become a PachinGOD?</h1>
          <div className="flex flex-col">
            <div className="flex flex-row gap-1 items-center mb-2">
              <MdEmail />
              <h2 className="text-sm">Email</h2>
            </div>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              className="w-75 p-2 mb-5 border-1 border-[#E1E1EE] rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row gap-1 items-center mb-2">
              <IoMdContact />
              <h2 className="text-sm">Username</h2>
            </div>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              className="w-75 p-2 mb-5 border-1 border-[#E1E1EE] rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row gap-1 items-center mb-2">
              <MdPassword />
              <h2 className="text-sm">Password</h2>
            </div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              className="w-75 p-2 mb-10 border-1 border-[#E1E1EE] rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              onClick={() => submitRegister()}
              className="text-md rounded-md w-75 mb-10 pt-2 pb-2 border-1 border-[#e1e1ee] hover:bg-neutral-100 ease-linear duration-75"
            >
              Register
            </button>
            <h1 className={status ? "mb-10 text-red-400" : "hidden"}>
              {status}
            </h1>
          </div>
        </div>
        <div className="col-span-2">
          <div className="w-full h-full flex flex-col justify-center items-center border-l-1 border-l-[#C1C1CC] rounded-2xl">
            <h1>Future Gameplay GIF</h1>
            <h1>
              Will be a level with pegs that spell out <i>Register</i>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterBox;
