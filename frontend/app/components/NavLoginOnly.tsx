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
import { FaCaretDown } from "react-icons/fa";
import { IoIosExit, IoMdContact, IoMdSettings } from "react-icons/io";

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
  }, [user]);

  if (isLoading) return null;

  return (
    <div className="w-full flex justify-end mr-[3vw] tracking-tight">
      {user ? (
        <div className="flex flex-row">
          <UserMenu user={user} handleLogout={handleLogout} />
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

const UserMenu = ({
  user,
  handleLogout,
}: {
  user: any;
  handleLogout: Function;
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="flex flex-row items-center gap-1 font-semibold text-xs cursor-pointer"
      >
        Hello, {user?.username}!
        <FaCaretDown />
      </button>
      {showMenu && (
        <div className="absolute -translate-x-1/2 mt-2 border-1 border-[#e1e1e1] w-50 rounded-sm drop-shadow-lg p-2 z-10 bg-[#fff]">
          <Link to={`/users/${user.username}`}>
            <div className="flex flex-row justify-between items-center mb-2 hover:text-neutral-400 ease-linear duration-75 cursor-pointer">
              <p className="text-xs">My Profile</p>
              <IoMdContact />
            </div>
          </Link>

          <Link to={`/account`}>
            <div className="flex flex-row justify-between items-center mb-2 hover:text-neutral-400 ease-linear duration-75 cursor-pointer">
              <p className="text-xs">My Account Settings</p>
              <IoMdSettings />
            </div>
          </Link>

          <div
            onClick={() => handleLogout()}
            className="flex flex-row justify-between items-center hover:text-neutral-400 ease-linear duration-75 cursor-pointer"
          >
            <p className="text-xs">Logout</p>
            <IoIosExit />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavLoginOnly;
