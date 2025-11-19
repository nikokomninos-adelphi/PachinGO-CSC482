import { Link } from "react-router";
import { useState, useEffect } from "react";

const UserCard = ({ username, role }: { username: string; role: string }) => {
  const [roleStyle, setRoleStyle] = useState("");

  useEffect(() => {
    switch (role) {
      case "Moderator":
        setRoleStyle("text-green-500");
        break;
      case "PachinGOD":
        setRoleStyle("text-red-500");
        break;
    }
  }, []);

  return (
    <Link
      to={`/users/${username}`}
      className="flex flex-row items-center w-fit h-15 p-2 border-1 border-[#e1e1e1] rounded-lg tracking-tight bg-[#fff] cursor-pointer hover:bg-[#fafafa] ease-linear duration-75"
    >
      <div className="flex justify-center items-center w-10 h-10 rounded-lg border-1 border-[#e1e1e1] mr-3">
        <img src="/logo_small.png" />
      </div>

      <div className="flex justify-center items-center w-fit">
        <h1 className={roleStyle}>{username}</h1>
      </div>
    </Link>
  );
};

export default UserCard;
