const UserBox = ({ username }: { username: string }) => {
  return (
    <div className="flex flex-col justify-start items-start gap-5 border-1 border-[#E1E1EE] p-5 rounded-lg h-fit">
      <div className="flex justify-center items-center w-50 h-50 rounded-lg border-1 border-[#e1e1e1]">
        <p className="text-2xl">PFP</p>
      </div>

      <h1 className="text-4xl">{username}</h1>

      <div>
        <h2 className="text-sm">Member Since:</h2>
        <p className="text-xs text-neutral-500">####</p>
      </div>

      <div>
        <h2 className="text-sm">Levels Played:</h2>
        <p className="text-xs text-neutral-500">####</p>
      </div>

      <div>
        <h2 className="text-sm">Levels Uploaded:</h2>
        <p className="text-xs text-neutral-500">####</p>
      </div>
    </div>
  );
};

export default UserBox;
