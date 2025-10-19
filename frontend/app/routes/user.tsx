import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";

const user = () => {
  let { username } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    checkUserExits();
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
    if (data.result === "Not Found") navigate("/error", { replace: true });
    else console.log(data.result.user.username);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[url('./../../public/pattern2.svg')] bg-repeat animate-[scroll-pattern_100s_linear_infinite]">
        <div className="bg-[#FFF] flex-1 p-15 ml-[6vw] mr-[6vw] border-l-1 border-l-[#E1E1EE] border-r-1 border-r-[#E1E1EE] tracking-tighter min-h-screen">
          <div className="flex flex-row justify-start items-start ml-[6vw] mr-[6vw] gap-10">
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
            <div className="flex flex-col justify-start items-start gap-5 border-1 border-[#E1E1EE] p-5 rounded-lg w-full min-h-[80vh]"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default user;
