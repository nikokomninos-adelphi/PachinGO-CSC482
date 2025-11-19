/**
 * UserBox
 *
 * A component that holds a user's public info
 * for their profile
 */

import { useState, useEffect } from "react";

const UserBox = ({
  username,
  role,
  dateJoined,
  numLevels,
}: {
  username: any;
  role: string;
  dateJoined: Date;
  numLevels: number;
}) => {
  const formattedDate = new Date(dateJoined).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const [roleStyle, setRoleStyle] = useState("");

  useEffect(() => {
    switch (role) {
      case "Moderator":
        setRoleStyle("text-green-500");
        break;
      case "PachinGOD":
        setRoleStyle("text-red-500");
        break;
      default:
        setRoleStyle("text-neutral-500");
        break;
    }
  }, []);

  return (
    <div className="flex flex-col justify-start items-start gap-5 border-1 border-[#E1E1EE] p-5 rounded-lg h-fit w-60">
      <div className="flex justify-center items-center w-50 h-50 rounded-lg border-1 border-[#e1e1e1]">
        <img src="/logo_small.png" width={128} height={128} />
      </div>

      <h1 className="text-2xl break-words whitespace-normal w-full">{username}</h1>

      <div>
        <h2 className="text-sm">Role:</h2>
        <p className={`text-xs ${roleStyle}`}>{role}</p>
      </div>

      <div>
        <h2 className="text-sm">Member Since:</h2>
        <p className="text-xs text-neutral-500">{formattedDate}</p>
      </div>

      <div>
        <h2 className="text-sm">Levels Uploaded:</h2>
        <p className="text-xs text-neutral-500">{numLevels}</p>
      </div>
    </div>
  );
};

export default UserBox;
