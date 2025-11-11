import type { Route } from "./+types/home";
import Navbar from "~/components/nav/Navbar";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Play - PachinGO!` },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const play = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const exists = await checkLevelExists();
      if (exists) setIsLoading(false);
      else navigate("/error", { replace: true });
    })();
    localStorage.setItem("levelID", id!);
    localStorage.setItem("layout", "Level Editor Online");
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  const checkLevelExists = async () => {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL +
        `/api/v1/level/loadLevel?levelID=${id}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/plain",
          "Access-Control-Allow-Credentials": "true",
        },
      },
    );

    if (res.ok) return true;
    else return false;
  };

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
