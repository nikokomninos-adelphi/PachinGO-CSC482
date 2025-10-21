import { FaClock } from "react-icons/fa6";
import { FaHeart, FaPlayCircle } from "react-icons/fa";

/**
 * PremadeSearchButtons
 *
 * A component for any buttons that submit
 * a premade search term
 */
const PremadeSearchButtons = ({
  handleRecentLevels,
  handleMostPlayedLevels,
  handleMostLikedLevels,
}: {
  handleRecentLevels: Function;
  handleMostPlayedLevels: Function;
  handleMostLikedLevels: Function;
}) => {
  return (
    <div>
      <button
        onClick={() => handleRecentLevels()}
        className="flex flex-row justify-between items-center w-full p-2 mb-2 border-1 border-[#E1E1EE] rounded-lg hover:bg-[#FAFAFA] ease-linear duration-75 cursor-pointer hover:text-indigo-500"
      >
        Recently Uploaded
        <FaClock size={14} />
      </button>

      <button
        onClick={() => handleMostPlayedLevels()}
        className="flex flex-row justify-between items-center w-full p-2 mb-2 border-1 border-[#E1E1EE] rounded-lg hover:bg-[#FAFAFA] ease-linear duration-75 cursor-pointer hover:text-green-500"
      >
        Most Played
        <FaPlayCircle />
      </button>

      <button
        onClick={() => handleMostLikedLevels()}
        className="flex flex-row justify-between items-center w-full p-2 mb-2 border-1 border-[#E1E1EE] rounded-lg hover:bg-[#FAFAFA] ease-linear duration-75 cursor-pointer hover:text-red-500"
      >
        Most Liked
        <FaHeart />
      </button>
    </div>
  );
};

export default PremadeSearchButtons;
