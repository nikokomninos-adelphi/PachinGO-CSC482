import type { Route } from "./+types/home";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import LevelCard from "~/components/LevelCard";

import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({ params }: any) {
  return [
    { title: `${params.username}'s Profile - PachinGO!` },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const user = () => {
  let { username } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [results, setResults] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const exists = await checkUserExits();
      if (exists) {
        setIsLoading(false);
        getUserLevels();
      } else navigate("/error", { replace: true });
    })();
  }, []);

  const checkUserExits = async () => {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL +
        `/api/v1/users/getUser?username=${username}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/plain",
          "Access-Control-Allow-Credentials": "true",
        },
      },
    );
    const data = await res.json();
    if (data.result === "Not Found") return false;
    else return true;
  };

  const getUserLevels = async () => {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL + `/api/v1/users/getUserLevels`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/plain",
          "Access-Control-Allow-Credentials": "true",
        },
      },
    );
    const data = await res.json();
    setResults(data.results);
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[url('/pattern2.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite]">
        <div className="bg-[#FFF] flex-1 p-15 ml-[6vw] mr-[6vw] border-l-1 border-l-[#E1E1EE] border-r-1 border-r-[#E1E1EE] tracking-tighter min-h-screen">
          <div className="flex flex-row justify-start items-start ml-[3vw] mr-[3vw] gap-10">
            <div className="flex flex-col justify-start items-start gap-5 border-1 border-[#E1E1EE] p-5 rounded-lg h-fit">
              <div className="flex justify-center items-center w-50 h-50 rounded-lg border-1 border-[#e1e1e1]">
                <p className="text-2xl">PFP</p>
              </div>

              <h1 className="text-4xl">{username}</h1>

              <div>
                <h2 className="text-sm">Member Since:</h2>
                <p className="text-xs text-neutral-500">####</p>
              </div>

              <div>
                <h2 className="text-sm">Levels Played:</h2>
                <p className="text-xs text-neutral-500">####</p>
              </div>

              <div>
                <h2 className="text-sm">Levels Uploaded:</h2>
                <p className="text-xs text-neutral-500">####</p>
              </div>
            </div>
            <div className="flex w-full min-h-fit">
              <div className="flex flex-wrap justify-center gap-5">
                {results.map((r: any, i: any) => (
                  <LevelCard
                    key={i}
                    id={r.levelID}
                    name={r.name}
                    author={r.author}
                    desc={r.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default user;
