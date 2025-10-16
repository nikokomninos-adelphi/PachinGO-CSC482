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

const LevelCard = ({
  name,
  author,
  desc,
}: {
  name: string;
  author: string;
  desc: string;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      onClick={() => setShowModal(true)}
      className="flex flex-row w-100 h-50 border-1 border-[#e1e1e1] rounded-lg tracking-tight mb-5 bg-[#fff] cursor-pointer"
    >
      <div className="flex justify-center items-center min-w-50 min-h-50 rounded-lg border-r-1 border-[#e1e1e1]">
        <h1>Level Thumbnail</h1>
      </div>
      <div className="w-75 h-50 p-5">
        <h1 className="text-xl font-semibold mb-1">{name}</h1>
        <h2 className="text-xs mb-3">by {author}</h2>
        <p className="text-sm line-clamp-2">{desc}</p>
      </div>

      {showModal && (
        <LevelModal
          setShowModal={setShowModal}
          name={name}
          author={author}
          desc={desc}
        />
      )}
    </div>
  );
};

export default LevelCard;
