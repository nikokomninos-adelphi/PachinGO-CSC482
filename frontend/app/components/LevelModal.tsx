/**
 * LevelModal
 *
 * A modal that appears when a LevelCard is clicked
 */

import { useEffect } from "react";
import { Link } from "react-router";

const LevelModal = ({
  setShowModal,
  id,
  name,
  author,
  desc,
}: {
  setShowModal: Function;
  id: string;
  name: string;
  author: string;
  desc: string;
}) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleKeyDown = (e: any) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      setShowModal(false);
    }
  };

  /*
   * ChatGPT was used to figure out how to get the modal to close, since it would not close
   * despite passing the setShowModal function to the modal to use.
   *
   * Prompt: "I can't figure out why this modal will not close, despite passing a
   * stateful function to it. Can you help me figure this out? *pasted source code*"
   *
   * From the response, we learned about the "stopPropagation" function of all React events.
   * The stopPropagation function explicitly tells the child component to ignore the events
   * of the parent component, and to treat its own events separate from the parent's. This
   * allowed the modal to close, since it was ignoring how the parent component was handling
   * the function call.
   */

  return (
    //Use stopPropagation to separate modal's events from parent element's events
    <div
      onClick={(e) => {
        e.stopPropagation();
        setShowModal(false);
      }}
      className="bg-black/75 w-full h-full fixed top-0 left-0 z-40 cursor-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed grid grid-cols-3 top-1/8 left-1/8 w-[75vw] h-[75vh] bg-[#fff] rounded-lg drop-shadow-2xl"
      >
        <div className="col-span-2 p-10">
          <div className="w-full h-full border-1 border-black flex justify-center items-center rounded-lg">
            Level Thumbnail
          </div>
        </div>
        <div className="col-span-1 p-10 flex flex-col">
          <div className="flex justify-end items-center">
            <button
              onClick={() => setShowModal(false)}
              className="text-sm hover:text-neutral-400 cursor-pointer ease-linear duration-75"
            >
              Back
            </button>
          </div>
          <h1 className="text-4xl mb-3">{name}</h1>
          <h2 className="text-sm mb-3">
            by{" "}
            <Link
              to={`/users/${author}`}
              className="underline text-neutral-500"
            >
              {author}
            </Link>
          </h2>
          <p className="text-md">{desc}</p>
          <div className="flex justify-end items-end h-full">
            <h3 className="text-xs">Level ID: {id}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelModal;
