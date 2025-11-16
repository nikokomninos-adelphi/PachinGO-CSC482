import { Link } from "react-router";
const UserCard = ({ username }: { username: string }) => {
  return (
    <Link
      to={`/users/${username}`}
      className="flex flex-row items-center w-60 h-15 p-2 border-1 border-[#e1e1e1] rounded-lg tracking-tight bg-[#fff] cursor-pointer hover:bg-[#fafafa] ease-linear duration-75"
    >
      <div className="flex justify-center items-center w-10 h-10 rounded-lg border-1 border-[#e1e1e1] mr-3">
        <img src="/logo_small.png" />
      </div>

      <div className="flex justify-center items-center w-fit">
        <h1>{username}</h1>
      </div>
    </Link>
  );
};

export default UserCard;
