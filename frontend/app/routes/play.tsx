import type { Route } from "./+types/home";
import Navbar from "~/components/nav/Navbar";
import { useParams } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Play - PachinGO!` },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const play = () => {
  const { id } = useParams();

  useEffect(() => {
    localStorage.setItem("levelID", id!);
    localStorage.setItem("layout", "Level Editor Online");
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[url('/pattern2.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite]">
        <div className="flex-1 tracking-tighter min-h-screen">
          <div className="flex min-h-screen justify-center items-center">
            <iframe src="/game/index.html" width={1200} height={900} className="drop-shadow-2xl"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default play;
