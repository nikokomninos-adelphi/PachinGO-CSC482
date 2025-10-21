import type { Route } from "./+types/home";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "~/stores/useAuthStore";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Account Settings - PachinGO!" },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const account = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) setIsLoading(false);
    else navigate("/login");
  }, [user]);

  if (isLoading) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[url('/pattern2.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite]">
        <div className="bg-[#FFF] flex-1 p-15 ml-[6vw] mr-[6vw] border-l-1 border-l-[#E1E1EE] border-r-1 border-r-[#E1E1EE] tracking-tighter min-h-screen">
          <div className="flex flex-row justify-start items-start ml-[2vw] mr-[2vw] gap-10">
            <div className="flex flex-col justify-start items-start gap-5 border-1 border-[#E1E1EE] p-5 rounded-lg h-fit">
              <div className="flex justify-center items-center w-50 h-50 rounded-lg border-1 border-[#e1e1e1]">
                <p className="text-2xl">PFP</p>
              </div>

              <h1 className="text-4xl">{(user as any)?.username}</h1>

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

            <div className="flex flex-row border-1 border-[#E1E1EE] rounded-lg w-full min-h-[80vh]">
              <div className="flex flex-col w-1/8 border-r-1 border-r-[#e1e1e1]">

                <div className="hover:bg-[#fafafa] w-full text-center ease-linear duration-75 cursor-pointer border-b-1 border-b-[#e1e1e1]">
                  <h1 className="font-semibold mt-2 mb-2">Login Settings</h1>
                </div>

                <div className="hover:bg-[#fafafa] w-full text-center ease-linear duration-75 cursor-pointer border-b-1 border-b-[#e1e1e1]">
                  <h1 className="font-semibold mt-2 mb-2">Gameplay Preferences</h1>
                </div>

              </div>
              <div className="flex flex-col gap-5 p-5 text-2xl">
                <h1>Change Email</h1>
                <h1>Change Username</h1>
                <h1>Change Password</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default account;
