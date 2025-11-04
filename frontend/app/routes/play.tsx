import type { Route } from "./+types/home";
import Navbar from "~/components/nav/Navbar";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Play - PachinGO!` },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const play = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { id } = useParams();

  useEffect(() => {
    localStorage.setItem("levelID", id!);
    localStorage.setItem("layout", "Level Editor Online");
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

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
          <div className="flex min-h-screen justify-center items-center">
            <iframe
              ref={iframeRef}
              src="/game/index.html"
              width={1200}
              height={900}
              className="drop-shadow-2xl"
              tabIndex={0}
              allow="keyboard"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default play;
