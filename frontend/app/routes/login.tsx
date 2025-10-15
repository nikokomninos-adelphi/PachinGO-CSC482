/**
 * login.tsx - the login page route
 */

import type { Route } from "../+types/root";
import LoginBox from "~/components/LoginBox";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - PachinGO!" },
    { name: "description", content: "Log into PachinGO!" },
  ];
}

const login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LoginBox />
    </div>
  );
};

export default login;
