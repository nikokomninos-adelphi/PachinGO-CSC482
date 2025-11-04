/**
 * UserBox
 *
 * A component that holds a user's public info
 * for their profile
 */
const UserBox = ({
  username,
  dateJoined,
  numLevels,
}: {
  username: any;
  dateJoined: Date;
  numLevels: number;
}) => {
  const formattedDate = new Date(dateJoined).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className="flex flex-col justify-start items-start gap-5 border-1 border-[#E1E1EE] p-5 rounded-lg h-fit">
      <div className="flex justify-center items-center w-50 h-50 rounded-lg border-1 border-[#e1e1e1]">
        <p className="text-2xl">PFP</p>
      </div>

      <h1 className="text-4xl">{username}</h1>

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
