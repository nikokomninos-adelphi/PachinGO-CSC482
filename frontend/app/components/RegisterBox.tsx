import { useState } from "react";
import { useNavigate } from "react-router";

const RegisterBox = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const submitRegister = async () => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/auth/register", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": "true" },
      body: JSON.stringify({ email, username, password }),
    });
    const data = await res.json();
    if (data.message === "User registered successfully") navigate("/login");
    else setStatus(data.message);
  }

  return (
    <div className="mt-30 flex flex-col justify-center items-center text-[#352F36]">
      <img src="/logo.png" alt="PachinGO! Logo, Large" className="w-75" />
      <div className="mt-20 w-100 flex flex-col justify-center items-center bg-white drop-shadow-lg rounded-xl p-20">
        <h1 className="font-semibold text-2xl mb-10">Register</h1>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-center w-75 p-2 mb-5 border-1 border-[#e1e1e8] rounded-lg drop-shadow-md"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
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
        <h1 className={status ? "mb-10 text-red-400" : "hidden"}>
          {status}
        </h1>
        <button
          type="submit"
          onClick={() => submitRegister()}
          className="text-md rounded-lg mb-10 pl-8 pr-8 pt-2 pb-2 border-1 border-[#e1e1e8] drop-shadow-md hover:bg-neutral-100 ease-linear duration-75">
          Register
        </button>
      </div>
    </div>
  )
}

export default RegisterBox;
