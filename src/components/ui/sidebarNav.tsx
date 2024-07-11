import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { CollapseMenu } from "@/components/ui/collapsible";
import leafLogo from "../../assets/leaf-logo.svg";
import { cn } from "@/lib/utils";
import SeeMore from "./seeMore";
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
        "flex-1 p-1 flex items-center gap-2 mx-2 text-lg font-light rounded hover:bg-secondary min-w-20 ml-6 hover:text-sideNav",
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
  const seeMoreItemNumberBreak = 5;
  const currentNavLinks = [
    {
      name: "Gaming",
      icon: (
        <span className="material-symbols-outlined">stadia_controller</span>
      ),
    },
    {
      name: "Sports",
      icon: <span className="material-symbols-outlined">sports_football</span>,
    },
    {
      name: "Music",
      icon: <span className="material-symbols-outlined">headphones</span>,
    },
    {
      name: "Places",
      icon: <span className="material-symbols-outlined">storefront</span>,
    },
    {
      name: "Programming",
      icon: <span className="material-symbols-outlined">code</span>,
    },
    {
      name: "Fashion",
      icon: <span className="material-symbols-outlined">styler</span>,
    },
    {
      name: "Food",
      icon: <span className="material-symbols-outlined">restaurant</span>,
    },
    {
      name: "Art",
      icon: <span className="material-symbols-outlined">palette</span>,
    },
    {
      name: "Animals and Pets",
      icon: <span className="material-symbols-outlined">pets</span>,
    },
    {
      name: "Crypto",
      icon: <span className="material-symbols-outlined">currency_bitcoin</span>,
    },
  ];

  return (
    <CollapseMenu title="Explore">
      <>
        {currentNavLinks.map((link, index) => {
          if (index <= seeMoreItemNumberBreak)
            return (
              <NavLink
                key={index}
                linkName={link.name}
                icon={link.icon}
                link={`/explore?search=${link.name}`}
              />
            );
        })}

        <SeeMore
          additionalItems={currentNavLinks.map((link, index) => {
            if (index > seeMoreItemNumberBreak) {
              return (
                <NavLink
                  key={index}
                  linkName={link.name}
                  icon={link.icon}
                  link={`/explore?search=${link.name}`}
                />
              );
            }
          })}
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
          window.scrollTo({ top: 0, behavior: "smooth" });
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
        to={"/popular"}
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
    <CollapseMenu title={"Resources"}>
      <>
        <NavLink
          linkName={"About"}
          icon={<img className="w-6 h-6" src={leafLogo} />}
          link={"/about"}
        />
        <NavLink
          linkName={"Help"}
          icon={<span className="material-symbols-outlined">help</span>}
          link={"/help"}
        />
        <NavLink
          linkName={"Careers"}
          icon={<span className="material-symbols-outlined">plumbing</span>}
          link={"/careers"}
        />
        <SeeMore
          additionalItems={[
            <NavLink
              linkName={"Content Policy"}
              icon={
                <span className="material-symbols-outlined">description</span>
              }
              link={"/content-policy"}
            />,
            <NavLink
              linkName={"Privacy Policy"}
              icon={<span className="material-symbols-outlined">article</span>}
              link={"/privacy-policy"}
            />,
            <NavLink
              linkName={"User Agreement"}
              icon={<span className="material-symbols-outlined">contract</span>}
              link={"/user-agreement"}
            />,
          ]}
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
