import { useState } from "react";
import { FaDisplay } from "react-icons/fa6";

const ResizeButton = ({
  gameSize,
  setGameSize,
}: {
  gameSize: Number[];
  setGameSize: Function;
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleGameResize = (width: Number, height: Number) => {
    setGameSize([width, height]);
    const game = document.getElementById("game");
    game?.scrollIntoView({ block: "center", behavior: "smooth" });
    localStorage.setItem("gameSize", JSON.stringify({ width, height }));
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className={
          showMenu
            ? "w-10 h-10 flex justify-center items-center bg-[#fafafa] border-1 border-[#e1e1e1] text-neutral-400 rounded-lg cursor-pointer ease-linear duration-75"
            : "w-10 h-10 flex justify-center items-center bg-[#fff] hover:bg-[#fafafa] hover:text-neutral-400 border-1 border-[#e1e1e1] rounded-lg cursor-pointer ease-linear duration-75"
        }
      >
        <FaDisplay />
      </button>

      {showMenu && (
        <div className="absolute bottom-full -translate-x-1/2 mb-2 bg-[#fff] border-1 border-[#e1e1e1] rounded-lg drop-shadow-lg p-2 text-sm z-10">
          <div className="flex flex-col items-end gap-3">
            <button
              onClick={() => {
                handleGameResize(400, 300);
                setShowMenu(false);
              }}
              className={
                gameSize[0] === 400 && gameSize[1] === 300
                  ? "cursor-pointer text-neutral-400 hover:text-neutral-400 ease-linear duration-75"
                  : "cursor-pointer hover:text-neutral-400 ease-linear duration-75"
              }
            >
              400x300
            </button>
            <button
              onClick={() => {
                handleGameResize(800, 600);
                setShowMenu(false);
              }}
              className={
                gameSize[0] === 800 && gameSize[1] === 600
                  ? "cursor-pointer text-neutral-400 hover:text-neutral-400 ease-linear duration-75"
                  : "cursor-pointer hover:text-neutral-400 ease-linear duration-75"
              }
            >
              800x600
            </button>
            <button
              onClick={() => {
                handleGameResize(1200, 900);
                setShowMenu(false);
              }}
              className={
                gameSize[0] === 1200 && gameSize[1] === 900
                  ? "cursor-pointer text-neutral-400 hover:text-neutral-400 ease-linear duration-75"
                  : "cursor-pointer hover:text-neutral-400 ease-linear duration-75"
              }
            >
              1200x900
            </button>
            <button
              onClick={() => {
                handleGameResize(1600, 1200);
                setShowMenu(false);
              }}
              className={
                gameSize[0] === 1600 && gameSize[1] === 1200
                  ? "cursor-pointer text-neutral-400 hover:text-neutral-400 ease-linear duration-75"
                  : "cursor-pointer hover:text-neutral-400 ease-linear duration-75"
              }
            >
              1600x1200
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResizeButton;
