import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { CollapseMenu } from "@/components/ui/collapsible";
import leafLogo from "../../assets/leaf-logo.svg";
import { cn } from "@/lib/utils";
function NavLink({
  linkName,
  link,
  className,
  icon,
}: {
  linkName: string;
  link: string;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <Link
      className={cn(
        "flex-1 p-1 flex items-center gap-2 mx-2 text-lg font-light transition ease-in rounded hover:bg-secondary min-w-20 ml-6 hover:text-sideNav",
        className
      )}
      to={link}
    >
      {icon}
      <p className="tracking-wide">{linkName}</p>
    </Link>
  );
}

function Explore() {
  return (
    <CollapseMenu
      title="Explore"
      seeMore={[
        <NavLink
          linkName={"Art"}
          icon={<span className="material-symbols-outlined">palette</span>}
          link={"/"}
        />,
        <NavLink
          linkName={"Animals and Pets"}
          icon={<span className="material-symbols-outlined">pets</span>}
          link={"/"}
        />,
        <NavLink
          linkName={"Crypto"}
          icon={
            <span className="material-symbols-outlined">currency_bitcoin</span>
          }
          link={"/"}
        />,
      ]}
    >
      <>
        <NavLink
          linkName={"Gaming"}
          icon={
            <span className="material-symbols-outlined">stadia_controller</span>
          }
          link={"/"}
        />
        <NavLink
          linkName={"Sports"}
          icon={
            <span className="material-symbols-outlined">sports_football</span>
          }
          link={"/"}
        />
        <NavLink
          linkName={"Music"}
          icon={<span className="material-symbols-outlined">headphones</span>}
          link={"/"}
        />
        <NavLink
          linkName={"Places"}
          icon={<span className="material-symbols-outlined">storefront</span>}
          link={"/"}
        />
        <NavLink
          linkName={"Programming"}
          icon={<span className="material-symbols-outlined">code</span>}
          link={"/"}
        />
        <NavLink
          linkName={"Fashion"}
          icon={<span className="material-symbols-outlined">styler</span>}
          link={"/"}
        />
        <NavLink
          linkName={"Food"}
          icon={<span className="material-symbols-outlined">restaurant</span>}
          link={"/"}
        />
      </>
    </CollapseMenu>
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
    <CollapseMenu
      title={"Resources"}
      seeMore={[
        <NavLink
          linkName={"Content Policy"}
          icon={<span className="material-symbols-outlined">description</span>}
          link={"/"}
        />,
        <NavLink
          linkName={"Privacy Policy"}
          icon={<span className="material-symbols-outlined">article</span>}
          link={"/"}
        />,
        <NavLink
          linkName={"User Agreement"}
          icon={<span className="material-symbols-outlined">contract</span>}
          link={"/"}
        />,
      ]}
    >
      <>
        <NavLink
          linkName={"About"}
          icon={<img className="w-6 h-6" src={leafLogo} />}
          link={"/"}
        />
        <NavLink
          linkName={"Help"}
          icon={<span className="material-symbols-outlined">help</span>}
          link={"/"}
        />
        <NavLink
          linkName={"Careers"}
          icon={<span className="material-symbols-outlined">plumbing</span>}
          link={"/"}
        />
      </>
    </CollapseMenu>
  );
}

function SidebarNav({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        "fixed left-0 h-full p-4 pb-20 space-y-5 overflow-auto divide-y w-80 scrollbar divide-solid text-primary bg-sideNav",
        className
      )}
    >
      <HeadSideBar />
      <Explore />
      <Resources />
      <p className="pt-3 text-xs font-light text-center">
        LimeLeaf, Inc © 2024. All rights reserved
      </p>
    </nav>
  );
}

export default SidebarNav;
