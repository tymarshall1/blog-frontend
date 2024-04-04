import { Link, useLocation } from "react-router-dom";
import SeeMore from "./seeMore";

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

function MoreInformation() {
  const location = useLocation();
  const defaultInformationLinks = ["/", "/popular", "/profile"];

  return (
    <div className="p-2 mt-4 mr-4 text-white rounded bg-moreInformation min-h-96 max-w-80">
      {defaultInformationLinks.includes(location.pathname) ? (
        <DefaultInformation />
      ) : (
        <div>test</div>
      )}
    </div>
  );
}

export default MoreInformation;
