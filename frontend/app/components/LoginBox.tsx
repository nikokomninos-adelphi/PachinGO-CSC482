/**
 * LoginBox.tsx - a component for the login box,
 * contains frontend logic for user login
 */

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { IoMdContact } from "react-icons/io";
import { MdPassword } from "react-icons/md";
import { useAuthStore } from "~/stores/useAuthStore";

const LoginBox = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user, checkAuth } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
    setIsLoading(false);
  }, [user]);

  // Handles submitting a login attempt
  // Redirects the user to the home page if successful
  const submitLogin = async () => {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/v1/auth/login",
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({ username, password }),
      },
    );
    const data = await res.json();
    if (data.message === "Login successful") {
      await checkAuth();
      navigate("/");
    } else setStatus(data.message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitLogin();
    }
  };

  if (isLoading) return null;

  return (
    <div className="bg-[url('/pattern2.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite] min-h-screen flex justify-center items-center text-[#352F36]">
      <div className="w-[90vw] h-[90vh] bg-[#FFF] rounded-2xl border-1 border-[#C1C1CC] grid grid-cols-3">
        <div className="col-span-1 flex flex-col p-10">
          <Link to="/" className="mb-20">
            <img
              src="/logo_outline.png"
              alt="PachinGO! Logo, Large"
              className="h-20 hover:drop-shadow-lg ease-linear duration-150"
            />
          </Link>
          <div className="flex flex-col">
            <div className="flex flex-row gap-1 items-center mb-2">
              <IoMdContact />
              <h2 className="text-sm">Email or Username</h2>
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
              onClick={() => submitLogin()}
              className="text-md rounded-md w-75 mb-10 pt-2 pb-2 border-1 border-[#e1e1ee] hover:bg-neutral-100 ease-linear duration-75"
            >
              Login
            </button>
            <h1 className={status ? "mb-10 text-red-400" : "hidden"}>
              {status}
            </h1>
            Don't have an account?
            <Link
              to="/register"
              className="underline hover:text-neutral-400 ease-linear duration-75"
            >
              Register Here
            </Link>
          </div>
        </div>
        <div className="col-span-2">
          <div className="w-full h-full flex flex-col justify-center items-center border-l-1 border-l-[#C1C1CC] rounded-2xl">
            <h1>Future Gameplay GIF</h1>
            <h1>
              Will be a level with pegs that spell out <i>Login</i>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
