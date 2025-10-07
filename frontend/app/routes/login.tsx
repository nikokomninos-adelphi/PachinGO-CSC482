import type { Route } from "../+types/root";
import NavbarAlternate from "~/components/NavbarAlternate";
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
      <NavbarAlternate />
      <LoginBox />
    </div>
  );
};

export default login;
