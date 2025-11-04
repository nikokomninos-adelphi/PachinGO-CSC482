import type { Route } from "./+types/home";
import Navbar from "~/components/nav/Navbar";
import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "~/stores/useAuthStore";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Editor - PachinGO!` },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const editor = () => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!user) navigate("/login");
    setIsLoading(false);
    localStorage.setItem("layout", "Level Editor");
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
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

export default editor;
