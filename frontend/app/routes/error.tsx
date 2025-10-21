import { Link } from "react-router";

const error = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Link to="/">
        <img
          src="/logo_outline.png"
          alt="PachinGO! Logo, Large"
          className="w-100 mb-10 hover:drop-shadow-lg ease-linear duration-150"
        />
      </Link>
      <h1>Error - page does not exist</h1>
    </div>
  );
};

export default error;
