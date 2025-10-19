/**
 * NavLoginOnly
 *
 * A component that provides a sub-navbar,
 * containing links only for login.
 * Goes on top of the Navbar.
 */

import { Link } from "react-router";
import { useState, useEffect } from "react";

import { checkAuth } from "~/auth/auth";

const NavLoginOnly = () => {
  const [user, setUser] = useState<any>(null);

  // Handles logging the user out when the logout button is clicked
  const logout = async () => {
    await fetch(import.meta.env.VITE_BACKEND_URL + "/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  // Checks if a user is logged in on initial
  // navbar render
  useEffect(() => {
    (async () => {
      const loggedIn = await checkAuth();
      setUser(loggedIn);
    })();
  }, []);

  return (
    <div className="w-full flex justify-end mr-[3vw] tracking-tight">
      {user ? (
        <div className="flex flex-row">
          <Link to={`/users/${user.username}`} className="underline font-semibold text-xs ml-2 mr-2">
            Hello, {user.username}!
          </Link>
          <button
            onClick={logout}
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
