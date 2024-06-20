import { Link } from "react-router-dom";
import SeeMore from "./seeMore";
import { ReactNode } from "react";

type CommunitySectionProps = {
  title: string;
  data: string | number | string[] | React.ReactNode;
};

function MoreInformationContainer({ children }: { children: ReactNode }) {
  return (
    <div className="p-1 space-y-2 overflow-y-scroll max-h-dvh scrollbar">
      {children}
    </div>
  );
}

function MoreInformationTitle({ children }: { children: ReactNode }) {
  return (
    <div className="text-4xl font-black text-center text-secondary hover:text-white/70">
      {children}
    </div>
  );
}

function MoreInformationDescription({ children }: { children: ReactNode }) {
  return (
    <div className="font-light pt-4 tracking-wide border-b-[1px] border-white pb-2">
      {children}
    </div>
  );
}

function MoreInformationBlock(props: CommunitySectionProps) {
  return (
    <div className="space-y-1 ">
      <h2 className="text-lg font-black text-secondary">{props.title}</h2>
      <div className="pb-2 tracking-wider border-b-[1px] border-white">
        {props.data}
      </div>
    </div>
  );
}

type CommunityProps = {
  title: string;
  members: number;
};

function Community(props: CommunityProps) {
  return (
    <Link
      className="flex items-center gap-3 p-2 rounded hover:bg-secondary hover:text-moreInformation"
      to={"/"}
    >
      <span className="bg-black rounded-full w-9 h-9"></span>
      <div>
        <h2 className="tracking-wide">{props.title}</h2>{" "}
        <p className="text-sm font-thin tracking-wider">
          {props.members.toLocaleString() + " members"}
        </p>
      </div>
    </Link>
  );
}

function DefaultInformation() {
  return (
    <>
      <h1 className="mb-8 text-xl font-normal tracking-tight">
        Popular Communities
      </h1>
      <Community title={"Programming"} members={9687444} />
      <Community title={"Gaming"} members={7452568} />
      <Community title={"Music"} members={6154820} />
      <Community title={"Food"} members={4254873} />
      <Community title={"MLB"} members={2548437} />
      <SeeMore
        btnStyles="my-2"
        additionalItems={[
          <Community title={"Art"} members={1125488} />,
          <Community title={"Graphic Design"} members={955412} />,
          <Community title={"Sports"} members={754358} />,
        ]}
      />
    </>
  );
}
function MoreInformation({
  children,
  defaultInformation,
}: {
  children: ReactNode;
  defaultInformation?: boolean;
}) {
  return (
    <div className="sticky hidden p-2 mt-4 text-white rounded top-20 min-[1080px]:block bg-moreInformation min-h-96 max-w-80 min-w-72 h-fit">
      {defaultInformation && <DefaultInformation />}
      {!defaultInformation && children}
    </div>
  );
}
export {
  MoreInformation,
  MoreInformationContainer,
  MoreInformationTitle,
  MoreInformationDescription,
  MoreInformationBlock,
};
