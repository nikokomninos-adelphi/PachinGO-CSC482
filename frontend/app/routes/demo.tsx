import type { Route } from "./+types/home";
import Navbar from "~/components/nav/Navbar";
import Footer from "~/components/nav/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Demo Levels - PachinGO!" },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const demo = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[url('/pattern2.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite]">
        <div className="bg-[#FFF] flex-1 p-15 ml-[6vw] mr-[6vw] border-l-1 border-l-[#E1E1EE] border-r-1 border-r-[#E1E1EE] tracking-tighter min-h-screen">
          <div className="flex justify-center items-center">
            <h1 className="text-3xl font-bold">Coming Soon!</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default demo;
