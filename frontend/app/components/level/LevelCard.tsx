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
  id,
  name,
  author,
  desc,
}: {
  id: string
  name: string;
  author: string;
  desc: string;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      onClick={() => setShowModal(true)}
      className="flex flex-row w-100 h-45 border-1 border-[#e1e1e1] rounded-lg tracking-tight bg-[#fff] cursor-pointer hover:bg-[#fafafa] ease-linear duration-75"
    >
      <div className="flex justify-center items-center ml-3 min-w-40 min-h-40">
        <img src="/thumbnail.jpg" className="w-40 h-40 rounded-sm border-1 border-[#c1c1c1]" />
      </div>
      <div className="w-60 h-50 p-5">
        <h1 className="text-lg font-semibold mb-1">{name}</h1>
        <h2 className="text-xs mb-3">by {author}</h2>
        <p className="text-xs line-clamp-2">{desc}</p>
      </div>

      {showModal && (
        <LevelModal
          setShowModal={setShowModal}
          id={id}
          name={name}
          author={author}
          desc={desc}
        />
      )}
    </div>
  );
};

export default LevelCard;
