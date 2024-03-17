import React, { ReactNode } from "react";
import { useState } from "react";
function SeeMore({
  additionalItems,
  btnStyles,
}: {
  additionalItems: ReactNode[];
  btnStyles?: string;
}) {
  const [seeMoreOpen, setSeeMoreOpen] = useState(false);
  return (
    <>
      {seeMoreOpen && (
        <>
          {additionalItems &&
            additionalItems.map((element, index) => {
              return <React.Fragment key={index}>{element}</React.Fragment>;
            })}
          <div className="text-center">
            <button
              onClick={() => setSeeMoreOpen(false)}
              className={`${btnStyles} px-5 text-sm font-medium tracking-wider text-center rounded whitespace-nowrap hover:bg-secondary hover:text-sideNav`}
            >
              See Less
            </button>
          </div>
        </>
      )}
      <div className={`${seeMoreOpen ? "hidden" : "block"} text-center`}>
        <button
          onClick={() => setSeeMoreOpen(true)}
          className={`${btnStyles} px-5 font-medium text-sm tracking-wider text-center rounded whitespace-nowrap hover:bg-secondary hover:text-sideNav`}
        >
          See More
        </button>
      </div>
    </>
  );
}

export default SeeMore;
