import { useState } from "react";
import { Link } from "react-router-dom";

function SidebarNav() {
  const [linkSelected, setLinkSelected] = useState("home");

  return (
    <nav className="h-full p-4 space-y-5 divide-y divide-solid text-primary bg-sideNav max-w-80">
      <div className="flex flex-col gap-2">
        <Link
          className={`${
            linkSelected === "home" ? "bg-secondary" : "background-transparent"
          } p-2 text-xl font-black rounded  hover:bg-secondary`}
          to={""}
          onClick={() => {
            setLinkSelected("home");
          }}
        >
          Home
        </Link>
        <Link
          className={`${
            linkSelected === "popular"
              ? "bg-secondary"
              : "background-transparent"
          } p-2 text-xl font-black transition ease-in-out delay-100 rounded hover:bg-secondary hover:opacity-95`}
          to={""}
          onClick={() => {
            setLinkSelected("popular");
          }}
        >
          Popular
        </Link>
      </div>
      <div className="flex flex-col gap-5 pt-2">
        <h2 className="text-3xl font-black">Explore</h2>
        <Link to={""}>Home</Link>
        <Link to={""}>Popular</Link>
      </div>
    </nav>
  );
}

export default SidebarNav;
