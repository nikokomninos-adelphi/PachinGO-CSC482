/**
 * NavLoginOnly
 *
 * A component that provides a sub-navbar,
 * containing links only for login.
 * Goes on top of the Navbar.
 */

import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useAuthStore } from "~/stores/useAuthStore";

const NavLoginOnly = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout, checkAuth } = useAuthStore();

  const navigate = useNavigate();

  // Handles logging the user out when the logout button is clicked
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Handles client side flicker. Will not render
  // login controls until login state is checked.
  useEffect(() => {
    setIsLoading(false);
  }, [user])

  if (isLoading) return null;

  return (
    <div className="w-full flex justify-end mr-[3vw] tracking-tight">
      {user ? (
        <div className="flex flex-row">
          <Link to={`/users/${(user as any).username}`} className="underline font-semibold text-xs ml-2 mr-2">
            Hello, {(user as any).username}!
          </Link>
          <button
            onClick={() => handleLogout()}
            className="font-light text-xs ml-2 mr-2 hover:text-neutral-400 ease-linear duration-75"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link
            to="/login"
            className="font-light text-xs hover:text-neutral-400 ease-linear duration-75 mr-3"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="font-light text-xs hover:text-neutral-400 ease-linear duration-75"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavLoginOnly;
