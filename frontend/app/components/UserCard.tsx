const UserCard = ({ username }: { username: string }) => {
  return (
    <div className="flex flex-row w-60 h-15 p-2 border-1 border-[#e1e1e1] rounded-lg tracking-tight bg-[#fff] cursor-pointer hover:bg-[#fafafa] ease-linear duration-75">
      <div className="flex justify-center items-center w-10 h-10 rounded-lg border-1 border-[#e1e1e1] mr-3">
        <p className="text-xs">PFP</p>
      </div>

      <div className="flex justify-center items-center w-fit">
        <h1>{username}</h1>
      </div>
    </div>
  );
};

export default UserCard;
