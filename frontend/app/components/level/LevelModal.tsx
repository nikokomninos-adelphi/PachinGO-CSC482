/**
 * LevelModal
 *
 * A modal that appears when a LevelCard is clicked
 */

import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import { useAuthStore } from "~/stores/useAuthStore";

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
  const { user } = useAuthStore();

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleDeletion = async () => {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL + `/api/v1/level/deleteLevel`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          levelID: id,
        }),
      },
    );
    const data = await res.json();
    window.location.reload();
  };

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
        <div className="col-span-2 w-7/8 h-7/8 m-auto flex justify-center items-center">
          <img
            src="/thumbnail.jpg"
            className="border-1 border-[#c1c1c1] rounded-lg"
          />
        </div>

        <div className="col-span-1 pr-10 py-10 flex flex-col">
          <div className="flex justify-end items-center">
            <button
              onClick={() => setShowModal(false)}
              className="text-sm hover:text-neutral-400 cursor-pointer ease-linear duration-75"
            >
              Back
            </button>
          </div>
          <h1 className="text-4xl font-semibold mb-3">{name}</h1>
          <h2 className="text-sm mb-3">
            by{" "}
            <Link
              to={`/users/${author}`}
              className="underline text-neutral-500"
              onClick={() => setShowModal(false)}
            >
              {author}
            </Link>
          </h2>
          <p className="text-md">{desc}</p>
          <div className="flex flex-col gap-3 justify-end items-end h-full">
            <DeleteButton
              user={user}
              author={author}
              handleDeletion={handleDeletion}
            />
            <h3 className="text-xs">Level ID: {id}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

// A mini modal that's displayed when hitting the delete button,
// as to avoid using the alert() function
const DeleteButton = ({
  user,
  author,
  handleDeletion,
}: {
  user: any;
  author: string;
  handleDeletion: Function;
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowConfirm((prev) => !prev)} // toggle popup
        className={
          user?.username === author
            ? "w-8 h-8 flex justify-center items-center hover:bg-[#fafafa] hover:text-neutral-400 border-1 border-[#e1e1e1] rounded-lg cursor-pointer ease-linear duration-75"
            : "hidden"
        }
      >
        <FaTrash />
      </button>

      {showConfirm && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#fff] border-1 border-[#e1e1e1] rounded-lg drop-shadow-lg p-2 text-sm z-10">
          <p className="mb-2 text-center">Are you sure?</p>
          <div className="flex justify-between">
            <button
              onClick={() => {
                handleDeletion();
                setShowConfirm(false);
              }}
              className="p-1 mr-2 rounded-md border-1 border-[#e1e1e1] hover:bg-[#fafafa] ease-linear duration-75 cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="p-1 rounded-md border-1 border-[#e1e1e1] hover:bg-[#fafafa] ease-linear duration-75 cursor-pointer"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelModal;
