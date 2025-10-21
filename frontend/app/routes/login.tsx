/**
 * login.tsx - the login page route
 */

import type { Route } from "../+types/root";
import LoginBox from "~/components/auth/LoginBox";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - PachinGO!" },
    { name: "description", content: "Log into PachinGO!" },
  ];
}

const login = () => {
  return (
    <div className="bg-[url('/pattern2.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite] min-h-screen flex justify-center items-center text-[#352F36]">
      <LoginBox />
    </div>
  );
};

export default login;
