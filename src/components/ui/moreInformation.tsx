import { Link } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Loading from "./loading";
import { Community } from "@/types/community";
import { cn } from "@/lib/utils";
type CommunitySectionProps = {
  title: string;
  data: string | number | string[] | React.ReactNode;
};

function MoreInformationContainer({ children }: { children: ReactNode }) {
  return <div className="space-y-2 max-h-dvh">{children}</div>;
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
    <div className="font-light tracking-wide border-b-[1px] border-white pb-2">
      {children}
    </div>
  );
}

function MoreInformationBlock(props: CommunitySectionProps) {
  return (
    <div className="space-y-1">
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
      <img
        src={props.icon}
        className="border-2 rounded-full w-11 h-11 border-white/20"
      />
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
          <Link
            className="flex items-end gap-1 mb-3 text-2xl tracking-tight font-semi-bold hover:text-secondary"
            to={"/communities"}
          >
            <h4 className="">Popular Communities</h4>
            <span className="material-symbols-outlined">open_in_new</span>
          </Link>
          {communities?.map((community, index) => (
            <SingleCommunity
              key={index}
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
  className,
}: {
  children: ReactNode;
  defaultInformation?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "sticky hidden border-[1px] border-white/20 p-2 mt-4 h-fit text-white rounded top-20 min-[1080px]:block bg-moreInformation max-w-96 min-w-72 mb-3 overflow-y-scroll max-h-[700px] scrollbar",
        className
      )}
    >
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
