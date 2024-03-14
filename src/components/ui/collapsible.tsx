import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ReactElement, useState } from "react";
import expand from "../../assets/expand.svg";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

type CollapseProps = {
  children: ReactElement;
  seeMore: ReactElement[];
  title: string;
};

function Collapse(props: CollapseProps) {
  const [exploreSeeMoreOpen, setExploreSeeMoreOpen] = useState(false);
  const [exploreOpened, setExploreOpened] = useState(true);
  return (
    <Collapsible
      open={exploreOpened}
      onOpenChange={() =>
        exploreOpened ? setExploreOpened(false) : setExploreOpened(true)
      }
    >
      <CollapsibleTrigger className="w-full p-1 mb-3 text-3xl font-black text-left transition ease-in rounded hover:bg-secondary">
        <div className="flex items-center justify-between ">
          <h2 className="">{props.title}</h2>
          <img
            src={expand}
            alt="expand"
            className={`${
              exploreOpened
                ? "transition ease-in-out rotate-180 delay-75"
                : "transition ease-in-out delay-75"
            } w-10 h-10`}
          />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="flex flex-col gap-3 CollapsibleContent">
        {props.children}
        {exploreSeeMoreOpen && (
          <>
            {props.seeMore.map((element) => {
              return <>{element}</>;
            })}
            <div className="flex items-center justify-center mt-4">
              <button
                onClick={() => setExploreSeeMoreOpen(false)}
                className="px-5 font-light tracking-wider text-center rounded whitespace-nowrap hover:text-secondary"
              >
                See Less
              </button>
            </div>
          </>
        )}
        <div
          className={`${
            exploreSeeMoreOpen ? "hidden" : "block"
          } flex items-center justify-center mt-4`}
        >
          <button
            onClick={() => setExploreSeeMoreOpen(true)}
            className="px-5 font-light tracking-wider text-center rounded whitespace-nowrap hover:text-secondary "
          >
            See More
          </button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent, Collapse };
