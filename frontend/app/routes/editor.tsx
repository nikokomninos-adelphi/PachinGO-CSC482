import type { Route } from "./+types/home";
import Navbar from "~/components/nav/Navbar";
import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "~/stores/useAuthStore";
import { useNavigate } from "react-router";

import { FaDisplay } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Editor - PachinGO!` },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const editor = () => {
  const { user, checking } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [gameSize, setGameSize] = useState([800, 600]);

  useEffect(() => {
    if (checking) return;
    if (!user) navigate("/login", { replace: true });
    if (iframeRef.current) {
      // Prevents caching by adding a cache busting query parameter
      iframeRef.current.src = `/game/index.html?cacheBust=${Date.now()}`;
    }
    setIsLoading(false);
    localStorage.setItem("layout", "Level Editor");
  }, [user, checking]);

  // Redirect to play page when upload is complete
  useEffect(() => {
    const checkUploadStatus = () => {
      const value = localStorage.getItem("uploaded");
      if (value === "true") {
        localStorage.setItem("uploaded", "false");
        navigate(`/play/${localStorage.getItem("levelID")}`);
      }
    };

    const interval = setInterval(checkUploadStatus, 500);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "uploaded" && event.newValue === "true") {
        checkUploadStatus();
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [navigate]);

  useEffect(() => {
    const game = document.getElementById("game");
    game?.scrollIntoView({block: "start", behavior: "smooth"})
    //window.scrollTo(0, document.body.scrollHeight);
  }, [isLoading]);

  // Ensure that arrow keys do not follow
  // normal browser behavior when game
  // is focused
  useEffect(() => {
    const iframe = iframeRef.current;
    iframe?.contentWindow?.addEventListener("keydown", (e) => {
      const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      if (keys.includes(e.key)) e.preventDefault();
    });

    iframe?.addEventListener("click", () => iframe.contentWindow?.focus());
    iframe?.addEventListener("mouseover", () => iframe.contentWindow?.focus());
  });

  if (isLoading) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[url('/pattern2.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite]">
        <div className="flex-1 tracking-tighter min-h-screen">
          <div className="flex flex-col min-h-screen justify-center items-center">
            <iframe
              id="game"
              ref={iframeRef}
              src="/game/index.html"
              width={gameSize[0]}
              height={gameSize[1]}
              className="drop-shadow-2xl"
              tabIndex={0}
              allow="keyboard"
            />
          </div>
          <div className="flex flex-row justify-end p-5 gap-2">
            <GuidelinesButton />
            <ResizeButton gameSize={gameSize} setGameSize={setGameSize} />
          </div>
        </div>
      </div>
    </div>
  );
};

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
    game?.scrollIntoView({block: "center", behavior: "smooth"})
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

const GuidelinesButton = () => {
  const [showGuidelines, setShowGuidelines] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowGuidelines((prev) => !prev)}
        className="w-10 h-10 flex justify-center items-center bg-[#fff] hover:bg-[#fafafa] hover:text-neutral-400 border-1 border-[#e1e1e1] rounded-lg cursor-pointer ease-linear duration-75"
      >
        <FaQuestion />
      </button>
    </div>
  );
};

export default editor;
