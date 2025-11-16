/**
 * LevelCard
 *
 * A card component that is displayed when rendering the
 * results of a level search.
 *
 * @param name the name of the level
 * @param author the author of the level
 * @param desc the description of the level
 */

import { useState } from "react";
import LevelModal from "./LevelModal";
import { FaPlayCircle, FaCalendarAlt } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";

const LevelCard = ({
  id,
  name,
  author,
  desc,
  thumbnail,
  plays,
  likes,
  dateUploaded,
  numPegs,
  numOrange,
  hasBackground,
  hasMusic,
}: {
  id: string;
  name: string;
  author: string;
  desc: string;
  thumbnail: string;
  plays: number;
  likes: number;
  dateUploaded: Date;
  numPegs: number;
  numOrange: number;
  hasBackground: string;
  hasMusic: string;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      onClick={() => setShowModal(true)}
      className="flex flex-row w-100 h-45 border-1 border-[#e1e1e1] rounded-lg tracking-tight bg-[#fff] cursor-pointer hover:bg-[#fafafa] ease-linear duration-75"
    >
      <div className="flex justify-center items-center ml-3 min-w-40 min-h-40">
        <img src={thumbnail} className="w-40 h-40 rounded-sm" />
      </div>

      <div className="flex flex-col w-60 h-35 p-5">
        <div className="min-h-30">
          <h1 className="text-lg font-semibold mb-1">{name}</h1>
          <h2 className="text-xs mb-3">by {author}</h2>
          <p className="text-xs line-clamp-2">{desc}</p>
        </div>

        <div className="flex flex-row gap-2 min-h-5">
          <div className="flex flex-row justify-start items-center gap-1 text-xs text-neutral-500">
            <FaPlayCircle />
            {plays || 0}
          </div>

          <div className="flex flex-row justify-start items-center gap-1 text-xs text-neutral-500">
            <FaThumbsUp />
            {likes || 0}
          </div>

          <div className="flex flex-row justify-start items-center gap-1 text-xs text-neutral-500">
            <FaCalendarAlt />
            {dateUploaded.toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      {showModal && (
        <LevelModal
          setShowModal={setShowModal}
          id={id}
          name={name}
          author={author}
          desc={desc}
          thumbnail={thumbnail}
          plays={plays}
          likes={likes}
          dateUploaded={dateUploaded}
          numPegs={numPegs}
          numOrange={numOrange}
          hasBackground={hasBackground}
          hasMusic={hasMusic}
        />
      )}
    </div>
  );
};

export default LevelCard;
