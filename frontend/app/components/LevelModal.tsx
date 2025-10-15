import { useEffect } from "react";

const LevelModal = ({
  setShowModal,
  name,
  author,
  desc,
}: {
  setShowModal: Function;
  name: string;
  author: string;
  desc: string;
}) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleKeyDown = (e: any) => {
    if (e.key === "Escape") { e.stopPropagation(); setShowModal(false); }
  }

  return (
    //Use stopPropagation to separate modal's events from parent element's events
    <div
      onClick={(e) => {
        e.stopPropagation();
        setShowModal(false);
      }}
      className="bg-black/75 w-full h-full fixed top-0 left-0 z-40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed grid grid-cols-3 top-1/8 left-1/8 w-[75vw] h-[75vh] bg-[#fff] border-1 border-[#676767] rounded-sm drop-shadow-2xl"
      >
        <div className="col-span-2 p-10">
          <div className="w-full h-full border-1 border-black flex justify-center items-center">
            Level Thumbnail
          </div>
        </div>
        <div className="col-span-1 p-10 flex flex-col">
          <div className="flex justify-end items-center">
            <button onClick={() => setShowModal(false)}>
              <h1 className="text-sm">Close</h1>
            </button>
          </div>
          <h1 className="text-4xl mb-3">{name}</h1>
          <h2 className="text-sm mb-3">by {author}</h2>
          <p className="text-md">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default LevelModal;
