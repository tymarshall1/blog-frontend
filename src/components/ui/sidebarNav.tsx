import { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "@/components/ui/collapsible";

function NavLink({
  linkName,
  link,
  css,
  icon,
}: {
  linkName: string;
  link: string;
  css?: string;
  icon?: string;
}) {
  return (
    <Link
      className={`${
        css || ""
      } flex-1 p-1 mx-2 text-lg font-light transition ease-in rounded hover:bg-secondary min-w-20 ml-6 hover:text-sideNav`}
      to={link}
    >
      <img src={icon} alt="" />
      {linkName}
    </Link>
  );
}

function Explore() {
  return (
    <Collapse
      title="Explore"
      seeMore={[
        <NavLink linkName={"Art"} link={"/"} />,
        <NavLink linkName={"Animals and Pets"} link={"/"} />,
        <NavLink linkName={"History"} link={"/"} />,
        <NavLink linkName={"Crypto"} link={"/"} />,
      ]}
    >
      <>
        <NavLink linkName={"Gaming"} link={"/"} />
        <NavLink linkName={"Sports"} link={"/"} />
        <NavLink linkName={"Music"} link={"/"} />
        <NavLink linkName={"Places"} link={"/"} />
        <NavLink linkName={"Programming"} link={"/"} />
        <NavLink linkName={"Fashion"} link={"/"} />
        <NavLink linkName={"Food"} link={"/"} />
      </>
    </Collapse>
  );
}

function HeadSideBar() {
  const [linkSelected, setLinkSelected] = useState("home");
  return (
    <div className="flex flex-col gap-2">
      <Link
        className={`${
          linkSelected === "home"
            ? "bg-secondary text-sideNav"
            : "background-transparent"
        } p-2 text-xl font-black rounded flex items-center gap-2 hover:bg-secondary hover:text-sideNav`}
        to={"/"}
        onClick={() => {
          setLinkSelected("home");
        }}
      >
        <span className="material-symbols-outlined">home</span>
        Home
      </Link>
      <Link
        className={`${
          linkSelected === "popular"
            ? "bg-secondary text-sideNav"
            : "background-transparent"
        } p-2 text-xl font-black transition ease-in delay-75 rounded hover:bg-secondary hover:text-sideNav flex items-center gap-2`}
        to={""}
        onClick={() => {
          setLinkSelected("popular");
        }}
      >
        <span className="material-symbols-outlined">data_thresholding</span>
        Popular
      </Link>
    </div>
  );
}

function Resources() {
  return (
    <Collapse
      title={"Resources"}
      seeMore={[
        <NavLink linkName={"Content Policy"} link={"/"} />,
        <NavLink linkName={"Privacy Policy"} link={"/"} />,
        <NavLink linkName={"User Agreement"} link={"/"} />,
      ]}
    >
      <>
        <NavLink linkName={"About"} link={"/"} />
        <NavLink linkName={"Help"} link={"/"} />
        <NavLink linkName={"Careers"} link={"/"} />
      </>
    </Collapse>
  );
}

function SidebarNav() {
  return (
    <nav className="fixed left-0 h-full p-4 pb-20 space-y-5 overflow-auto divide-y w-80 scrollbar divide-solid text-primary bg-sideNav">
      <HeadSideBar />
      <Explore />
      <Resources />
      <p className="pt-3 text-xs text-center">
        LimeLeaf, Inc @ 2024. All rights reserved
      </p>
    </nav>
  );
}

export default SidebarNav;
