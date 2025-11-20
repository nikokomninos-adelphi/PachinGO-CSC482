import { Link } from "react-router";
import Logo from "~/components/nav/Logo";

const error = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Link to="/" className="mb-10 hover:drop-shadow-lg dark:hover:drop-shadow-neutral-700 ease-linear duration-150">
        <Logo width={100}/>
      </Link>
      <h1>The PachinGODs deem this page non-existent!</h1>
    </div>
  );
};

export default error;
