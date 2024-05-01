import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-2 mt-4 text-center rounded bg-sideNav">
      <h1 className="text-4xl font-black text-white">
        We were unable to find what you were looking for
      </h1>
      <Link
        className="w-1/2 p-2 text-xl font-bold text-black bg-white rounded hover:bg-secondary"
        to={"/"}
      >
        Home
      </Link>
    </div>
  );
}

export default Error;
