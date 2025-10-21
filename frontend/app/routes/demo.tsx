import type { Route } from "./+types/home";
import Navbar from "~/components/nav/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Demo Levels - PachinGO!" },
    { name: "description", content: "Peggle Reborn" },
  ];
}

const demo = () => {
  return (
    <div>
      <Navbar />
    </div>
  )
  //return (
  //  <div className="min-h-screen bg-neutral-950">
  //    <Navbar />
  //    <div className="flex min-h-screen justify-center items-center">
  //      <iframe
  //        src="/game/index.html"
  //        className="m-10 
  //        lg:w-[1200px] lg:h-[900px]
  //        md:w-[800px] md:h-[600px]
  //        sm:w-[400px] sm:h-[300px]
  //        "
  //      />
  //    </div>
  //  </div>
  //);
};

export default demo;
