import { Link } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Loading from "./loading";
import { Community } from "@/types/community";
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
  icon: string;
};

function SingleCommunity(props: CommunityProps) {
  return (
    <Link
      className="flex items-center gap-3 p-2 rounded hover:bg-secondary hover:text-moreInformation"
      to={`/community/${props.title}`}
    >
      <img src={props.icon} className="rounded-full w-9 h-9" />
      <div>
        <h2 className="tracking-wide">{props.title}</h2>{" "}
        <p className="text-sm font-thin tracking-wider">
          {props.members}
          {props.members > 1 ? " followers" : " follower"}
        </p>
      </div>
    </Link>
  );
}

function DefaultInformation() {
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const [communities, setCommunities] = useState<Community[]>([]);
  const [noMoreCommunities, setNoMoreCommunities] = useState(false);
  const { isLoading, error, responseData, fetchData } = useFetch<Community[]>(
    `${import.meta.env.VITE_LIMELEAF_BACKEND_URL}/api/community/popular?page=${
      pagination.page
    }&limit=${pagination.limit}`,
    "GET"
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (pagination.page === 1) return;
    fetchData();
  }, [pagination]);

  useEffect(() => {
    if (responseData) {
      setCommunities((prevCommunities) => [
        ...prevCommunities,
        ...responseData,
      ]);

      if (responseData.length !== pagination.limit) {
        setNoMoreCommunities(true);
        return;
      }
    }
  }, [responseData]);

  const handleSeeMore = () => {
    if (noMoreCommunities) return;
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: prevPagination.page + 1,
    }));
  };

  const handleSeeLess = () => {
    setCommunities(communities.slice(0, 5));
    setNoMoreCommunities(false);
    setPagination({ page: 1, limit: 5 });
  };

  return (
    <>
      {error && <p className="text-center text-white">Server error</p>}
      {!error && (
        <>
          <h1 className="mb-3 text-xl font-normal tracking-tight">
            Popular Communities
          </h1>
          {communities?.map((community) => (
            <SingleCommunity
              key={community.name}
              title={community.name}
              icon={community.communityIcon.toString()}
              members={
                (typeof community.followers != "object" &&
                  community.followers) ||
                0
              }
            />
          ))}
          {noMoreCommunities && (
            <button className="hover:text-secondary" onClick={handleSeeLess}>
              See Less
            </button>
          )}

          {!noMoreCommunities && (
            <button className="hover:text-secondary" onClick={handleSeeMore}>
              See More
            </button>
          )}

          {isLoading && <Loading />}
        </>
      )}
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
    <div className="sticky hidden p-2 mt-4 text-white rounded top-20 min-[1080px]:block bg-moreInformation min-h-96 max-w-80 min-w-72 mb-3 overflow-y-scroll max-h-[700px] scrollbar">
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
