import { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "@/components/ui/collapsible";

function NavLink({
  linkName,
  link,
  css,
}: {
  linkName: string;
  link: string;
  css?: string;
}) {
  return (
    <Link
      className={`${css} flex-1 p-1 mx-2 text-lg font-medium transition ease-in rounded hover:bg-secondary min-w-20 ml-6`}
      to={link}
    >
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
          linkSelected === "popular" ? "bg-secondary" : "background-transparent"
        } p-2 text-xl font-black transition ease-in delay-75 rounded hover:bg-secondary hover:opacity-95`}
        to={""}
        onClick={() => {
          setLinkSelected("popular");
        }}
      >
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
    <nav className="h-full max-h-screen p-4 space-y-5 overflow-auto divide-y scrollbar divide-solid text-primary bg-sideNav max-w-80">
      <HeadSideBar />
      <Explore />
      <Resources />
    </nav>
  );
}

export default SidebarNav;
