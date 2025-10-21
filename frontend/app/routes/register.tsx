/**
 * register.tsx - the registration page route
 */

import type { Route } from "../+types/root";
import RegisterBox from "~/components/auth/RegisterBox";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register - PachinGO!" },
    { name: "description", content: "Register for PachinGO!" },
  ];
}

const register = () => {
  return (
    <div className="bg-[url('/pattern2.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite] min-h-screen flex justify-center items-center text-[#352F36]">
      <RegisterBox />
    </div>
  );
};

export default register;
