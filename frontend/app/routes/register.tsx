/**
 * register.tsx - the registration page route
 */

import type { Route } from "../+types/root";
import RegisterBox from "~/components/RegisterBox";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register - PachinGO!" },
    { name: "description", content: "Register for PachinGO!" },
  ];
}

const register = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <RegisterBox />
    </div>
  );
};

export default register;
