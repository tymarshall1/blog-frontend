import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ReactElement, useState } from "react";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

type CollapseProps = {
  children: ReactElement;
  title: string;
};

function CollapseMenu(props: CollapseProps) {
  const [collapseOpened, setCollapseOpened] = useState(true);
  return (
    <Collapsible
      open={collapseOpened}
      onOpenChange={() =>
        collapseOpened ? setCollapseOpened(false) : setCollapseOpened(true)
      }
    >
      <CollapsibleTrigger className="w-full p-1 mb-3 text-3xl font-black text-left transition ease-in rounded hover:bg-secondary hover:text-sideNav">
        <div className="flex items-center justify-between ">
          <h2 className="font-medium tracking-tight">{props.title}</h2>
          <span
            className={`material-symbols-outlined ${
              collapseOpened
                ? "transition ease-in-out rotate-180 delay-75"
                : "transition ease-in-out delay-75"
            } text-3xl`}
          >
            expand_more
          </span>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="flex flex-col gap-3 CollapsibleContent">
        {props.children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent, CollapseMenu };
